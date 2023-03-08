import React from "react";

const SignUp = () => {
  const formHandler = (e) => {
    e.preventDefault();
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const passOne = document.getElementById('pass1').value;
    const passTwo = document.getElementById('pass2').value;
    const reqBody = {
        firstName,
        lastName,
        email,
        passOne,
        passTwo
    };
    console.log(reqBody)
    fetch('/form', 
    {
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        method: 'POST',
        body: JSON.stringify(reqBody)
    });
    // console.log(formData);
    // console.log(e.target);
  };
  return (
    <React.Fragment>
      <h1>SignUp Page!</h1>
            <form method="post" onSubmit={formHandler}>
              <div>
                <div>
                  <label>
                    First Name<span>*</span>
                  </label>
                  <input type="text" required autoComplete="off" id='fname'/>
                </div>

                <div>
                  <label>
                    Last Name<span>*</span>
                  </label>
                  <input type="text" required autoComplete="off" id='lname'/>
                </div>
              </div>

              <div>
                <label>
                  Email Address<span>*</span>
                </label>
                <input type="email" required autoComplete="off" id='email' />
              </div>

              <div>
                <label>
                  Set A Password<span>*</span>
                </label>
                <input type="password" required autoComplete="off" id="pass1" />
                <label>
                  Type Password Again<span>*</span>
                </label>
                <input type="password" required autoComplete="off" id="pass2" />
              </div>

              <button type="submit">Get Started</button>
            </form>
    </React.Fragment>
  );
};

export default SignUp;
