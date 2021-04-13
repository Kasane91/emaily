import React from "react";
import styled from "styled-components";
import mailLogo from "../../resources/LogoMakr-6IzQKK.png";

const Header = (props) => {
  return (
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="left brand-logo">
          LOGO
        </a>
        <ul id="nav-mobile" class="right ">
          <li>
            <a href="sass.html">Log in with Google</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
