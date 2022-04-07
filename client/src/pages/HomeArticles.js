import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { Redirect, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { SAVE_ARTICLE } from "../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { newsArticles } from "../utils/API";

function HomeArticles() {
  // Check if logged in true or false with Auth.loggedIn();
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // Use this to test if .env works console.log("process.env",process.env);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [saveArticle] = useMutation(SAVE_ARTICLE);

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
      </main>
    );
  
}

export default HomeArticles;
