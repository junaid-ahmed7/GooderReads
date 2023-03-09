import React from "react";
import "../../stylesheets/Signup.scss";

//COMPONENT RESPONSIBLE FOR ADDING NEW USERS TO THE DATA BASE

const SignUp = () => {
  //FORM HANDLER, GETS INVOKED WHEN THE FORM IS SUBMITTED(SUBMIT BUTTON IN FORM PRESSED)
  const formHandler = (e) => {
    //PREVENT DEFAULT BEHAVIOUR OF RELOADING THE PAGE
    e.preventDefault();

    //GETTING ALL THE FORM ELEMENT VALUES AND SAVING TO A VARIABLE. I WANTED TO DO THIS WITH THE FORM DATA OBJECT, BUT IT WASNT WORKING. CANT GET IT TO WORK BEFORE ON OTHER PROJECTS ASWELL FOR SOME REASON
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const passOne = document.getElementById("pass1").value;
    const passTwo = document.getElementById("pass2").value;

    //BASIC VALIDATION TO CHECK IF PASSWORDS MATCH, PASSWORD IS OFF SUFFICIENT LENGTH AND USER IS OLD ENOUGH FOR AN ACCOUNT
    if (passOne !== passTwo) {
      alert("PASSWORDS DONT MATCH!!");
      return;
    }
    if (passOne.length < 10) {
      alert("PASSWORD MUST BE ATLEST 10 CHARACTERS LONG");
      return;
    }
    if (age < 19) {
      alert("YOU ARE TOO YOUNG!!");
      return;
    }

    //CREATING AN OBJECT USING ALL PREVIOUSLY CREATED VARIABLES, SO THAT WE CAN MAKE A POST REQUEST TO OUR DATABASE TO ADD THIS NEW USER
    const reqBody = {
      firstName,
      lastName,
      email,
      age,
      password: passOne,
    };

    ///FETCH REQUEST USING POST METHOD, TO OUR EXPRESS BACKEND ROUTE, BODY IS SENT AS JSON AS THAT IS THE STANDARD NORMALLY.
    fetch("/form", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    });
  };

  //NOTHING SPECIAL ABOUT THIS FUNCTIONS RENDER, JUST A BASIC FORM
  return (
    <React.Fragment>
      <h1 id="signup__header">SignUp Page!</h1>
      <form method="post" onSubmit={formHandler} id="signup__form">
        <div id="signup__input">
            <label>
              First Name:<span> </span>
            </label>
          <input
            type="text"
            required
            autoComplete="off"
            id="fname"
            placeholder="your first name"
          />
        </div>

        <div id="signup__input">
            <label>
              Last Name:<span> </span>
            </label>
          <input
            type="text"
            required
            autoComplete="off"
            id="lname"
            placeholder="your last name"
          />
        </div>

        <div id="signup__input">
            <label>
              Email Address:<span> </span>
            </label>
          <input
            type="email"
            required
            autoComplete="off"
            id="email"
            placeholder="youremail@email.com"
          />
        </div>

        <div id="signup__input">
            <label>
              Age:<span> </span>
            </label>
          <input
            placeholder="#"
            type="number"
            required
            autoComplete="off"
            id="age"
          />
        </div>

        <div id="signup__input">
            <label>
              Set A Password:<span> </span>
            </label>
          <input
            type="password"
            required
            autoComplete="off"
            id="pass1"
            placeholder="*******"
          />
        </div>
        <div id="signup__input">
            <label>
              Type Password Again:<span> </span>
            </label>
          <input
            type="password"
            required
            autoComplete="off"
            id="pass2"
            placeholder="*******"
          />
        </div>

        <button id="signup__button" type="submit">
          Get Started
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignUp;
