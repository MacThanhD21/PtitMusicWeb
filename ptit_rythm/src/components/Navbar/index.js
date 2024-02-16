import React from "react";
import "./Navbar.css";
import "./changeMode.css";
import "./User.css";

import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const navbarMobileToggle = () => {
    document
      .getElementById("navbarMobileToggle")
      .classList.toggle("navbarMobileToggle");
  };

  const switchMode = () => {
    document.body.classList.toggle("switchMode");
    document
      .getElementById("switchModeBtnDark")
      .classList.toggle("switchModeBtnDarkToggle");
    document
      .getElementById("switchModeBtnLight")
      .classList.toggle("switchModeBtnLightToggle");

    document
      .getElementById("logoFooterModeLight")
      .classList.toggle("logoFooterModeLightToggle");
    document
      .getElementById("logoFooterModeDark")
      .classList.toggle("logoFooterModeDarkToggle");
  };

  const supportChatMode = () => {
    document
      .getElementById("supportChatMode")
      .classList.toggle("supportChatMode");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav id="navbarFixed">
        <ul>
          <a
            href="javascript:void(0)"
            onClick={navbarMobileToggle}
            title="Menu"
            aria-label="Menu"
            className="fa-bars-mobile"
          >
            <span className="far fa-bars"></span>
          </a>
          <div className="inner-logo">
            <a href="index.html">
              <img
                src="../../../../assets/images/logo/JPEG/main-logo.jpeg"
                alt=""
                title="ptit_music"
              />
            </a>
            <span>PTIT Music</span>
          </div>
          <ul id="navbarMobileToggle">
            <a
              href="javascript:void(0)"
              onClick={navbarMobileToggle}
              title="Close Menu"
              aria-label="Close Menu"
              className="fa-close-mobile"
            >
              <span className="far fa-close"></span>
            </a>
            <a href="#explore">
              <li className="box--radius">Explore</li>
            </a>
            <a href="#featured_creators">
              <li className="box--radius">Featured Creators</li>
            </a>
            <a href="#trending">
              <li className="box--radius">Trending</li>
            </a>
            <a href="#category">
              <li className="box--radius">Category</li>
            </a>
            <a href="#popular_artists">
              <li className="box--radius">Popular Artists</li>
            </a>
          </ul>
        </ul>
        <ul>
          {/* Dark mode switch */}
          <a>
            <label className="bb8-toggle">
              <input
                href="javascript:void(0)"
                onClick={switchMode}
                id="switchModeBtnDark"
                title="Switch Dark Mode"
                aria-label="Switch Dark Mode"
                className="bb8-toggle__checkbox"
                type="checkbox"
              />
              <div className="bb8-toggle__container">
                <div className="bb8-toggle__scenery">
                  {/* Stars and clouds for the toggle */}
                </div>
                <div className="bb8">
                  <div className="bb8__head-container">
                    <div className="bb8__antenna"></div>
                    <div className="bb8__antenna"></div>
                    <div className="bb8__head"></div>
                  </div>
                  <div className="bb8__body"></div>
                </div>
                <div className="artificial__hidden">
                  <div className="bb8__shadow"></div>
                </div>
              </div>
            </label>
          </a>
          {/* Avatar and Avatar Dropdown */}
          <a href="javascript:void(0)" id="avatar">
            <FaRegCircleUser />
          </a>
          <div className="avatar-dropdown" id="avatarDropdown">
            <a href="profile.html">
              <li>
                <span className="far fa-user"></span> Profile
              </li>
            </a>
            <a href="javascript:void(0)" onClick={supportChatMode}>
              <li>
                <span className="far fa-comment"></span> Support
              </li>
            </a>
            <a href="premium.html" target="_blank">
              <li>
                <span className="far fa-star"></span> Upgrade Plan
              </li>
            </a>
            <hr />
            <a href="login.html">
              <li>
                <span className="far fa-history"></span> Log out
              </li>
            </a>
          </div>
        </ul>
      </nav>

      {/* SUPPORT & CHAT MODE */}
      <div className="overlay-support-chat-mode" id="supportChatMode">
        <div className="support-chat-mode">
          {/* Chat Header */}
          <div className="support-chat-mode-header">
            {/* Chat Header content */}
          </div>
          {/* Chat Body */}
          <div className="support-chat-mode-body">
            {/* Chat Body content */}
          </div>
          {/* Chat Footer */}
          <div className="support-chat-mode-footer">
            {/* Chat Footer content */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
