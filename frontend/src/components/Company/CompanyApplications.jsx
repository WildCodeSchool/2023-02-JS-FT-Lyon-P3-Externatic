import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import ApplicationCard from "./CompanyApplicationCard";
import CompanyContext from "../../Contexts/CompanyContext";

export default function CompanyApplications() {
  const [companyApplications, setCompanyApplications] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () =>
    toast.error("Problème de récupération des applications..");

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
        notifyError();
      });
  };

  useEffect(() => {
    getCompanyApplications();
  }, []);

  return (
    <Box sx={{ borderRadius: "1rem" }}>
      <Paper sx={{ height: "100%" }}>
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
        {companyApplications.length === 0 ? (
          <Typography variant="body1" sx={{ p: 2 }}>
            Aucune candidature disponible.
          </Typography>
        ) : (
          <Box>
            {companyApplications.map((companyApplication) => (
              <ApplicationCard
                key={uuidv4}
                companyApplication={companyApplication}
              />
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

CompanyApplications.propTypes = {
  id: PropTypes.number,
}.isRequired;
