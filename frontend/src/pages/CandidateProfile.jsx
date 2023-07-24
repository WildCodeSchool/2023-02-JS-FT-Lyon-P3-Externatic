import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CandidateCard from "../components/Candidate/CandidateCard";
import CandidateApplications from "../components/Candidate/CandidateApplications";
import { instance } from "../services/api";
import { useCandidateContext } from "../Contexts/CandidateContext";

export default function CandidateProfile() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { candidate } = useCandidateContext();
  const [loggedCandidate, setLoggedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const notifyError = () => toast("Erreur lors de du chargement du profil");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteJobs") || "[]")
  );

  const getCandidate = () => {
    instance
      .get(`${BACKEND_URL}/candidate-profile`)
      .then((response) => {
        setLoggedCandidate(response.data);
        setLoading(false);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
        setLoading(false);
      });
  };

  useEffect(getCandidate, [loggedCandidate]);

  useEffect(() => {
    if (!candidate?.id) {
      navigate("/login");
    } else {
      getCandidate();
    }
  }, [loggedCandidate, navigate]);

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

  return (
    <Container maxWidth="xxl" sx={{ mt: 4, textAlign: "center" }}>
      {loading ? ( // Conditional rendering based on the loading state
        <Typography variant="body1">Loading...</Typography>
      ) : (
        <>
          <Typography variant="h3" color="primary" sx={{ m: 3 }}>
            Espace Candidat
          </Typography>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid
              item
              xs={12}
              lg={4}
              elevation={3}
              sx={{
                position: { lg: "fixed" },
                left: 0,
              }}
            >
              <CandidateCard candidate={loggedCandidate} />
            </Grid>
            <Grid item xs={12} lg={8} elevation={3}>
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
                            <ReactQuill
                              theme="bubble"
                              value={`${favorite.description.slice(0, 150)}...`}
                              readOnly
                            />
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
                      marginRight: "1rem",
                      marginLeft: "1rem",
                      overflow: "auto",
                      maxHeight: "600px",
                      scrollbarWidth: "thin",
                      scrollbarColor: "#888888 #f5f5f5",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f5f5f5",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888888",
                        borderRadius: "3px",
                      },
                      "@media (min-width: 768px)": {
                        marginRight: "3rem",
                        marginLeft: "3rem",
                      },
                    }}
                  >
                    {selectedJob && (
                      <Box
                        sx={{
                          "@media (min-width: 768px)": {
                            display: "flex",
                          },
                        }}
                      >
                        <CardContent>
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{
                              height: "77px",
                              width: "77px",
                              position: "absolute",
                              mt: "-50px",
                              mx: "auto",
                              left: 0,
                              right: 0,
                            }}
                          />
                          <Button
                            onClick={() => handleToggleFavorite(selectedJob)}
                            sx={{ display: "flex", justifyContent: "start" }}
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
                          <ReactQuill
                            theme="bubble"
                            value={selectedJob.description}
                            readOnly
                          />
                          <ReactQuill
                            theme="bubble"
                            value={selectedJob.requirements}
                            readOnly
                          />
                          <Button
                            variant="contained"
                            size="large"
                            sx={{ marginTop: "1rem" }}
                          >
                            Postuler
                          </Button>
                        </CardContent>
                        <CardContent>
                          <Paper
                            sx={{
                              borderRadius: "0.8rem",
                              border: "0.1px solid grey",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <Typography
                              sx={{
                                marginBottom: "0.2rem",
                                marginLeft: "0.5rem",
                                marginRight: "0.5rem",
                              }}
                            >
                              {selectedJob.category}
                            </Typography>
                          </Paper>
                          <Paper
                            sx={{
                              borderRadius: "0.8rem",
                              border: "0.1px solid grey",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <Typography sx={{ marginBottom: "0.2rem" }}>
                              {selectedJob.location}
                            </Typography>
                          </Paper>
                          <Paper
                            sx={{
                              borderRadius: "0.8rem",
                              border: "0.1px solid grey",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <Typography sx={{ marginBottom: "0.2rem" }}>
                              {selectedJob.type}
                            </Typography>
                          </Paper>
                          <Paper
                            sx={{
                              borderRadius: "0.8rem",
                              border: "0.1px solid grey",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <Typography sx={{ marginBottom: "0.2rem" }}>
                              {selectedJob.remote}
                            </Typography>
                          </Paper>
                          <Paper
                            sx={{
                              borderRadius: "0.8rem",
                              border: "0.1px solid grey",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <Typography sx={{ marginBottom: "0.2rem" }}>
                              {selectedJob.salary}
                            </Typography>
                          </Paper>
                          <Paper
                            sx={{
                              borderRadius: "0.8rem",
                              border: "0.1px solid grey",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <Typography
                              sx={{ marginLeft: "1rem", marginRight: "1rem" }}
                            >
                              {selectedJob.posting_date}
                            </Typography>
                          </Paper>
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
                          <Button
                            href={`mailto:${selectedJob.email}`}
                            variant="contained"
                            size="small"
                            sx={{ marginTop: "1rem", marginLeft: "0.5rem" }}
                          >
                            Nous contacter
                          </Button>
                        </CardContent>
                      </Box>
                    )}
                  </Box>
                </Backdrop>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={4} justifyContent="flex-end" sx={{ my: 2 }}>
            <Grid item xs={12} lg={8} elevation={3}>
              <Paper sx={{ height: "100%", borderRadius: 2 }}>
                <CandidateApplications />
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
