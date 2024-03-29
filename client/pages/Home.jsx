import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import "../../stylesheets/Home.scss";

//THIS IS THE HOMEPAGE COMPONENT. IT REALLY DOESNT HAVE MUCH GOING ON, IT RENDERS THE LOGIN COMPONENT AND HAS A BUTTON THAT CAN ROUTE US TO THE SIGNUP COMPONENT IF USER DOESNT HAVE AN ACCOUNT

const Home = () => {
  return (
    <React.Fragment>
      <h1 id="main__header">کتابیں</h1>
      <p id='subscript'>a written or printed work consisting of pages glued or sewn together along one side and bound in covers.</p>
      <div id="main__login">
        <Login></Login>
      </div>
      <div id="main__signup">
        <h2 id="signup__header">Not a member?</h2>
        <button id="signup__button">
          <Link id="link" to="/signup">
            Sign Up!
          </Link>
        </button>
      </div>
    </React.Fragment>
  );
};

export default Home;
