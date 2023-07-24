import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ApplicationCard from "./CompanyApplicationCard";
import CompanyContext from "../../Contexts/CompanyContext";

export default function CompanyApplications() {
  const [companyApplications, setCompanyApplications] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { company } = useContext(CompanyContext);

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BACKEND_URL}/company-applications/${company.id}`,
    headers: {},
  };

  const getCompanyApplications = () => {
    axios
      .request(config)
      .then((response) => {
        setCompanyApplications(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCompanyApplications();
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
        Candidatures sur les offres de {company.name}
      </Typography>
      {companyApplications.map((companyApplication) => (
        <ApplicationCard key={uuidv4} companyApplication={companyApplication} />
      ))}
    </Box>
  );
}

CompanyApplications.propTypes = {
  id: PropTypes.number,
}.isRequired;
