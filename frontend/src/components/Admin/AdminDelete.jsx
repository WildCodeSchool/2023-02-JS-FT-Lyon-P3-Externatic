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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDelete() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyDeletion = () => toast.success("Suppression Effectuée");
  const notifyErrorDeletion = () =>
    toast.error("Problème lors de la suppression");

  const [lastname, setLastname] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const handleCandidateInputChange = (event) => {
    setLastname(event.target.value);
  };

  const handleCompanyInputChange = (event) => {
    setCompanyId(parseInt(event.target.value, 10));
  };

  const handleDeleteCandidate = (event) => {
    event.preventDefault();

    if (lastname && confirmation) {
      axios
        .delete(`${BACKEND_URL}/candidates?lastname=${lastname}`, {
          withCredentials: true,
        })
        .then(() => {
          setLastname("");
          setConfirmation(false);
          notifyDeletion();
        })
        .catch(() => notifyErrorDeletion());
    }
  };

  const handleDeleteCompany = (event) => {
    event.preventDefault();

    if (companyId && confirmation) {
      axios
        .delete(`${BACKEND_URL}/companies/${companyId}`, {
          withCredentials: true,
        })
        .then(() => {
          setCompanyId("");
          setConfirmation(false);
          notifyDeletion();
        })
        .catch(() => notifyErrorDeletion());
    }
  };

  const toggleConfirmation = () => {
    setConfirmation((prevState) => !prevState);
  };

  return (
    <Container maxWidth="xl" sx={{ pb: "3rem" }}>
      <Typography variant="h4" color="initial" sx={{ py: 4 }}>
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
                label="Entrer le Nom du Candidat à supprimer"
                name="lastname"
                sx={{ width: "30%" }}
                value={lastname}
                onChange={handleCandidateInputChange}
              />
              {confirmation ? (
                <Button
                  variant="outlined"
                  sx={{ m: 3 }}
                  color="error"
                  onClick={toggleConfirmation}
                >
                  Annuler
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{ m: 3 }}
                  color="error"
                  onClick={toggleConfirmation}
                >
                  Effacer
                </Button>
              )}
              {confirmation && (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ m: 3 }}
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Confirmer la Suppression
                </Button>
              )}
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
              {confirmation ? (
                <Button
                  variant="outlined"
                  sx={{ m: 3 }}
                  color="error"
                  onClick={toggleConfirmation}
                >
                  Annuler
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{ m: 3 }}
                  color="error"
                  onClick={toggleConfirmation}
                >
                  Effacer
                </Button>
              )}
              {confirmation && (
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ m: 3 }}
                  startIcon={<DeleteIcon />}
                >
                  Confirmer la Suppression
                </Button>
              )}
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
          <Typography>Supprimer une Annonce</Typography>
        </AccordionSummary>
      </Accordion>
    </Container>
  );
}
