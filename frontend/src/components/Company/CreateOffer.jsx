import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateOffer() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const notifyCreation = () => toast.success("Nouvelle offre d'emploi posté!");
  const notifyCreationError = () =>
    toast.error("Problème lors de la publication");
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getUTCDate();
  const newDate = `${year}-${month}-${day}`;
  const [formData, setFormData] = useState({
    company_id: null,
    user_id: null,
    job_category_id: null,
    job_type_id: null,
    job_location_id: null,
    title: "",
    remote: "",
    salary: "",
    description: "",
    requirements: "",
    posting_date: newDate,
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmitJobOffer = (event) => {
    event.preventDefault();
    axios
      .post(`${BACKEND_URL}/jobs`, { ...formData }, { withCredentials: true })
      .then(() => {
        setFormData({
          company_id: null,
          user_id: null,
          job_category_id: null,
          job_type_id: null,
          job_location_id: null,
          title: "",
          remote: "",
          salary: "",
          description: "",
          requirements: "",
          posting_date: newDate,
        });
        notifyCreation();
      })
      .catch((error) => {
        console.error(error);
        notifyCreationError();
      });
  };

  // For the select button
  const [jobTitles, setJobTitles] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobLocations, setJobLocations] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/categories`)
      .then((response) => {
        setJobTitles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${BACKEND_URL}/jobtype`)
      .then((response) => {
        setJobTypes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${BACKEND_URL}/joblocation`)
      .then((response) => {
        setJobLocations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        pb: "3rem",
      }}
    >
      <Typography variant="h4" color="primary" sx={{ py: 4 }}>
        Création d'une nouvelle annonce
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="joboffer-expand" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Créer une nouvelle annonce</Typography>
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
              Créer une nouvelle annonce
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmitJobOffer}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.name}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              name: event.target.checked,
                            })
                          }
                          name="name"
                        />
                      }
                      label="Name"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.website}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              website: event.target.checked,
                            })
                          }
                          name="website"
                        />
                      }
                      label="website"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Titre du poste"
                    autoFocus
                    onChange={handleInputChange}
                    value={formData.title}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="description"
                    required
                    fullWidth
                    id="description"
                    label="description"
                    autoFocus
                    onChange={handleInputChange}
                    value={formData.description}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="requirements"
                    required
                    fullWidth
                    id="requirements"
                    label="Prérequis"
                    autoFocus
                    onChange={handleInputChange}
                    value={formData.requirements}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="salary"
                    required
                    fullWidth
                    id="salary"
                    label="Salaire du poste"
                    autoFocus
                    onChange={handleInputChange}
                    value={formData.salary}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="remote"
                    required
                    fullWidth
                    id="remote"
                    label="Remote"
                    autoFocus
                    onChange={handleInputChange}
                    value={formData.remote}
                  />
                </Grid>
                <FormControl sx={{ m: 1, width: 250 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Type de poste
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    name="job_category_id"
                    value={formData.job_category_id}
                    onChange={handleInputChange}
                    MenuProps={MenuProps}
                  >
                    {jobTitles.map((job) => (
                      <MenuItem key={job.id} value={job.id}>
                        <ListItemText primary={job.category} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 250 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Type de contrat
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    name="job_type_id"
                    value={formData.job_type_id}
                    onChange={handleInputChange}
                    MenuProps={MenuProps}
                  >
                    {jobTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        <ListItemText primary={type.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: 250 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Localisation
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    name="job_location_id"
                    value={formData.job_location_id}
                    onChange={handleInputChange}
                    MenuProps={MenuProps}
                  >
                    {jobLocations.map((location) => (
                      <MenuItem key={location.id} value={location.id}>
                        <ListItemText primary={location.location} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
    </Container>
  );
}
