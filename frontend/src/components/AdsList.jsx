import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import { PropTypes } from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import CandidateContext from "../Contexts/CandidateContext";
import { api } from "./api";
import JobBackdrop from "./JobBackdrop";

export default function AdsList({ infoDataFiltered, infoDataNoFiltered }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [openJobDetails, setOpenJobDetails] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteJobs") || "[]")
  );

  const handleOpen = (jobOffer) => {
    setOpenJobDetails(true);
    setSelectedJob(jobOffer);
  };

  const handleCloseJobDetails = () => {
    setOpenJobDetails(false);
  };

  const handlePaginationChange = (event, value) => {
    setPage(value); // Update the current page number
  };

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
    <>
      {!infoDataFiltered && infoDataNoFiltered && (
        <Container sx={{ py: 8, textAlign: "center" }} maxWidth="xl">
          <Grid container spacing={4}>
            {infoDataNoFiltered
              .slice((page - 1) * 9, page * 9)
              .map((jobOffer) => (
                <Grid item key={jobOffer.id} xs={12} sm={6} md={4}>
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
                      <Typography gutterBottom variant="h5" component="h2">
                        {jobOffer.name}
                      </Typography>
                      <ReactQuill
                        theme="bubble"
                        value={`${jobOffer.description.slice(0, 150)}...`}
                        readOnly
                      />
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleOpen(jobOffer)}>
                        View
                      </Button>
                      <Button onClick={() => handleToggleFavorite(jobOffer)}>
                        {checkIsFavorite(jobOffer)
                          ? "Retirer des favoris"
                          : "Ajouter aux favoris"}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
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
                  Vous devez être connecté comme Candidat pour postuler à une
                  offre.
                </Typography>
              </Box>
            </Backdrop>
          )}
          <Pagination
            count={Math.ceil(infoDataNoFiltered.length / 9)} // Calculate the total number of pages
            color="primary"
            onChange={handlePaginationChange} // Handle page change events
            page={page} // Pass the current page number
            sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}
          />
          {openJobDetails && (
            <JobBackdrop
              open={openJobDetails}
              handleClose={handleCloseJobDetails}
              selectedJob={selectedJob}
              handleToggleFavorite={handleToggleFavorite}
              handlePostOffer={handlePostOffer}
            />
          )}
        </Container>
      )}
      {infoDataFiltered && (
        <Container sx={{ py: 8, textAlign: "center" }} maxWidth="xl">
          <Grid container spacing={4}>
            {infoDataFiltered
              .slice((page - 1) * 9, page * 9)
              .map((jobOffer) => (
                <Grid item key={jobOffer.id} xs={12} sm={6} md={4}>
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
                      <Typography gutterBottom variant="h5" component="h2">
                        {jobOffer.name}
                      </Typography>
                      <ReactQuill
                        theme="bubble"
                        value={`${jobOffer.description.slice(0, 150)}...`}
                        readOnly
                      />
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleOpen(jobOffer)}>
                        View
                      </Button>
                      <Button onClick={() => handleToggleFavorite(jobOffer)}>
                        {checkIsFavorite(jobOffer)
                          ? "Retirer des favoris"
                          : "Ajouter aux favoris"}
                      </Button>
                      <Button
                        onClick={() => {
                          handlePostOffer(selectedJob);
                        }}
                      >
                        Apply
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
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
                  Vous devez être connecté comme Candidat pour postuler à une
                  offre.
                </Typography>
              </Box>
            </Backdrop>
          )}
          <Pagination
            count={Math.ceil(infoDataFiltered.length / 9)} // Calculate the total number of pages
            color="primary"
            onChange={handlePaginationChange} // Handle page change events
            page={page} // Pass the current page number
            sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}
          />
          {openJobDetails && (
            <JobBackdrop
              open={openJobDetails}
              onClose={handleCloseJobDetails}
              selectedJob={selectedJob}
              handleToggleFavorite={handleToggleFavorite}
              handlePostOffer={handlePostOffer}
            />
          )}
        </Container>
      )}
    </>
  );
}

AdsList.defaultProps = {
  infoDataFiltered: [],
};

AdsList.propTypes = {
  infoDataFiltered: PropTypes.arrayOf(
    PropTypes.shape({
      archived: PropTypes.number,
      company_id: PropTypes.number,
      job_category_id: PropTypes.number,
      job_type_id: PropTypes.number,
      job_location_id: PropTypes.number,
      contact: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
      posting_date: PropTypes.string,
      remote: PropTypes.string,
      requirements: PropTypes.string,
      salary: PropTypes.string,
      title: PropTypes.string,
      website: PropTypes.string,
    })
  ),
};
AdsList.defaultProps = {
  infoDataNoFiltered: [],
};

AdsList.propTypes = {
  infoDataNoFiltered: PropTypes.arrayOf(
    PropTypes.shape({
      archived: PropTypes.number.isRequired,
      company_id: PropTypes.number.isRequired,
      contact: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      posting_date: PropTypes.string.isRequired,
      remote: PropTypes.string.isRequired,
      requirements: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    })
  ),
};
