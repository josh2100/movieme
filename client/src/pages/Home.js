import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { Redirect, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { movieSearch, movieSearchByQuery } from "../utils/API";

const Home = () => {
  // Check if logged in true or false with Auth.loggedIn();
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  const [movies, setMovies] = useState([]);
  const genres = [
    "action",
    "comedy",
    "drama",
    "fantasy",
    "horror",
    "mystery",
    "romance",
  ];

  const handleSearch = async (genre) => {
    try {
      console.log(genre);
      const data = await movieSearchByQuery(genre);
      setMovies(data);
      console.log("movies:", movies);
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="row justify-content-evenly">
      <p className="col-12 d-flex justify-content-center">Click a genre and enjoy!</p>

      <div className="row d-flex justify-content-center">
        {genres.map((genre) => (
          <button
            className="col-3 col-sm-2 col-lg-1 m-1 pageLinks shadow"
            onClick={() => {
              handleSearch(genre);
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="row ms-5 me-5 mt-5 d-flex justify-content-center">
        {movies.map((movie) => (
          <div key={movie.id} className="card col-12 col-sm-3 m-3 shadow-lg">
            <p><strong>{movie.title}</strong></p>
            <p>Overview: {movie.overview}</p>
            <img
              alt=""
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            ></img>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
