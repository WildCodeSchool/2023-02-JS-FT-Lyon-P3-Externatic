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
import { api } from "../services/api";
import "animate.css";

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

export default function SearchBar() {
  //
  const [filtersActive, setFiltersActive] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    jobsTitle: [],
    jobsType: [],
    citiesAvailable: [],
  });

  // Setting up the filters
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const resCitiesAvailables = await api.citiesAvailables();
        const resContractsAvailables = await api.contractsAvailables();
        const resJobsAvailables = await api.jobsAvailables();

        setFilterOptions({
          citiesAvailable: resCitiesAvailables,
          jobsType: resContractsAvailables,
          jobsTitle: resJobsAvailables,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);

  // Input fields data
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
      const filteredData = res.data.filter((job) => {
        const titleMatch =
          !inputFilter.jobTitle || job.category === inputFilter.jobTitle;
        const typeMatch =
          !inputFilter.jobType || job.type === inputFilter.jobType;
        const locationMatch =
          !inputFilter.jobLocation || job.location === inputFilter.jobLocation;
        return titleMatch && typeMatch && locationMatch;
      });
      setInfoDataFiltered(filteredData);
      setInfoDataNoFiltered(res.data);
      setFiltersActive(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearFilters = () => {
    setInputFilter({
      jobType: "",
      jobTitle: "",
      jobLocation: "",
    });
    setFiltersActive(false); // Set filters as inactive
  };

  return (
    <>
      <Box
        className="animate__animated animate__fadeInDown"
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
          <Box
            sx={{
              textAlign: "center",
            }}
          >
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
                label="Type de poste"
                MenuProps={MenuProps}
              >
                {filterOptions.jobsTitle.map((title) => (
                  <MenuItem key={title.id} value={title.category}>
                    <ListItemText primary={title.category} />
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
                label="Type de contrat"
                MenuProps={MenuProps}
              >
                {filterOptions.jobsType.map((job) => (
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
                label="Localisation"
                MenuProps={MenuProps}
              >
                {filterOptions.citiesAvailable.map((city) => (
                  <MenuItem key={city.id} value={city.location}>
                    <ListItemText primary={city.location} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button
              onClick={handleFilterData}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Rechercher
            </Button>
            <Button
              onClick={handleClearFilters}
              variant="outlined"
              sx={{ mt: 2, ml: 2 }}
            >
              Effacer les filtres
            </Button>
          </Box>
        </Container>
      </Box>
      {filtersActive ? (
        <AdsList infoDataFiltered={infoDataFiltered} />
      ) : (
        <AdsList infoDataNoFiltered={infoDataNoFiltered} />
      )}
    </>
  );
}
