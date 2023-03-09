import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import '../stylesheets/Html.scss';

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <React.Fragment>
    <App></App>
  </React.Fragment>
);
