import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminCreate() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyCreation = () => toast.success("Nouvel Utilisateur Enregistré!");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    terms: false,
  });

  const validateForm = () => {
    // add email Validation
    return true;
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmitCandidate = (event) => {
    event.preventDefault();

    if (validateForm()) {
      axios
        .post(`${BACKEND_URL}/candidates`, { ...formData })
        .then(() => {
          // Clear the form data after successful submission
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            phone: "",
            city: "",
            terms: false,
          });
          notifyCreation();
        })
        .catch(() => console.warn("registration problem"));
    }
  };

  const handleSubmitCompany = (event) => {
    event.preventDefault();

    if (validateForm()) {
      axios
        .post(`${BACKEND_URL}/companies`, { ...formData })
        .then(() => {
          // Clear the form data after successful submission
          setFormData({
            name: "",
            contact: "",
            description: "",
            website: "",
            email: "",
            password: "",
            phone: "",
            city: "",
            admin: 0,
            terms: false,
          });
          notifyCreation();
          document.getElementById("candidate-expand").click();
        })
        .catch(() => console.warn("registration problem"));
    }
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          pt: "6rem",
          pb: "3rem",
        }}
      >
        <Typography variant="h4" color="initial">
          Création
        </Typography>
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
                    />
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
                    />
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
                    />
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
                    />
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
                    />
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
                    />
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
                      label="Company Name"
                      autoFocus
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="contact"
                      label="Contact Name"
                      name="contact"
                      autoComplete="contact-name"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="description"
                      name="description"
                      required
                      fullWidth
                      id="description"
                      label="description"
                      autoFocus
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="website"
                      name="website"
                      required
                      fullWidth
                      id="website"
                      label="website"
                      autoFocus
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="city"
                      name="city"
                      required
                      fullWidth
                      id="city"
                      label="City"
                      autoFocus
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="phone"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={handleInputChange}
                    />
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
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Créer un nouvel Admin</Typography>
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
