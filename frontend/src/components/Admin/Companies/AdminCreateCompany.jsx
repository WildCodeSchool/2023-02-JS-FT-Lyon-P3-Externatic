import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ValidateFormCompany } from "../../ValidateForm";

export default function AdminCreateCompany() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [validateInputCompany, setValidateInputCompany] = useState({});
  const [formDataCompany, setFormDataCompany] = useState({
    name: "",
    contact: "",
    description: "",
    website: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });

  const notifyCreation = () => toast.success("Nouvel Utilisateur Enregistré!");
  const notifyCreationError = () => toast.error("Problème d'Enregistrement");

  const handleInputChangeCompany = (event) => {
    setFormDataCompany({
      ...formDataCompany,
      [event.target.name]: event.target.value,
    });
  };

  const ValidateFormCreateCompany = () => {
    const { error } = ValidateFormCompany.validate(formDataCompany, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      const validationErrors = {};
      error.details.forEach((err) => {
        validationErrors[err.context.key] = err.message;
      });
      return validationErrors;
    }
    return {};
  };

  const handleSubmitCompany = (event) => {
    event.preventDefault();
    const validationErrors = ValidateFormCreateCompany();
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`${BACKEND_URL}/register-company`, { ...formDataCompany })
        .then(() => {
          notifyCreation();
          setFormDataCompany({
            name: "",
            contact: "",
            description: "",
            website: "",
            email: "",
            password: "",
            phone: "",
            city: "",
          });
        })
        .catch((error) => {
          console.error(error);
          notifyCreationError();
        });
    } else {
      setValidateInputCompany({ ...validationErrors });
      console.error("Validation Errors:", validationErrors);
    }
  };

  useEffect(() => {
    ValidateFormCreateCompany();
  }, [handleSubmitCompany, handleInputChangeCompany]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Créer une Nouvelle Entreprise</Typography>
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
          <Typography component="h1" variant="h5">
            Enregistrer une Nouvelle Entreprise
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitCompany}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nom entreprise"
                  autoFocus
                  onChange={handleInputChangeCompany}
                  value={formDataCompany.name}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {validateInputCompany.name}
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
                  onChange={handleInputChangeCompany}
                  value={formDataCompany.contact}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {validateInputCompany.contact}
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
                  onChange={handleInputChangeCompany}
                  value={formDataCompany.description}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {validateInputCompany.description}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="website"
                  name="website"
                  required
                  fullWidth
                  id="website"
                  label="Site internet"
                  autoFocus
                  onChange={handleInputChangeCompany}
                  value={formDataCompany.website}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {validateInputCompany.website}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="city"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="Ville"
                  autoFocus
                  onChange={handleInputChangeCompany}
                  value={formDataCompany.city}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {validateInputCompany.city}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Téléphone"
                  name="phone"
                  autoComplete="phone"
                  onChange={handleInputChangeCompany}
                  value={formDataCompany.phone}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {validateInputCompany.phone}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChangeCompany}
                  value={formDataCompany.email}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {validateInputCompany.email}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChangeCompany}
                  value={formDataCompany.password}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {validateInputCompany.password}
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
