import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Link from "@mui/material/Link";
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
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteJobs") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("favoriteJobs", JSON.stringify(favorites));
  }, [favorites]);

  const checkIsFavorite = (job) => {
    return favorites.some((favoriteJob) => favoriteJob.id === job.id);
  };
  const handleToggleFavorite = (job) => {
    if (checkIsFavorite(job)) {
      const updatedFavorites = favorites.filter(
        (favoriteJob) => favoriteJob.id !== job.id
      );
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, job];
      setFavorites(updatedFavorites);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

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
                            <Button
                              size="small"
                              onClick={() => handleOpen(favorite)}
                            >
                              View
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                  onClick={handleClose}
                >
                  <Box
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      width: "50%",
                    }}
                  >
                    {selectedJob && (
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ m: "2rem" }}>
                          <Button
                            onClick={() => handleToggleFavorite(selectedJob)}
                          >
                            {checkIsFavorite(selectedJob)
                              ? "Retirer des favoris"
                              : "Ajouter aux favoris"}
                          </Button>
                          <Typography gutterBottom variant="h5" component="h2">
                            {selectedJob.name}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="h3">
                            {selectedJob.title}
                          </Typography>
                          <Typography sx={{ marginBottom: "1rem" }}>
                            {selectedJob.description}
                          </Typography>
                          <Typography sx={{ marginBottom: "1rem" }}>
                            {selectedJob.requirements}
                          </Typography>
                          <Typography sx={{ marginBottom: "1rem" }}>
                            {selectedJob.salary}
                          </Typography>
                          <Button
                            variant="contained"
                            size="large"
                            sx={{ marginTop: "1rem" }}
                          >
                            Postuler
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            borderRadius: "3rem",
                            border: "0.1px solid grey",
                            marginTop: "2rem",
                            marginRight: "1rem",
                            padding: "1rem",
                            height: "15rem",
                          }}
                        >
                          <Typography sx={{ marginBottom: "0.2rem" }}>
                            Poste recherché : {selectedJob.category}
                          </Typography>
                          <Typography sx={{ marginBottom: "0.2rem" }}>
                            {selectedJob.contact}
                          </Typography>
                          <Typography sx={{ marginBottom: "0.2rem" }}>
                            {selectedJob.location}
                          </Typography>
                          <Typography sx={{ marginBottom: "0.2rem" }}>
                            Type de contrat : {selectedJob.type}
                          </Typography>
                          <Typography sx={{ marginBottom: "0.2rem" }}>
                            {selectedJob.remote}
                          </Typography>
                          <Typography>
                            Date de publication : {selectedJob.posting_date}
                          </Typography>
                          <Link
                            href={selectedJob.website}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button
                              variant="contained"
                              size="small"
                              sx={{ marginTop: "1rem" }}
                            >
                              Site Web
                            </Button>
                          </Link>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Backdrop>
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
