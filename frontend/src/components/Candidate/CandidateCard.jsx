import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CVupload from "./CVupload";

export default function CandidateCard({ candidate }) {
  return (
    <Card sx={{ maxWidth: "100%", mb: { xs: 3, md: 3 } }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Candidate Picture"
            src={candidate.picture}
            sx={{ width: 150, height: 150 }}
          />
          <Typography variant="body1" color="text.secondary" sx={{ m: 1 }}>
            Changer ma photo
          </Typography>
        </Box>
        <CardContent sx={{ m: 1 }}>
          <Typography gutterBottom variant="h4" component="div">
            {candidate.firstname.charAt(0).toUpperCase() +
              candidate.firstname.slice(1)}{" "}
            {candidate.lastname.charAt(0).toUpperCase() +
              candidate.lastname.slice(1)}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {candidate.city}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {candidate.email}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {candidate.phone}
          </Typography>
        </CardContent>
        {candidate.cv === null ? (
          <CVupload />
        ) : (
          <Typography variant="body1">
            <TextSnippetIcon fontSize="large" />
          </Typography>
        )}
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
    cv: PropTypes.string,
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
