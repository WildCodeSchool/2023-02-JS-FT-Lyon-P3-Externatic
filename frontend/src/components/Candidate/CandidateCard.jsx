import * as React from "react";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CandidateCard() {
  const [candidate, setCandidate] = useState({});
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BACKEND_URL}/candidates/1`,
    headers: {},
  };

  const getCandidate = () => {
    axios
      .request(config)
      .then((response) => {
        setCandidate(response.data);
        console.warn(candidate);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCandidate();
  }, []);

  const inputRef = useRef();

  const hSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("picture", inputRef.current.files[0]);

    axios.post(`http://${BACKEND_URL}/picture`, formData);
  };

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ m: 2, display: "flex", justifyContent: "center" }}>
          <Avatar
            alt="Candidate Picture"
            src={candidate.picture}
            sx={{ width: 150, height: 150 }}
          />
        </Box>
        <CardContent sx={{ m: 2 }}>
          <Typography gutterBottom variant="h4" component="div">
            {candidate.firstname} {candidate.lastname}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {candidate.phone}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {candidate.email}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {candidate.city}
          </Typography>
          <Box
            component="form"
            encType="multipart/form-data"
            noValidate
            onSubmit={hSubmit}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <FormControl encType="multipart/form-data" sx={{ m: 1 }}>
              <Input type="file" name="monfichier" ref={inputRef} />
              <Button
                type="submit"
                size="small"
                variant="outlined"
                slots="input"
                sx={{ m: 1 }}
              >
                Envoyer
              </Button>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button size="small">Modifier mes Informations</Button>
        </CardActions>
      </Box>
    </Card>
  );
}

CandidateCard.propTypes = {
  candidate: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    city: PropTypes.string,
    picture: PropTypes.string,
  }),
};

CandidateCard.defaultProps = {
  candidate: {
    firstname: "prénom candidat",
    lastname: "nom candidat",
    email: "candidat@mail.com",
    city: "Paris",
    picture: "../../assets/profilePicture.jpg",
  },
};
