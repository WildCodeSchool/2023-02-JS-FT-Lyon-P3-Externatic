import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PropTypes } from "prop-types";

export default function AdsList({ infoDataFiltered, infoDataNoFiltered }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  useEffect(() => {
    if (id) {
      axios
        .get(`${BACKEND_URL}/jobs/${id}`)
        .then((response) => {
          setSelectedJob(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  return (
    <>
      {infoDataNoFiltered && (
        <Container sx={{ py: 8, textAlign: "center" }} maxWidth="xl">
          <Grid container spacing={4}>
            {infoDataNoFiltered.map((jobOffer) => (
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
                    <Typography>{`${jobOffer.description.slice(
                      0,
                      150
                    )}...`}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleOpen(jobOffer)}>
                      View
                    </Button>
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
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
                    <Typography gutterBottom variant="h5" component="h2">
                      {selectedJob.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3">
                      {selectedJob.title}
                    </Typography>
                    <Button onClick={handleToggleFavorite}>
                      {isFavorite
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"}
                    </Button>
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
        </Container>
      )}
      {infoDataFiltered && (
        <Container sx={{ py: 8, textAlign: "center" }} maxWidth="xl">
          <Grid container spacing={4}>
            {infoDataFiltered.map((jobOffer) => (
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
                    <Typography>{`${jobOffer.description.slice(
                      0,
                      150
                    )}...`}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleOpen(jobOffer)}>
                      View
                    </Button>
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
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
                    <Typography gutterBottom variant="h5" component="h2">
                      {selectedJob.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3">
                      {selectedJob.title}
                    </Typography>
                    <Button onClick={handleToggleFavorite}>
                      {isFavorite
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"}
                    </Button>
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
      job_category_id: PropTypes.number.isRequired,
      job_type_id: PropTypes.number.isRequired,
      job_location_id: PropTypes.number.isRequired,
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
