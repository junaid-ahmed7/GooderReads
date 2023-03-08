import React from "react";
import Home from "./pages/Home";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <Routes>
          <Route path="/userpage" element={<UserPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </HashRouter>
    </React.Fragment>
  );
};

export default App;
