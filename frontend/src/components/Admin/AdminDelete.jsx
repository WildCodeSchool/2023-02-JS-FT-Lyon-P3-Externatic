import React, { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDelete() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notify = () => toast.success("Suppression Effectuée");

  const [candidateId, setCandidateId] = useState("");
  const [companyId, setCompanyId] = useState("");

  const handleCandidateInputChange = (event) => {
    setCandidateId(parseInt(event.target.value, 10));
  };

  const handleCompanyInputChange = (event) => {
    setCompanyId(parseInt(event.target.value, 10));
  };

  const handleDeleteCandidate = (event) => {
    event.preventDefault();

    if (candidateId) {
      axios
        .delete(`${BACKEND_URL}/candidates/${candidateId}`)
        .then(() => {
          setCandidateId("");
          notify();
        })
        .catch(() => notify("problème à la suppression"));
    }
  };

  const handleDeleteCompany = (event) => {
    event.preventDefault();

    if (companyId) {
      axios
        .delete(`${BACKEND_URL}/companies/${candidateId}`)
        .then(() => {
          setCompanyId("");
          notify();
        })
        .catch(() => notify("problème à la suppression"));
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mb: 3 }}>
        <Typography variant="h4" color="initial" sx={{ m: 2 }}>
          Suppression
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Supprimer un Candidat</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleDeleteCandidate}
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <TextField
                  id="delete-candidate"
                  label="Entrer l'ID du Candidat à supprimer"
                  name="id"
                  sx={{ width: "30%" }}
                  value={candidateId}
                  onChange={handleCandidateInputChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ m: 3 }}
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Supprimer
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="Company-content"
            id="Company-header"
          >
            <Typography>Supprimer une Entreprise</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleDeleteCompany}
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <TextField
                  id="delete-company"
                  label="Entrer l'ID de l'Entreprise à supprimer"
                  name="companyId"
                  sx={{ width: "30%" }}
                  value={companyId}
                  onChange={handleCompanyInputChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ m: 3 }}
                  startIcon={<DeleteIcon />}
                >
                  Supprimer
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="deleteCompany-content"
            id="deleteCompany-header"
          >
            <Typography>Supprimer un Admin</Typography>
          </AccordionSummary>
        </Accordion>
      </Container>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
