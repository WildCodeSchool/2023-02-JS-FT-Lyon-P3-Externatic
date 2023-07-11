import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "@mui/material/Container";
import CandidateContext from "../../Contexts/CandidateContext";

function UpdateCandidate() {
  const navigate = useNavigate();
  const notifyCreation = () => toast("Votre compte a bien été modifié !");

  const { candidate } = useContext(CandidateContext);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    user_id: `${candidate.user_id}`,
    firstname: `${candidate.firstname}`,
    lastname: `${candidate.lastname}`,
    city: `${candidate.city}`,
    phone: `${candidate.phone}`,
    email: `${candidate.email}`,
  });

  const validateForm = () => {
    // add email Validation
    return true;
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.warn(formData);
    console.warn(candidate.id);
    if (validateForm) {
      axios
        .put(`${BACKEND_URL}/candidates/${candidate.id}`, { ...formData })
        .then(() => {
          notifyCreation();
        })
        .then(() => {
          navigate("/espace-candidat");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ p: 2 }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                autoFocus
                onChange={handleInputChange}
                value={formData.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Nom"
                name="lastname"
                autoComplete="family-name"
                onChange={handleInputChange}
                value={formData.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="city"
                label="Votre Ville"
                name="city"
                autoComplete="city"
                onChange={handleInputChange}
                value={formData.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Votre Numéro de Téléphone"
                name="phone"
                autoComplete="phone"
                onChange={handleInputChange}
                value={formData.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Adresse Mail"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="success"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enregistrer
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UpdateCandidate;
