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
import { ValidateFormCandidate } from "../../ValidateForm";

export default function AdminCreateCandidate() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [validateInputCandidate, setValidateInputCandidate] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });

  const notifyCreation = () => toast.success("Nouvel Utilisateur Enregistré!");
  const notifyCreationError = () => toast.error("Problème d'Enregistrement");

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const ValidateFormCreateCandidate = () => {
    const { error } = ValidateFormCandidate.validate(formData, {
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

  const handleSubmitCandidate = (event) => {
    event.preventDefault();
    const validationErrors = ValidateFormCreateCandidate();
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`${BACKEND_URL}/register-candidate`, { ...formData })
        .then(() => {
          notifyCreation();
          setFormData({
            firstname: "",
            lastname: "",
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
      setValidateInputCandidate({ ...validationErrors });
      console.error("Validation Errors:", validationErrors);
    }
  };

  useEffect(() => {
    ValidateFormCreateCandidate();
  }, [handleSubmitCandidate, handleInputChange]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon id="candidate-expand" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Créer un Nouveau Candidat</Typography>
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
            Enregistrer un Nouveau Candidat
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitCandidate}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstname"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
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
                  {validateInputCandidate.firstname}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
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
                  {validateInputCandidate.lastname}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="city"
                  name="city"
                  required
                  fullWidth
                  id="candidate-city"
                  label="City"
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
                  {validateInputCandidate.city}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="candidate-phone"
                  label="Phone Number"
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
                  {validateInputCandidate.phone}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="candidate-email"
                  label="Email Address"
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
                  {validateInputCandidate.email}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="candidate-password"
                  autoComplete="password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
                <Box
                  color="primary.main"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {validateInputCandidate.password}
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
