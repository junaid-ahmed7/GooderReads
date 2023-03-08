import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

//THIS IS THE HOMEPAGE COMPONENT. IT REALLY DOESNT HAVE MUCH GOING ON, IT RENDERS THE LOGIN COMPONENT AND HAS A BUTTON THAT CAN ROUTE US TO THE SIGNUP COMPONENT IF USER DOESNT HAVE AN ACCOUNT

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
