import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import CandidateCard from "../components/Candidate/CandidateCard";
import CandidateApplications from "../components/Candidate/CandidateApplications";

export default function CandidateProfile() {
  return (
    <>
      <Navbar />
      <Container maxWidth="xxl" sx={{ mt: 4 }}>
        <Typography variant="h3" color="initial" sx={{ m: 3 }}>
          Espace Candidat
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={4}>
              <CandidateCard />
            </Grid>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ height: "100%" }}>
                <CandidateApplications />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ height: "15rem" }}>
                <Typography variant="h6" color="initial">
                  Mes Annonces Préférées
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
