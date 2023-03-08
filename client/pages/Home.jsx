import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <h1>Welcome!</h1>
      <Login></Login>
      <h2>Not a member?</h2>
      <button>
        <Link to="/signup">SignUp!</Link>
      </button>
    </React.Fragment>
  );
};

export default Home;
