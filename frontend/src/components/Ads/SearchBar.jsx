import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import AdsList from "./AdsList";

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

const jobsTitle = [
  {
    id: 1,
    type: "Développeur Web Front-End",
  },
  {
    id: 2,
    type: "Développeur Web Back-End",
  },
  {
    id: 3,
    type: "Développeur Web Full Stack",
  },
  {
    id: 4,
    type: "Développeur Mobile",
  },
  {
    id: 7,
    type: "Software Engineer",
  },
  {
    id: 8,
    type: "Data Scientist",
  },
];

const jobsType = [
  {
    id: 1,
    type: "CDI",
  },
  {
    id: 2,
    type: "CDD",
  },
  {
    id: 3,
    type: "Freelance",
  },
  {
    id: 4,
    type: "Alternance",
  },
  {
    id: 5,
    type: "Stage",
  },
  {
    id: 6,
    type: "Intérim",
  },
];
const citysAvailable = [
  {
    id: 1,
    type: "Paris",
  },
  {
    id: 2,
    type: "Lyon",
  },
  {
    id: 3,
    type: "Bordeaux",
  },
  {
    id: 4,
    type: "Marseille",
  },
  {
    id: 5,
    type: "Lille",
  },
  {
    id: 6,
    type: "Montpellier",
  },
  {
    id: 7,
    type: "New York",
  },
  {
    id: 8,
    type: "Los Angeles",
  },
];

export default function SearchBar() {
  const [infoDataNoFiltered, setInfoDataNoFiltered] = useState();
  const [infoDataFiltered, setInfoDataFiltered] = useState();
  const [inputFilter, setInputFilter] = useState({
    jobType: "",
    jobTitle: "",
    jobLocation: "",
  });

  const handleChange = (event) => {
    setInputFilter({
      ...inputFilter,
      [event.target.name]: event.target.value,
    });
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleNoFilterData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/jobs`);
      setInfoDataNoFiltered(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleNoFilterData();
  }, []);

  const handleFilterData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/jobs`);
      setInfoDataNoFiltered(res.data);
      setInfoDataFiltered(
        res.data.filter((jobs) => {
          return (
            jobs.location === inputFilter.jobLocation &&
            jobs.title === inputFilter.jobTitle &&
            jobs.contract_type === inputFilter.jobType
          );
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Annonces
          </Typography>
          <Box>
            <FormControl sx={{ m: 1, width: 250 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Type de poste
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                name="jobTitle"
                value={inputFilter.jobTitle}
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                {jobsTitle.map((title) => (
                  <MenuItem key={title.id} value={title.type}>
                    <ListItemText primary={title.type} />
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
                name="jobType"
                value={inputFilter.jobType}
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                {jobsType.map((job) => (
                  <MenuItem key={job.id} value={job.type}>
                    <ListItemText primary={job.type} />
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
                name="jobLocation"
                value={inputFilter.jobLocation}
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                {citysAvailable.map((job) => (
                  <MenuItem key={job.id} value={job.type}>
                    <ListItemText primary={job.type} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button onClick={handleFilterData} variant="contained" sx={{ mt: 2 }}>
            Rechercher
          </Button>
        </Container>
      </Box>
      {infoDataFiltered && <AdsList infoDataFiltered={infoDataFiltered} />}
      {infoDataFiltered ? (
        ""
      ) : (
        <AdsList infoDataNoFiltered={infoDataNoFiltered} />
      )}
    </>
  );
}