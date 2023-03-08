import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FileUploader from "../components/FileUploader";

const UserPage = () => {
  const location = useLocation();
//   const [name, setName] = useState("");
//   console.log(location.state);
//   if (location.state) {
//     const name = location.state.firstName + " " + location.state.lastName;
//     setName(name);
//   }
  return (
    <React.Fragment>
      <h1>Welcome to your bookshelf!</h1>
      <FileUploader props={location.state}/>
    </React.Fragment>
  );
};

export default UserPage;
