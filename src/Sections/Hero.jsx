import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import Bronx_Tale from "../assets/Bronx_Tale.jpg";
import Batman from "../assets/TheDarkKnight.png";
import Scarface from "../assets/Scarface.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section>
      <div className="container">
        <div className="quote_wrapper">
          <h1 className="hero_quote">
            "You want to know how I got these scars?"
            <br /> - The Dark Knight
          </h1>
          <div className="sub-title_container">
            <Link to="/Posters"
            className="hero_sub-title">
              SHOP NOW
              <FontAwesomeIcon icon={faForward} className="foward_icon" />
              </Link> 
          </div>
        </div>
        <div className="poster_wrapper">
          <img className="home_movie-poster-primary" src={Bronx_Tale} alt="" />
          <img className="home_movie-poster-secondary" src={Batman} alt="" />
          <img className="home_movie-poster" src={Scarface} alt="" />
        </div>
      </div>
      <div className="border_line" />
    </section>
  );
};

export default Hero;
