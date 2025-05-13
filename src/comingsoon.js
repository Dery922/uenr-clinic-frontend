import React from "react";
import "./css/base.css";
import "./css/vendor.css";
import "./css/main.css";
import logo from "./images/logo.svg";


const HomePage = () => {
  return (
    <div>
      <main className="s-home s-home--static">
        <div className="overlay"></div>

        <div className="home-content">
          <div className="home-logo">
            <a href="index-static.html">
          
            </a>
          </div>

          <div className="row home-content__main">
            <div className="col-eight home-content__text pull-right">
              <h3>Welcome to Uenr Clinic</h3>
              <h1>
              We're opening soon to provide quality healthcare to the community.
              </h1>
              <p>
              "At Uenr Clinic, we offer compassionate, affordable, and modern healthcare for families and individuals."
              </p>

              <div className="home-content__subscribe">
                <form id="mc-form" className="group" noValidate>
                  <input
                    type="email"
                    name="EMAIL"
                    className="email"
                    id="mc-email"
                    placeholder="Email Address"
                    required
                  />
                  <input type="submit" name="subscribe" value="Notify Me" />
                  <label htmlFor="mc-email" className="subscribe-message"></label>
                </form>
              </div>
            </div>

            <div className="col-four home-content__counter">
              <h3>Launching In</h3>
              <div className="home-content__clock">
                <div className="top">
                  <div className="time days">
                   100
                    <span>Days</span>
                  </div>
                </div>
                <div className="time hours">
                  09<span>H</span>
                </div>
                <div className="time minutes">
                  54<span>M</span>
                </div>
                <div className="time seconds">
                  30<span>S</span>
                </div>
              </div>
            </div>
          </div>

          <ul className="home-social">
            {["facebook-f", "twitter", "instagram", "behance", "dribbble"].map((icon) => (
              <li key={icon}>
                <a href="#0">
                  <i className={`fab fa-${icon}`} aria-hidden="true"></i>
                  <span>{icon.charAt(0).toUpperCase() + icon.slice(1)}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="row home-copyright">
            <span>Copyright Uenr Clinic</span>
            <span>
              Design by <a href="">We</a>
            </span>
          </div>

          <div className="home-content__line"></div>
        </div>
      </main>

      <a className="info-toggle" href="#0">
        <span className="info-menu-icon"></span>
      </a>

      <div className="s-info">
        <div className="row info-wrapper">
          <div className="col-seven tab-full info-main">
            <h1>We are Count. We make awesome stuff.</h1>
            <p>
              Quisque velit nisi, pretium ut lacinia in, elementum id enim. Mauris blandit...
            </p>
          </div>

          <div className="col-four tab-full pull-right info-contact">
            <div className="info-block">
              <h3>Start A Conversation</h3>
              <p>
                <a href="mailto:#0" className="info-email">
                  uenr.edu.gh.com
                </a>
                <br />
                <a href="tel:+18587338912" className="info-phone">
                  000 000 000
                </a>
              </p>
            </div>

            <div className="info-block">
              <h3>Uenr Clinic Ajacent Old Auditorium</h3>
              <p className="info-address">
              Uenr Clinic Ajacent Old Auditorium
                <br />
                Bono , Sunyani
                <br />
                Ghana
              </p>
            </div>

            <div className="info-block">
              <h3>Find Us On</h3>
              <ul className="info-social">
                {["facebook", "twitter", "instagram", "behance", "dribbble"].map((icon) => (
                  <li key={icon}>
                    <a href="#0">
                      <i className={`fab fa-${icon}`} aria-hidden="true"></i>
                      <span>{icon.charAt(0).toUpperCase() + icon.slice(1)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
{/* 
      <div id="preloader">
        <div id="loader">
          <div className="line-scale-pulse-out">
            {[...Array(5)].map((_, i) => (
              <div key={i}></div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
