import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import logo from "../assets/externatic-logo.png";
import accueil from "../assets/accueil.jpg";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Externatic / Team PAF
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function LoginChoice() {
  const navigate = useNavigate();

  const handleLinkCandidates = () => {
    navigate("/login-candidate");
  };
  const handleLinkCompanies = () => {
    navigate("/login-company");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: `url(${accueil})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ my: 4 }}>
          <img src={logo} alt="logo" width="200px" />
        </Box>
        <Stack
          spacing={4}
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          sx={{ p: 4 }}
        >
          <Button
            size="large"
            variant="outlined"
            onClick={handleLinkCandidates}
          >
            Login Candidat
          </Button>
          <Button size="large" variant="outlined" onClick={handleLinkCompanies}>
            Login Entreprise
          </Button>
        </Stack>
        <Copyright sx={{ mt: 5 }} />
      </Grid>
    </Grid>
  );
}
