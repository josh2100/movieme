// import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import dateBuilder from "../../utils/dateBuilder";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="row">
      <div className="col-2">
        <strong>{dateBuilder(0)}</strong>
      </div>
      <nav className=" col-10 d-flex justify-content-end">
        {Auth.loggedIn() ? (
          <>
            <button className="m-1 pageLinks">
              <Link className="pageLinks" to="/allusers">
                All Users
              </Link>
            </button>

            <button className="m-1 pageLinks">
              <Link className="pageLinks" to="/profile">
                Profile
              </Link>
            </button>

            <button className="m-1 pageLinks">
              <a className="pageLinks" href="/" onClick={logout}>
                Logout
              </a>
            </button>
          </>
        ) : (
          <>
            <button className="m-1 pageLinks">
              <Link className="pageLinks" to="/login">
                Login
              </Link>
            </button>

            <button className="m-1 pageLinks">
              <Link className="pageLinks" to="/signup">
                Signup
              </Link>
            </button>
          </>
        )}
      </nav>

      <Link to="/" className="offset-4 col-4">
        <h1 className="mainHeader oldFont col-12 d-flex justify-content-center">
          <strong>Joy News</strong>
        </h1>
      </Link>
      <div className="col-12 d-flex justify-content-center">
        ________________________________________________________________________________________________________________
      </div>
      <div className="col-12 d-flex justify-content-center">
        ________________________________________________________________________________________________________________
      </div>
    </header>
  );
};

export default Header;
