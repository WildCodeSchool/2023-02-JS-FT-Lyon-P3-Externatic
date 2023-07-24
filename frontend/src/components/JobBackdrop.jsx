import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CandidateContext from "../Contexts/CandidateContext";
import "react-toastify/dist/ReactToastify.css";
import { api } from "./api";

function JobBackdrop({ open, onClose }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { ids } = useParams();
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

  useEffect(() => {
    if (ids) {
      axios
        .get(`${BACKEND_URL}/jobs/${ids}`)
        .then((response) => {
          setSelectedJob(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [ids]);

  // Post offer in the database
  const { candidate } = useContext(CandidateContext);

  const [openSubscribeModal, setOpenSubscribeModal] = useState(false);

  const handlePostOffer = (jobOffer) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getUTCDate();
    const newDate = `${year}-${month}-${day}`;
    try {
      if (!candidate.id) {
        setOpenSubscribeModal(true);
      } else {
        axios
          .post(`${BACKEND_URL}/applications`, {
            candidate_id: candidate.id,
            company_id: jobOffer.company_id,
            job_posting_id: jobOffer.id,
            date: newDate,
            status: "en cours",
          })

          .then(
            toast.success(
              `Votre candidature chez ${jobOffer.name} a bien été prise en compte.`
            )
          )
          // Sending Email to the company saying which candidate applied to which offer.
          .then(
            api.sendEmail({
              from: candidate.email,
              to: jobOffer.email,
              subject: `${candidate.firstname} a postulé  à l'une de vos offres.`,
              text: `  
                ${candidate.firstname} a postulé à votre offre de ${jobOffer.title} à ${jobOffer.name} - Email: ${candidate.email}`,
              html: ` 
                ${candidate.firstname} a postulé à votre offre de ${jobOffer.title} à ${jobOffer.name} -  (Email: ${candidate.email}, Phone:${candidate.phone})`,
            })
          )
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };
  return (
    <Container>
      {openSubscribeModal && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openSubscribeModal}
          onClick={() => {
            setOpenSubscribeModal(false);
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              color: "black",
              width: "40%",
              height: "40%",
              borderRadius: "1em",
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              Vous devez être connecté comme Candidat pour postuler à une offre.
            </Typography>
          </Box>
        </Backdrop>
      )}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClose={onClose}
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
                  onClick={() => {
                    handlePostOffer(selectedJob);
                  }}
                >
                  Postuler
                </Button>
              </CardContent>
              <CardContent sx={{ mr: "1rem" }}>
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
                  <Typography sx={{ marginLeft: "1rem", marginRight: "1rem" }}>
                    {new Date(selectedJob.posting_date).toLocaleDateString()}
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
    </Container>
  );
}

export default JobBackdrop;

JobBackdrop.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
