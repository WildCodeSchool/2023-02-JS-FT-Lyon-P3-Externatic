import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Avatar from "@mui/material/Avatar";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CandidateContext from "../Contexts/CandidateContext";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../services/api";
import "animate.css";

export default function AdsList({ infoDataFiltered, infoDataNoFiltered }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () => toast.error("Problème d'ouverture de l'offre..");
  const notifyErrors = () =>
    toast.error("Problème d'envoi de la candidature..");
  const { ids } = useParams();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteJobs") || "[]")
  );

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
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
          notifyError();
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
            notifyErrors();
          });
      }
    } catch (error) {
      console.error(error);
      notifyErrors();
    }
    return undefined;
  };

  return (
    <>
      {infoDataNoFiltered && (
        <Backdrop
          sx={{
            color: "#fff",
            display: "flex",
            textAlign: "center",
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
                </CardContent>
              </Box>
            )}
          </Box>
        </Backdrop>
      )}
      {infoDataFiltered && (
        <Backdrop
          sx={{
            color: "#fff",
            display: "flex",
            textAlign: "center",
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
                </CardContent>
              </Box>
            )}
          </Box>
        </Backdrop>
      )}
      {/* Subscribe modal annoncement */}
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
      {!infoDataFiltered && infoDataNoFiltered && (
        <Container
          className="animate__animated animate__fadeInUp"
          sx={{ py: 8, textAlign: "center" }}
          maxWidth="xl"
        >
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

          <Pagination
            count={Math.ceil(infoDataNoFiltered.length / 9)} // Calculate the total number of pages
            color="primary"
            onChange={handlePaginationChange} // Handle page change events
            page={page} // Pass the current page number
            sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}
          />
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
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Pagination
            count={Math.ceil(infoDataFiltered.length / 9)} // Calculate the total number of pages
            color="primary"
            onChange={handlePaginationChange} // Handle page change events
            page={page} // Pass the current page number
            sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}
          />
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
