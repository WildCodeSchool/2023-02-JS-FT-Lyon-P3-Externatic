import * as React from "react";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import cardJobPosting from "../../assets/cardJobPosting.jpg";
// Import Swiper styles

// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/navigation";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";

export default function TopAnnoncesCard() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [jobPosting, setJobPosting] = useState();
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

  const jobsApplication = async () => {
    const res = await axios.get(`${BACKEND_URL}/jobs`);
    setJobPosting(res.data);
  };

  const formatText = (text) => {
    return text.split("\n").map((line) => (
      <React.Fragment key={selectedJob.id}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  useEffect(() => {
    jobsApplication();
  }, []);
  return (
    <Container>
      <Stack
        sx={{ pt: 1, m: 0 }}
        display="flex"
        direction="row"
        spacing={1}
        justifyContent="center"
        minWidth="1200"
        // flexWrap="wrap"
      >
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={40}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: false }}
        >
          {jobPosting &&
            jobPosting.map((jobs) => (
              <SwiperSlide key={jobs.id} className="">
                <Card
                  sx={{
                    maxWidth: 335,
                    minWidth: 280,
                    m: 2,
                    height: 450,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="city"
                    height="140"
                    image={cardJobPosting}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {jobs.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${jobs.description.slice(0, 150)}...`} <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleOpen(jobs)}>
                      View
                    </Button>
                    <Button onClick={() => handleToggleFavorite(jobs)}>
                      {checkIsFavorite(jobs)
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"}
                    </Button>
                  </CardActions>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </Stack>
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
                <Typography sx={{ marginBottom: "1rem" }}>
                  {formatText(selectedJob.description)}
                </Typography>
                <Typography sx={{ marginBottom: "1rem" }}>
                  {formatText(selectedJob.requirements)}
                </Typography>
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
                  <Typography sx={{ marginLeft: "1rem", marginRight: "1rem" }}>
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
    </Container>
  );
}
