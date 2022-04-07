import { Redirect, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { ADD_COMMENT, DELETE_ARTICLE } from "../utils/mutations";
import Auth from "../utils/auth";

const Watchlist = () => {
  const { _id: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { _id: userParam },
    // Get data with a new fetch each time, not the cache
    fetchPolicy: "network-only",
  });

  const user = data?.me || data?.user || {};
  const [deleteArticle] = useMutation(DELETE_ARTICLE);

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="d-flex justify-content-center">
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  const handleDeleteArticle = async (articleId) => {
    console.log("Delete article with ID:", articleId);
    await deleteArticle({
      variables: { articleId },
    });
    window.location.reload();
  };

  return (
    <main className="row justify-content-evenly">
      <h2>Watchlist</h2>
 
    </main>
  );
};

export default Watchlist;
