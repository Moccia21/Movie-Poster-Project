import Footer from '../Sections/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


const Posters = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Show search results from homepage search bar
  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`https://www.omdbapi.com/?apikey=63398e9a&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
        setLoading(false);
      });
    }
  }, [query]);
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=63398e9a`
      );
      const data = await response.json();

      if (data.Search) {
        const detailedMovies = await Promise.all(
          data.Search.slice(0, 8).map(async (movie) => {
            const detailedResponse = await fetch(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=63398e9a`
            );
            return await detailedResponse.json();
          })
        );

        setMovies(detailedMovies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
    <section>
      <div className="search_title-container">
        <h1 className="title">Search your favorite movies & shows here.</h1>
      </div>
      <div className="input_wrapper">
        <input
          className='poster_input'
          value={searchTerm}
          type="text"
          placeholder="Enter Movie / Show Name: "
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />

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

      <div className="movie_posters">
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <div className="movie_poster-wrapper">
              <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
                <img
                  className="movie_poster"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </Link>
              <div className="movie_description">
                <h1 className="movie_poster-header">{movie.Title}</h1>
                <p className="movie_poster-para">Year: {movie.Year}</p>
                <p className="movie_poster-para">Rated: {movie.Rated}</p>
                <p className="movie_poster-para">Director: {movie.Director}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    <Footer />
    </>
  )
}

export default Posters;