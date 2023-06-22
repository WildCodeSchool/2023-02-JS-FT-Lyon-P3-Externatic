import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import CandidateCard from "../components/Candidate/CandidateCard";
import CandidateApplications from "../components/Candidate/CandidateApplications";
import { useCandidateContext } from "../Contexts/CandidateContext";

export default function CandidateProfile() {
  const { candidate } = useCandidateContext();
  const navigate = useNavigate();
  if (!candidate?.id) return navigate("/login");

  return (
    <>
      <Navbar />
      <Container maxWidth="xxl" sx={{ mt: 4 }}>
        <Typography variant="h3" color="initial" sx={{ m: 3 }}>
          Espace Candidat
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "column", lg: "row", xl: "row" },
          }}
        >
          <Grid
            item
            xs={12}
            lg={6}
            elevation={3}
            sx={{
              position: { lg: "fixed" },
            }}
          >
            <CandidateCard candidate={candidate} />
          </Grid>
          <Grid container spacing={4} justifyContent="flex-end">
            <Grid item xs={12} lg={8} elevation={3}>
              <Paper sx={{ height: "100%" }}>
                <CandidateApplications />
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={4} justifyContent="flex-end" sx={{ my: 2 }}>
          <Grid item xs={12} lg={8} elevation={3}>
            <Paper sx={{ height: "15rem" }}>
              <Typography
                variant="h6"
                color="initial"
                sx={{
                  p: 2,
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                Mes Annonces Préférées
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
