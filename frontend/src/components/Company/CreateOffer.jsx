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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const isRemote = [
  {
    id: 1,
    type: "Télétravail",
  },
  {
    id: 2,
    type: "Hybride",
  },
  {
    id: 3,
    type: "Presentiel",
  },
];

export default function CreateOffer() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

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
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

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

  const handleChangeDescription = (value) => {
    setDescription(value);
  };

  const handleChangeRequirements = (value) => {
    setRequirements(value);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitJobOffer = (event) => {
    event.preventDefault();
    axios
      .post(
        `${BACKEND_URL}/jobs`,
        { ...formData, description, requirements },
        { withCredentials: true }
      )
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
      maxWidth="xxl"
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmitJobOffer}
              sx={{
                mt: 3,
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
                      label="Cochez pour afficher le nom de l'entreprise sur l'offre"
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
                      label="Cochez pour afficher le site internet sur l'offre"
                    />
                  </FormGroup>
                </Grid>
                <Grid>
                  <TextField
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Titre de l'annonce"
                    autoFocus
                    onChange={handleInputChange}
                    value={formData.title}
                    sx={{ m: 1, width: 250 }}
                  />
                </Grid>
                <Grid>
                  <TextField
                    name="salary"
                    required
                    fullWidth
                    id="salary"
                    label="Salaire du poste"
                    autoFocus
                    onChange={handleInputChange}
                    value={formData.salary}
                    sx={{ m: 1, width: 250 }}
                  />
                </Grid>
                <FormControl sx={{ m: 1, width: 250 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Lieu de travail
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    name="remote"
                    value={formData.remote}
                    label="Lieu du poste"
                    onChange={handleInputChange}
                    MenuProps={MenuProps}
                  >
                    {isRemote.map((job) => (
                      <MenuItem key={job.id} value={job.id}>
                        <ListItemText primary={job.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                    label="Type de poste"
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
                    label="Type de contrat"
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
                    label="Localisation"
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
              <Box>
                <Typography
                  component="h3"
                  variant="body"
                  sx={{ mt: "1rem", mb: "1rem" }}
                >
                  Écrivez votre description du poste.
                </Typography>
                <ReactQuill
                  defaultValue="text"
                  modules={modules}
                  formats={formats}
                  value={description}
                  onChange={handleChangeDescription}
                />
              </Box>
              <Box>
                <Typography
                  component="h3"
                  variant="body"
                  sx={{ mt: "1rem", mb: "1rem" }}
                >
                  Écrivez vos prérequis pour le poste.
                </Typography>
                <ReactQuill
                  defaultValue="text"
                  modules={modules}
                  formats={formats}
                  value={requirements}
                  onChange={handleChangeRequirements}
                />
              </Box>
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
