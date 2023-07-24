import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import ApplicationCard from "./ApplicationCard";
import CandidateContext from "../../Contexts/CandidateContext";

export default function CandidateApplications() {
  const [candidateApplications, setCandidateApplications] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () =>
    toast.error("Problème de récupération des applications..");

  const { candidate } = useContext(CandidateContext);

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BACKEND_URL}/candidate-applications/${candidate.id}`,
    headers: {},
  };

  const getCandidateApplications = async () => {
    try {
      const response = await axios.request(config);
      setCandidateApplications(response.data);
    } catch (error) {
      console.error(error);
      notifyError();
    }
  };

  useEffect(() => {
    getCandidateApplications();
  }, [candidateApplications]);

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
          key={candidateApplication.id}
          candidateApplication={candidateApplication}
        />
      ))}
    </Box>
  );
}

CandidateApplications.propTypes = {
  id: PropTypes.number,
}.isRequired;
