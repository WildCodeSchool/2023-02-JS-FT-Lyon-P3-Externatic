import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { instance } from "../../services/api";
import { ValidateFormUpdateCandidate } from "../ValidateForm";

function UpdateCandidate({ candidate, handleUpdateClose }) {
  const notifyCreation = () => toast("Votre compte a bien été modifié !");
  const notifyError = () => toast("Erreur lors de la Modification !");

  const [validateInput, setValidateInput] = useState({});

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    user_id: `${candidate.user_id}`,
    firstname: `${candidate.firstname}`,
    lastname: `${candidate.lastname}`,
    city: `${candidate.city}`,
    phone: `${candidate.phone}`,
    email: `${candidate.email}`,
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { error } = ValidateFormUpdateCandidate.validate(
      { ...formData, terms: undefined },
      {
        abortEarly: false,
        allowUnknown: true,
      }
    );
    if (error) {
      const validationErrors = {};
      error.details.forEach((err) => {
        validationErrors[err.context.key] = err.message;
      });
      return validationErrors;
    }
    return {};
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      instance
        .put(
          `${BACKEND_URL}/candidates/${candidate.id}`,
          { ...formData },
          { withCredentials: true }
        )
        .then(() => {
          notifyCreation();
          handleUpdateClose();
        })
        .catch((err) => {
          notifyError();
          console.error(err);
        });
    } else {
      // The form is invalid, handle validation errors
      setValidateInput({ ...validationErrors });
      console.error("Validation Errors:", validationErrors);
    }
  };

  useEffect(() => {
    validateForm();
  }, [handleSubmit, handleInputChange]);

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ p: 2, zIndex: 2000 }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            mb: 2,
          }}
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
              <Box
                color="primary.main"
                sx={{
                  textAlign: "left",
                }}
              >
                {formData.firstname.length > 2
                  ? undefined
                  : validateInput.firstname}
              </Box>
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
              <Box
                color="primary.main"
                sx={{
                  textAlign: "left",
                }}
              >
                {formData.lastname.length > 2
                  ? undefined
                  : validateInput.lastname}
              </Box>
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
              <Box
                color="primary.main"
                sx={{
                  textAlign: "left",
                }}
              >
                {formData.city.length > 2 ? undefined : validateInput.city}
              </Box>
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
              <Box
                color="primary.main"
                sx={{
                  textAlign: "left",
                }}
              >
                {validateInput.phone}
              </Box>
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
              <Box
                color="primary.main"
                sx={{
                  textAlign: "left",
                }}
              >
                {validateInput.email}
              </Box>
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

UpdateCandidate.propTypes = {
  handleUpdateClose: PropTypes.func.isRequired,
  candidate: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    cv: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    profile_picture: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default UpdateCandidate;
