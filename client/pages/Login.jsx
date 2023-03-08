import React from "react";

const Login = () => {
  return (
    <React.Fragment>
      <h2>Already a member?</h2>
      <p>Login:</p>
      <form>
        <input type="text" placeholder="username"></input>
        <input type="text" placeholder="password"></input>
        <button>Login</button>
      </form>
    </React.Fragment>
  );
};

export default Login;
