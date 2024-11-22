import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Footer from "./Footer";

const MovieInfo = ({ addToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();
  
  const handleClick = () => {
    setIsAdded(true);
  };
  
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  
  useEffect(() => {
    async function fetchMovieData() {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=63398e9a`
      );
      const data = await response.json();
      setMovie(data);
    }
    fetchMovieData();
  }, [id]);
  
  if (!movie) return <p>Loading...</p>;
  
  const interval = 5;
  
  // Function to get random prices for posters
  // const getPrice = (movieID) => {
  //   if (!pricesRef.current[movieID]) {
    //     pricesRef.current[movieID] = Math.floor(Math.random() * ((40 - 20) / interval + 1)) * interval + 20;
  //   }
  //   return pricesRef.current[movieID];
  // };

  
  const getPrice = () => Math.floor(Math.random() * ((40 - 20) / interval + 1)) * interval + 20;
  const price = getPrice();
  
  const addPriceToCart = () => {
    localStorage.setItem('selectedPrice', price);
  };

  return (
    <>
      <section>
        <div className="movieInfo-container">
          <div className="poster_container">
            <img src={movie.Poster} alt={movie.Title} />
          </div>
            <div key={movie.id} className="movie_details">
              <h1 className="movie_title">{movie.Title}</h1>
              <div className="movie_sub-details">
                <p className="movie_detail">
                  <span className="yellow">Plot:</span> {movie.Plot}
                </p>
                <p className="movie_detail">
                  <span className="yellow">Released:</span> {movie.Released}
                </p>
                <p className="movie_detail">
                  <span className="yellow">Genre:</span> {movie.Genre}
                </p>
                <p className="movie_detail">
                  <span className="yellow">Rated:</span> {movie.Rated}
                </p>
                <p className="movie_detail">
                  <span className="yellow">Price:</span> ${price}
                </p>
                <p className="movie_detail id_detail">Id: {movie.imdbID}</p>
                <button
                  className="cart_btn"
                  disabled={isAdded}
                  onClick={() => {
                    addToCart(movie);
                    handleClick();
                    addPriceToCart();
                  }}
                  style={{
                    backgroundColor: isAdded ? "gray" : "#fff",
                    color: isAdded ? "#fff" : "#000",
                  }}
                >
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MovieInfo;
