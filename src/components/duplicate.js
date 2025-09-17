<div className="fixed-header">
<div className="navbar">
  <div className="user-details mr-auto">
    <div className="float-left user-img m-r-10">
      <a href="profile.html" title={selectedUser.username}>
        <img
          src="assets/img/user.jpg"
          alt=""
          className="w-40 rounded-circle"
        />
        <span className="status online"></span>
      </a>
    </div>
    <div className="user-info float-left">
      <a href="profile.html">
        <span className="font-bold">{selectedUser.username}</span>
      </a>
      <span className="last-seen">
        {selectedUser.lastSeen || "Last seen recently"}
      </span>
    </div>
  </div>

  <ul class="nav custom-menu">
    <li class="nav-item">
      <a
        href="#chat_sidebar"
        class="nav-link task-chat profile-rightbar float-right"
        id="task_chat"
      >
        <i class="fa fa-user"></i>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="voice-call.html">
        <i class="fa fa-phone"></i>
      </a>
    </li>
       {/* Your existing chat UI */}
{/* {selectedUser && !activeCall && (
<div className="chat-controls">
<button 
onClick={startVideoCall}
className="video-call-btn"
>
<i className="fa fa-video-camera"></i> Video Call
</button>
</div>
)} */}
    <li class="nav-item dropdown dropdown-action">
      <a
        href="#"
        class="nav-link dropdown-toggle"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fa fa-cog"></i>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="javascript:void(0)">
          Delete Conversations
        </a>
        <a class="dropdown-item" href="javascript:void(0)">
          Settings
        </a>
      </div>
    </li>
  </ul>
</div>
</div>