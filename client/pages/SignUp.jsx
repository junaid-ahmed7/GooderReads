import React from "react";

const SignUp = () => {
  const formHandler = (e) => {
    e.preventDefault();
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const passOne = document.getElementById("pass1").value;
    const passTwo = document.getElementById("pass2").value;
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
    const reqBody = {
      firstName,
      lastName,
      email,
      age,
      password: passOne,
    };
    fetch("/form", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    });
  };
  return (
    <React.Fragment>
      <h1>SignUp Page!</h1>
      <form method="post" onSubmit={formHandler}>
        <div>
          <div>
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

          <div>
            <label>Last Name:<span> </span></label>
            <input
              type="text"
              required
              autoComplete="off"
              id="lname"
              placeholder="your last name"
            />
          </div>
        </div>

        <div>
          <label>Email Address:<span> </span></label>
          <input
            type="email"
            required
            autoComplete="off"
            id="email"
            placeholder="youremail@email.com"
          />
        </div>

        <div>
          <label>Age:<span> </span></label>
          <input type="number" required autoComplete="off" id="age" />
        </div>

        <div>
          <label>Set A Password:<span> </span></label>
          <input
            type="password"
            required
            autoComplete="off"
            id="pass1"
            placeholder="*******"
          />
          <label>Type Password Again:<span> </span></label>
          <input
            type="password"
            required
            autoComplete="off"
            id="pass2"
            placeholder="*******"
          />
        </div>

        <button type="submit">Get Started</button>
      </form>
    </React.Fragment>
  );
};

export default SignUp;
