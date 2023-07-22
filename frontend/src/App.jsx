import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CompanyProfile from "./pages/CompanyProfile";
import Home from "./pages/Home";
import CandidateProfile from "./pages/CandidateProfile";
import Admin from "./pages/Admin";
import AdminHome from "./components/Admin/AdminHome";
import AdminUsers from "./components/Admin/Candidates/AdminCandidates";
import AdminCompanies from "./components/Admin/Companies/AdminCompanies";
import AdminJobs from "./components/Admin/Jobs/AdminJobs";
import Ads from "./pages/Ads";
import Blog from "./pages/Blog";
import Register from "./pages/Register";
import RegisterCompany from "./pages/RegisterCompany";
import LoginChoice from "./pages/LoginChoice";
import LoginCompany from "./pages/LoginCompany";
import LoginCandidate from "./pages/LoginCandidate";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#CA2061",
      },
      secondary: {
        main: "#851342",
      },
    },
    spacing: 10,
    typography: {
      fontFamily: "Jost",
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar toggleColorMode={toggleColorMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginChoice />} />
          <Route path="/login-candidate" element={<LoginCandidate />} />
          <Route path="/login-company" element={<LoginCompany />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/register-candidate" element={<Register />} />
          <Route path="/espace-pro" element={<CompanyProfile />} />
          <Route path="/annonces" element={<Ads />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/espace-candidat" element={<CandidateProfile />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminHome />} />
            <Route path="admin-candidates" element={<AdminUsers />} />
            <Route path="admin-companies" element={<AdminCompanies />} />
            <Route path="admin-jobs" element={<AdminJobs />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
