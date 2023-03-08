import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const loginHandler = (e) => {
    e.preventDefault();
    const email = document.getElementById("loginemail").value;
    const password = document.getElementById("loginpass").value;
    const reqBody = {
      email,
      password,
    };
    fetch(`/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setUser(data);
            setLoggedIn(true);
            return;
          });
        } else {
          alert("YOU DONT HAVE AN ACCOUNT!");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loggedIn) {
    return (
      <div>
        <button>
          <Link state={user} to="/userpage">Your Account</Link>
        </button>
      </div>
    );
  }
  return (
    <React.Fragment>
      <h2>Already a member?</h2>
      <p>Login:</p>
      <form onSubmit={loginHandler}>
        <div>
          <label>
            Email:<span> </span>
          </label>
          <input
            type="email"
            required
            autoComplete="off"
            id="loginemail"
            placeholder="youremail@email.com"
          />
        </div>
        <div>
          <label>
            Password:<span> </span>
          </label>
          <input
            type="password"
            required
            autoComplete="off"
            id="loginpass"
            placeholder="*******"
          />
        </div>
        <button>Login</button>
      </form>
    </React.Fragment>
  );
};

export default Login;
