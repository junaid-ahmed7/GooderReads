import React, { useState } from "react";
import { Link } from "react-router-dom";

//COMPONENT RESPONSIBLE FOR LOGGING IN OUR USER, IF THEY ALREADY HAVE AN ACCOUNT
const Login = () => {

  //STATE FOR WETHER OR NOT USER IS LOGGED IN, WILL DEFAULT TO FALSE OBVS
  const [loggedIn, setLoggedIn] = useState(false);

  //THIS STATE IS SO THAT AFTER WE QUERY THE DATABASE FOR WETHER OR NOT OUR USER EXISTS, IF THE USER DOES EXISTS WE SAVE ALL THE USERS INFO IN THE USER OBJECT, SO THAT WE CAN KEEP PASSING THAT DATA DOWN TO ALL COMPONENTS THAT NEED IT, ONCE THE USER HAS LOGGED IN. SINCE THE USERS PAGES AFTER LOGGING IN SHOULD BE DIFFERENT FOR EVERY USER.
  const [user, setUser] = useState("");

  //LOGIN HANDLER FUNCTION
  const loginHandler = (e) => {

    //PREVENT THE PAGE FROM RELOADING UPON SUBMIT
    e.preventDefault();

    //GETTING VALUES OF EMAIL AND PASS TO USE QUERY DATABASE FOR WETHER OR NOT USER EXISTS
    const email = document.getElementById("loginemail").value;
    const password = document.getElementById("loginpass").value;

    //CREATING AN OBJECT TO SEND IN THE REQUEST BODY
    const reqBody = {
      email,
      password,
    };

    //MAKING POST REQUEST TO OUR EXPRESS BACKEND TO QUERY WETHER OR NOT A USER EXISTS
    fetch(`/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        
        //ONLY IF THE STATUS WAS 200, IE: THE USER DOES HAVE AN ACCOUNT, WE WILL SET THE STATE TO LOGGED IN AND CREATE THE USER OBJECT. NOT SURE IF THE RETURN IS NECESSARY HERE BUT I DONT WANT TO TOUCH IT RIGHT NOW.
        if (res.status === 200) {
          res.json().then((data) => {
            setUser(data);
            setLoggedIn(true);
            return;
          });
        } else {
          
          //USER DID NOT HAVE A MATCHING ENTRY IN THE DB, SO NO LOG IN
          alert("YOU DONT HAVE AN ACCOUNT!");
          return;
        }
      })
      .catch((err) => {

        //BASIC ERROR HANDLER IF POST REQ FAILS
        console.log(err);
      });
  };

  //IF THE STATE HAS BEEN SET TO LOGGED IN, THIS IF CONDITIONS CODE WILL RUN, WHICH JUST MAKES IT SO THAT THIS WHOLE PAGE IS NOT A LOGIN PAGE ANYMORE, BUT HAS A NEW BUTTON THAT ALLOWS THE USER TO ACCESS THIER ACCOUNT PAGE. NOT THE BEST SOLUTION, IDEALLY I WANTED TO JUST REDIRECT THE USER AUTOMATICALLY TO THIER ACCOUNT PAGE IF THEY MANAGED TO LOGIN, BUT THAT WASNT WORKING SO ITS LIKE THIS FOR NOW
  if (loggedIn) {
    return (
      <div>
        <button>
          {/* PASSING DOWN THE USER OBJECT TO THE SIGNUP PAGE SO IT KNOWS WHAT USER THE PAGE IS FOR, AND CAN RENDER DATA ACCORDING TO THAT USER */}
          <Link state={user} to="/userpage">Your Account</Link>
        </button>
      </div>
    );
  }
  
  //JUST A BASIC LOGIN FORM, NOTHING TO NOTE
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
