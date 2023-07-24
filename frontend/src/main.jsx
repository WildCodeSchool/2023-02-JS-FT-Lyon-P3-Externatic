import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { CandidateContextProvider } from "./Contexts/CandidateContext";
import { CompanyContextProvider } from "./Contexts/CompanyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CandidateContextProvider>
        <CompanyContextProvider>
          <App />
        </CompanyContextProvider>
      </CandidateContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
