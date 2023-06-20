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
import cardJobPosting from "../../assets/cardJobPosting.jpg";

export default function TopAnnoncesCard() {
  const [jobPosting, setJobPosting] = useState();

  const jobsApplication = async () => {
    const res = await axios.get("http://localhost:6001/jobs");
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
        {jobPosting &&
          jobPosting.map((jobs) => (
            <div key={jobs.id} className="">
              <Card sx={{ maxWidth: 335, minWidth: 280, m: 1 }}>
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
                    {jobs.contract_type} <br />
                    {jobs.remote} <br />
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
            </div>
          ))}
      </Stack>
    </Container>
  );
}
