import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ValidateFormCandidate, ValidateFormCompany } from "../ValidateForm";

export default function AdminCreate() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [validateInputCanidate, setValidateInputCandiate] = useState({});
  const [validateInputCompany, setValidateInputCompany] = useState({});
  const [confirmation, setConfirmation] = useState(true);
  const notifyCreation = () => toast.success("Nouvel Utilisateur Enregistré!");
  const notifyCreationError = () => toast.error("Problème d'Enregistrement");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    admin: false,
    terms: false,
  });

  const [formDataCompany, setFormDataCompany] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    admin: false,
    terms: false,
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleInputChangeCompany = (event) => {
    setFormDataCompany({
      ...formDataCompany,
      [event.target.name]: event.target.value,
    });
  };

  const ValidateFormCreateCandidate = () => {
    const { error } = ValidateFormCandidate.validate(
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

  const toggleConfirmation = () => {
    setConfirmation((prevState) => !prevState);
  };

  const handleSubmitCandidate = (event) => {
    event.preventDefault();
    const validationErrors = ValidateFormCreateCandidate();
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`${BACKEND_URL}/register-candidate`, { ...formData })
        .then(() => {
          // setFormDataCompany({
          //   firstname: "",
          //   lastname: "",
          //   email: "",
          //   password: "",
          //   phone: "",
          //   city: "",
          //   admin: false,
          //   terms: false,
          // });
          setConfirmation(true);
          notifyCreation();
        })
        .catch((error) => {
          console.error(error);
          notifyCreationError();
        });
    } else {
      // The form is invalid, handle validation errors
      setValidateInputCandiate({ ...validationErrors });
      console.error("Validation Errors:", validationErrors);
    }
  };

  const ValidateFormCreateCompany = () => {
    const { error } = ValidateFormCompany.validate(
      { ...formDataCompany, terms: undefined },
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

  const handleSubmitCompany = (event) => {
    event.preventDefault();
    const validationErrors = ValidateFormCreateCompany();
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`${BACKEND_URL}/register-company`, { ...formDataCompany })
        .then(() => {
          // setFormData({
          //   name: "",
          //   contact: "",
          //   description: "",
          //   website: "",
          //   email: "",
          //   password: "",
          //   phone: "",
          //   city: "",
          //   admin: false,
          //   terms: false,
          // });
          setConfirmation(true);
          notifyCreation();
        })
        .catch((error) => {
          console.error(error);
          notifyCreationError();
        });
    } else {
      // The form is invalid, handle validation errors
      setValidateInputCompany({ ...validationErrors });
      console.error("Validation Errors:", validationErrors);
    }
  };

  React.useEffect(() => {
    ValidateFormCreateCandidate();
    ValidateFormCreateCompany();
  }, [handleSubmitCandidate, handleSubmitCompany, handleInputChange]);
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        pb: "3rem",
      }}
    >
      <Typography variant="h4" color="initial" sx={{ py: 4 }}>
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.admin === 1}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            admin: event.target.checked ? 1 : 0,
                          })
                        }
                        name="admin"
                      />
                    }
                    label="Admin"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
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
                    {formData.firstname
                      ? undefined
                      : validateInputCanidate.firstname}
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
                    {formData.lastname
                      ? undefined
                      : validateInputCanidate.lastname}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="city"
                    name="city"
                    required
                    fullWidth
                    id="candidate-city"
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
                    {formData.city ? undefined : validateInputCanidate.city}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="candidate-phone"
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
                    {validateInputCanidate.phone}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="candidate-email"
                    label="Adresse e-mail"
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
                    {validateInputCanidate.email}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mot De Passe"
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
                    {validateInputCanidate.password}
                  </Box>
                </Grid>
              </Grid>
              {confirmation ? (
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  color="error"
                  onClick={toggleConfirmation}
                >
                  Annuler
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  color="error"
                  onClick={toggleConfirmation}
                >
                  Enregistré
                </Button>
              )}
              {confirmation && (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ m: 3 }}
                  color="error"
                  startIcon={<AddCircleIcon />}
                >
                  Confirmer la création
                </Button>
              )}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="company-expand" />}
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formDataCompany.admin === 1}
                        onChange={(event) =>
                          setFormDataCompany({
                            ...formDataCompany,
                            admin: event.target.checked ? 1 : 0,
                          })
                        }
                        name="admin"
                      />
                    }
                    label="Admin"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Nom de l'entreprise"
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
                    {formData.name ? undefined : validateInputCompany.name}
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
                    {formDataCompany.contact
                      ? undefined
                      : validateInputCompany.contact}
                  </Box>
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
                    onChange={handleInputChangeCompany}
                    value={formDataCompany.description}
                  />
                  <Box
                    color="primary.main"
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    {formData.description
                      ? undefined
                      : validateInputCompany.description}
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
                    onChange={handleInputChangeCompany}
                    value={formDataCompany.website}
                  />
                  <Box
                    color="primary.main"
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    {formData.website
                      ? undefined
                      : validateInputCompany.website}
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
                    onChange={handleInputChangeCompany}
                    value={formDataCompany.city}
                  />
                  <Box
                    color="primary.main"
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    {formDataCompany.city
                      ? undefined
                      : validateInputCompany.city}
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
                    label="Addresse e-mail"
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
                    label="Mot de Passe"
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
              {confirmation ? (
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  color="error"
                  onClick={toggleConfirmation}
                >
                  Annuler
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  color="error"
                  onClick={toggleConfirmation}
                >
                  Enregistré
                </Button>
              )}
              {confirmation && (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ m: 3 }}
                  color="error"
                  startIcon={<AddCircleIcon />}
                >
                  Confirmer la création
                </Button>
              )}
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
          <Typography>Créer une nouvelle Annonce</Typography>
        </AccordionSummary>
      </Accordion>
    </Container>
  );
}
