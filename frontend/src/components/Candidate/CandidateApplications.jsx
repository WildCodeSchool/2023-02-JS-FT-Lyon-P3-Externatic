import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ApplicationCard from "./ApplicationCard";
import CandidateContext from "../../Contexts/CandidateContext";

export default function CandidateApplications() {
  const [candidateApplications, setCandidateApplications] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { candidate } = useContext(CandidateContext);

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BACKEND_URL}/candidate-applications/${candidate.id}`,
    headers: {},
  };

  const getCandidateApplications = () => {
    axios
      .request(config)
      .then((response) => {
        setCandidateApplications(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.warn(candidateApplications);

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
        <ApplicationCard
          key={candidateApplication.title}
          candidateApplication={candidateApplication}
        />
      ))}
    </Box>
  );
}

CandidateApplications.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
