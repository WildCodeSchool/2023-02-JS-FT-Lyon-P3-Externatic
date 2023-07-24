import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import Container from "@mui/material/Container";

function UpdateCompany({ company, handleUpdateClose }) {
  const notifyUpdate = () => toast("Votre compte a bien été modifié !");
  const notifyError = () => toast.error("Erreur lors de la modification !");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

  const validateForm = () => {
    // add email Validation
    return true;
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm) {
      axios
        .put(
          `${BACKEND_URL}/companies/${company.id}`,
          { ...formData },
          { withCredentials: true }
        )
        .then(() => {
          notifyUpdate();
          handleUpdateClose();
        })
        .catch((err) => {
          notifyError();
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
                  label="Company Name"
                  autoFocus
                  onChange={handleInputChange}
                  value={formData.name}
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
                  value={formData.contact}
                />
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
                  value={formData.website}
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
                  value={formData.city}
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
                  value={formData.phone}
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
                  value={formData.email}
                />
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

UpdateCompany.propTypes = {
  handleUpdateClose: PropTypes.func.isRequired,
  company: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    contact: PropTypes.string,
    picture: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
};

export default UpdateCompany;
