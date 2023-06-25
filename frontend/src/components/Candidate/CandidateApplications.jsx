import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ApplicationCard from "./ApplicationCard";

export default function CandidateApplications() {
  const [candidateApplications, setCandidateApplications] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BACKEND_URL}/candidate-applications/1`,
    headers: {},
  };

  const getCandidateApplications = () => {
    axios
      .request(config)
      .then((response) => {
        setCandidateApplications(response.data);
        console.warn(candidateApplications);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCandidateApplications();
  }, []);

  return (
    <Box sx={{ borderRadius: "1rem" }}>
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
        Mes Candidatures :
      </Typography>
      {candidateApplications.map((candidateApplication) => (
        <>
          <ApplicationCard
            key={candidateApplication.date}
            candidateApplication={candidateApplication}
          />
          <Divider key={candidateApplication.job_posting_id} />
        </>
      ))}
    </Box>
  );
}
