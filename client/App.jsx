import React from "react";
import Home from "./pages/Home";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import UserPage from './pages/UserPage';


//THIS IS THE MAIN APP COMPONENT, THAT RENDERS EVERYTHING ELSE. ITS USING REACT ROUTER SO THAT ALL CHILD COMPONENTS HAVE ACCESS TO THESE PREDEFINED ROUTES. THE / IS THE HOMEPAGE, SO IN THIS INSTANCE SINCE THE / IS THE DEFAULT, THE HOME COMPONENT WILL RENDER FIRST.

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
