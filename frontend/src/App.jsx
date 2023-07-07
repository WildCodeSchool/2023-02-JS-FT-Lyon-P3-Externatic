import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CandidateProfile from "./pages/CandidateProfile";
import CompanyProfile from "./pages/CompanyProfile";
import Ads from "./pages/Ads";
import Register from "./pages/Register";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const theme = createTheme({
    palette: {
      type: "light",
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/annonces" element={<Ads />} />
          <Route path="/espace-candidat" element={<CandidateProfile />} />
          <Route path="/espace-recruteur" element={<CompanyProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
