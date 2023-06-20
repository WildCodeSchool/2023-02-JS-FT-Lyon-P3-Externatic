import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

export default function SearchBar() {
  const [jobType, setJobType] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setJobTitle(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Album layout
        </Typography>
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            Type de poste
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={jobTitle}
            onChange={handleChanges}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={jobsTitle}
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
            multiple
            value={jobType}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
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
            multiple
            value={jobType}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {jobsType.map((job) => (
              <MenuItem key={job.id} value={job.type}>
                <ListItemText primary={job.type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ mt: 2 }}>
          Rechercher
        </Button>
      </Container>
    </Box>
  );
}
