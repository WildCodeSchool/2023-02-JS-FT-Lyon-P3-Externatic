import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import CandidateCard from "../components/Candidate/CandidateCard";
import CandidateApplications from "../components/Candidate/CandidateApplications";
import { useCandidateContext } from "../Contexts/CandidateContext";

export default function CandidateProfile() {
  const { candidate } = useCandidateContext();
  const navigate = useNavigate();
  const favorites = JSON.parse(localStorage.getItem("favoriteJobs")) || [];
  useEffect(() => {
    if (!candidate?.id) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <Container maxWidth="xxl" sx={{ mt: 4, textAlign: "center" }}>
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
            lg={5}
            elevation={3}
            sx={{
              position: { lg: "fixed" },
            }}
          >
            <CandidateCard candidate={candidate} />
          </Grid>
          <Grid container spacing={4} justifyContent="flex-end">
            <Grid item xs={12} lg={9} elevation={3}>
              <Paper sx={{ height: "100%" }}>
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
                {favorites.length === 0 ? (
                  <Typography variant="body1" sx={{ p: 2 }}>
                    Aucune annonce préférée disponible.
                  </Typography>
                ) : (
                  <Grid container spacing={2} sx={{ p: 2 }}>
                    {favorites.map((favorite) => (
                      <Grid item key={favorite.id} xs={12} sm={6} md={4}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            component="div"
                            sx={{
                              // 16:9
                              pt: "56.25%",
                            }}
                            image="https://source.unsplash.com/random?wallpapers"
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {favorite.name}
                            </Typography>
                            <Typography>{`${favorite.description.slice(
                              0,
                              150
                            )}...`}</Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small">View</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={4} justifyContent="flex-end" sx={{ my: 2 }}>
          <Grid item xs={12} lg={9} elevation={3}>
            <Paper sx={{ height: "100%" }}>
              <CandidateApplications />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
