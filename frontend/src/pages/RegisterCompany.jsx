import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { LockOutlinedIcon } from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/externatic-logo.png";
import accueil from "../assets/accueil.jpg";
import { ValidateFormCompany } from "../components/ValidateForm";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Externatic / Team PAF
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const notifyCreation = () => toast.success("Votre compte a bien été créé !");
  const notifyError = () =>
    toast.error("Problème d'enregistrement du compte..");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [validateInput, setValidateInput] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    description: "",
    website: "",
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

  const validateForm = () => {
    const { error } = ValidateFormCompany.validate(
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
      // The form is valid, proceed with form submission
      axios
        .post(`${BACKEND_URL}/register-company`, { ...formData })
        .then(() => {
          notifyCreation();
        })
        .then(() => {
          navigate("/login-company");
        })
        .catch((err) => {
          console.error(err);
          notifyError();
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
  const handleLinkLogin = () => {
    navigate("/login-company");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: `url(${accueil})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 6,
            mx: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <img src={logo} alt="logo" width="200px" />
          </Box>
          <Avatar
            src={LockOutlinedIcon}
            sx={{ m: 1, bgcolor: "secondary.main" }}
          />
          <Typography component="h1" variant="h5">
            Créer mon Profil Pro
          </Typography>
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
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nom de l'entreprise"
                  autoFocus
                  onChange={handleInputChange}
                  value={formData.name}
                />
                <Box color="primary.main">
                  {formData.name.length > 2 ? undefined : validateInput.name}
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
                <Box color="primary.main">
                  {formData.contact.length > 2
                    ? undefined
                    : validateInput.contact}
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
                  onChange={handleInputChange}
                  value={formData.description}
                />
                <Box color="primary.main">
                  {formData.description.length > 9
                    ? undefined
                    : validateInput.description}
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
                <Box color="primary.main">
                  {formData.website.length > 5
                    ? undefined
                    : validateInput.website}
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
                <Box color="primary.main">
                  {formData.city.length > 2 ? undefined : validateInput.city}
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
                <Box color="primary.main">{validateInput.phone}</Box>
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
                <Box color="primary.main">{validateInput.email}</Box>
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
                  onChange={handleInputChange}
                  value={formData.password}
                />
                <Box color="primary.main">
                  {formData.password.length > 5
                    ? undefined
                    : validateInput.password}
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={handleLinkLogin} variant="text">
                  Vous avez déja un compte? Accéder au Login
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
