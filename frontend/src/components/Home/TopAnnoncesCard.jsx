import * as React from "react";
import Card from "@mui/material/Card";
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

  const jobsApplication = async () => {
    const res = await axios.get(`${BACKEND_URL}/jobs`);
    setJobPosting(res.data);
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
                      {jobs.description} <br />
                      {jobs.requirements} <br />
                      {jobs.contract_type}
                      {jobs.remote}
                      {jobs.location} <br />
                      {jobs.salary} <br />
                      {jobs.posting_date} <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">VOIR PLUS</Button>
                    <Button size="small">SHARE</Button>
                  </CardActions>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </Stack>
    </Container>
  );
}
