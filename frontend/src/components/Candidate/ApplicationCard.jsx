import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApplicationCard({ candidateApplication }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyDeletion = () =>
    toast.success(
      `Suppression de votre candidature chez ${candidateApplication.name} Effectuée.`
    );
  const notifyErrorDeletion = () =>
    toast.error("Problème lors de la suppression");

  const [confirmation, setConfirmation] = useState(false);
  const toggleConfirmation = () => {
    setConfirmation((prevState) => !prevState);
  };

  const handleDeleteApplication = (event) => {
    event.preventDefault();

    if (candidateApplication.candidate_id && confirmation) {
      axios
        .delete(
          `${BACKEND_URL}/applications/${candidateApplication.candidate_id}`,
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setConfirmation(false);
          notifyDeletion();
        })
        .catch(() => notifyErrorDeletion());
    }
  };

  useEffect(() => {}, [candidateApplication]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = `${candidateApplication.date}`;
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString("fr-FR", options);

  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
        <CardContent sx={{ m: 2 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Titre de l'annonce : {candidateApplication.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Nome de l'Entreprise : {candidateApplication.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Candidature du : {formattedDate}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Statut : {candidateApplication.status}
          </Typography>
        </CardContent>
        <Button
          variant="outlined"
          color="error"
          onClick={toggleConfirmation}
          sx={{ mb: 3 }}
        >
          Supprimer ma Candidature
        </Button>
        {confirmation ? (
          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={toggleConfirmation}
            >
              Annuler
            </Button>
            <Button
              onClick={handleDeleteApplication}
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              sx={{ mb: 3 }}
            >
              Confirmer la Suppression
            </Button>
          </Stack>
        ) : null}
      </Card>
      <Divider />
    </>
  );
}

ApplicationCard.propTypes = {
  candidateApplication: PropTypes.shape({
    candidate_id: PropTypes.number,
    title: PropTypes.string,
    date: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    contract_type: PropTypes.string,
  }),
};

ApplicationCard.defaultProps = {
  candidateApplication: {
    title: "company name",
    status: "en cours",
  },
};
