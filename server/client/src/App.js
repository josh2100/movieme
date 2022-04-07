import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import AllUsers from "./pages/AllUsers";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
// import Home from "./pages/Home";
import HomeArticles from "./pages/HomeArticles";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container-fluid d-flex flex-column min-vh-100">
          <Header />
            <Switch>
              <Route exact path="/" component={HomeArticles} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:_id?" component={Profile} />
              <Route exact path="/allusers" component={AllUsers} />
              <Route component={NoMatch} />
            </Switch>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
