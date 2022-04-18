import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { Redirect, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { SAVE_ARTICLE } from "../utils/mutations";
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
  const [saveArticle] = useMutation(SAVE_ARTICLE);
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

  const handleSaveArticle = async (element) => {
    saveArticle({
      variables: {
        title: element.title,
        content: element.content,
        description: element.description,
        image: element.image,
        url: element.url,
      },
    });
  };

  return (
    <main className="row justify-content-evenly">
      <p className="col-12 d-flex justify-content-center">Click a genre and enjoy!</p>

      <div className="row d-flex justify-content-center">
        {genres.map((genre) => (
          <button
            className="col-3 col-sm-2 col-lg-1 m-1 pageLinks"
            onClick={() => {
              handleSearch(genre);
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="card col-12 col-sm-3 ">
            <p>Movie ID: {movie.id}</p>
            <p>Title: {movie.title}</p>
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
