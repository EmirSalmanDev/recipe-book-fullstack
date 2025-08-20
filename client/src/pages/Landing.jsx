import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
            optio quas possimus quis rem dignissimos ex praesentium neque sint
            excepturi fugiat, sequi autem placeat sunt amet nesciunt commodi
            soluta quo!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn login-link">
            Login / Demo user
          </Link>
        </div>
        <img src={main} alt="Recipe Hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
