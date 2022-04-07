import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log("data", data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="row d-flex justify-content-center m-4">
      <h4 className="col-7 d-flex justify-content-center">Login</h4>

      <div className="col-6 d-flex justify-content-center">
        <div className="">
          <form onSubmit={handleFormSubmit}>
            <input
              className="form-input m-2"
              placeholder="Your email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
            <br />
            <input
              className="form-input m-2"
              placeholder="******"
              name="password"
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
            <br />

            <span className="d-flex justify-content-center">
              <button className="m-2" type="submit">
                Submit
              </button>
            </span>
          </form>
          {error && <div>Login failed</div>}
        </div>
      </div>
    </main>
  );
};

export default Login;
