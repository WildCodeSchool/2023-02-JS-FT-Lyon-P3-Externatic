import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ApplicationCard from "./ApplicationCard";

export default function CandidateApplications() {
  const [candidateApplications, setCandidateApplications] = useState([]);

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:6001/candidate-applications/1",
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
    <Box>
      <Typography
        variant="h6"
        color="initial"
        sx={{ p: 2, backgroundColor: "primary.main", color: "white" }}
      >
        Mes Candidatures :
      </Typography>
      <Divider />

      {candidateApplications.map((candidateApplication) => (
        <>
          <ApplicationCard
            key={candidateApplication.id}
            candidateApplication={candidateApplication}
          />
          <Divider key={candidateApplication.company_id} />
        </>
      ))}
    </Box>
  );
}
