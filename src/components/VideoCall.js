import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import socket from '../services/socketService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPhone, faMicrophone, faMicrophoneSlash, faVideoSlash } from '@fortawesome/free-solid-svg-icons';

const VideoCall = ({ callId, otherUser, onEndCall, isInitiator }) => {
  const currentUser = useSelector((state) => state.user.user);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callStatus, setCallStatus] = useState('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' }
    ]
  };

  // Initialize call
  useEffect(() => {
    const initCall = async () => {
      try {
        // Get local media stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Create peer connection
        peerConnection.current = new RTCPeerConnection(iceServers);

        // Add local stream to connection
        stream.getTracks().forEach(track => {
          peerConnection.current.addTrack(track, stream);
        });

        // Setup remote stream handler
        peerConnection.current.ontrack = (event) => {
          const remoteStream = new MediaStream();
          event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
          });
          setRemoteStream(remoteStream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
          setCallStatus('active');
        };

        // ICE candidate handler
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('ice_candidate', {
              callId,
              candidate: event.candidate
            });
          }
        };

        // For the call initiator, create an offer
        if (isInitiator) {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          socket.emit('sdp_offer', {
            callId,
            offer
          });
        }

      } catch (err) {
        console.error('Error initializing call:', err);
        onEndCall();
      }
    };

    initCall();

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [callId, isInitiator]);

  // Socket event handlers
  useEffect(() => {
    const handleAnswer = async ({ answer }) => {
      try {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      } catch (err) {
        console.error('Error setting remote description:', err);
      }
    };

    const handleOffer = async ({ offer }) => {
      try {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit('sdp_answer', {
          callId,
          answer
        });
      } catch (err) {
        console.error('Error handling offer:', err);
      }
    };

    const handleICECandidate = async ({ candidate }) => {
      try {
        if (candidate) {
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        }
      } catch (err) {
        console.error('Error adding ICE candidate:', err);
      }
    };

    const handleCallEnded = () => {
      onEndCall();
    };

    socket.on('sdp_answer', handleAnswer);
    socket.on('sdp_offer', handleOffer);
    socket.on('ice_candidate', handleICECandidate);
    socket.on('call_ended', handleCallEnded);

    return () => {
      socket.off('sdp_answer', handleAnswer);
      socket.off('sdp_offer', handleOffer);
      socket.off('ice_candidate', handleICECandidate);
      socket.off('call_ended', handleCallEnded);
    };
  }, [callId, onEndCall]);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = () => {
    socket.emit('end_call', { callId });
    onEndCall();
  };

  return (
    <div className="video-call-container">
      <div className="video-call-header">
        <h3>Call with {otherUser.username}</h3>
        <p>Status: {callStatus}</p>
      </div>

      <div className="video-feeds">
        <div className="remote-video">
          {remoteStream ? (
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline 
              className="remote-feed"
            />
          ) : (
            <div className="remote-placeholder">
              <p>Waiting for {otherUser.username} to join...</p>
            </div>
          )}
        </div>

        <div className="local-video">
          {localStream && (
            <video 
              ref={localVideoRef} 
              autoPlay 
              playsInline 
              muted 
              className="local-feed"
            />
          )}
        </div>
      </div>

      <div className="call-controls">
        <button 
          onClick={toggleMute} 
          className={`control-btn ${isMuted ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} />
        </button>
        
        <button 
          onClick={toggleVideo} 
          className={`control-btn ${isVideoOff ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={isVideoOff ? faVideoSlash : faVideo} />
        </button>
        
        <button 
          onClick={endCall} 
          className="control-btn end-call"
        >
          <FontAwesomeIcon icon={faPhone} />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;