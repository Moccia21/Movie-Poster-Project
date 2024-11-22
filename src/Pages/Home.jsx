import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Hero from "../Sections/Hero";
import Movie from "../assets/undraw_home_cinema_l7yl.svg";
import Footer from "../Sections/Footer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/posters?query=${searchQuery.trim()}`);
    }
  };

  return (
    <>
      
      <Hero />
      <div className="search_title-container">
        <h1 className="title">Search your favorite movies & shows here.</h1>
      </div>
      <div className="input_wrapper">
        <form onSubmit={handleSearch}>
          <input
            className="poster_input"
            type="text"
            placeholder="Enter Movie / Show Name: "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
            </form>
          <div className="search_container">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="fa-MagnifyingGlass"
              color="#F4CA34"
              type="submit"
              onClick={handleSearch}
            />
          </div>
      </div>
      <div className="cinema_img-wrapper">
        <img className="cinema_img" src={Movie} alt="movie" />
      </div>
      <Footer />
    </>
  );
};

export default Home;
