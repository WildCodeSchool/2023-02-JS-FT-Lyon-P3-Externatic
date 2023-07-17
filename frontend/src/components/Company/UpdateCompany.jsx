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
import CompanyContext from "../../Contexts/CompanyContext";
import { ValidateFormUpdateCompany } from "../ValidateForm";

function UpdateCompany() {
  const navigate = useNavigate();
  const notifyCreation = () => toast("Votre compte a bien été modifié !");

  const { company } = useContext(CompanyContext);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [validateInput, setValidateInput] = useState({});

  const [formData, setFormData] = useState({
    id: `${company.id}`,
    email: `${company.email}`,
    phone: `${company.phone}`,
    city: `${company.city}`,
    user_id: `${company.user_id}`,
    name: `${company.name}`,
    contact: `${company.contact}`,
    description: `${company.description}`,
    website: `${company.website}`,
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { error } = ValidateFormUpdateCompany.validate(
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
      axios
        .put(
          `${BACKEND_URL}/companies/${company.id}`,
          { ...formData },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          notifyCreation();
        })
        .then(() => {
          navigate("/espace-pro");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // The form is invalid, handle validation errors
      setValidateInput({ ...validationErrors });
      console.error("Validation Errors:", validationErrors);
    }
  };

  React.useEffect(() => {
    validateForm();
  }, [handleSubmit, handleInputChange]);

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ p: 2 }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ ml: 2, mt: 3, mb: 2 }}
        >
          <Grid container spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nom de l'entreprise"
                  autoFocus
                  onChange={handleInputChange}
                  value={formData.name}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {formData.name ? undefined : validateInput.name}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Nom du contact"
                  name="contact"
                  autoComplete="contact-name"
                  onChange={handleInputChange}
                  value={formData.contact}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {formData.contact ? undefined : validateInput.contact}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="description"
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  autoFocus
                  onChange={handleInputChange}
                  value={formData.description}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {formData.description ? undefined : validateInput.description}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="website"
                  name="website"
                  required
                  fullWidth
                  id="website"
                  label="Site Web"
                  autoFocus
                  onChange={handleInputChange}
                  value={formData.website}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {formData.website ? undefined : validateInput.website}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="city"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="Votre Ville"
                  autoFocus
                  onChange={handleInputChange}
                  value={formData.city}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {formData.city ? undefined : validateInput.city}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  label="Addresse e-mail"
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

export default UpdateCompany;
