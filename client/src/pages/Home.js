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
  const [movies, setMovies] = useState([
    // {
    //   title: "Star Wars: Episode IV - A New Hope",
    //   Year: "1977",
    //   imdbID: "tt0076759",
    //   Type: "movie",
    //   Poster:
    //     "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    // },
    // {
    //   title: "Star Wars: Episode V - The Empire Strikes Back",
    //   Year: "1980",
    //   imdbID: "tt0080684",
    //   Type: "movie",
    //   Poster:
    //     "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    // },
    // {
    //   title: "Star Wars: Episode VI - Return of the Jedi",
    //   Year: "1983",
    //   imdbID: "tt0086190",
    //   Type: "movie",
    //   Poster:
    //     "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    // },
  ]);
  const [saveArticle] = useMutation(SAVE_ARTICLE);

  const handleSearch = async (genre) => {
    try {
      console.log(genre);
      const data = await movieSearchByQuery(genre);
      setMovies(data);
      // setMovies(data);
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
      <p>click a genre</p>
      <button
        className="col-2"
        onClick={() => {
          handleSearch("action");
        }}
      >
        Random
      </button>
      <div className="">
        {movies.map((movie) => (
          <div key={movie.id} className="card">
            movie<p>{movie.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
