import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Backdrop from "@mui/material/Backdrop";
import CVupload from "./CVupload";

export default function CandidateCard({ candidate }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCvClick = () => {
    setOpen(true);
  };

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
          <Button
            variant="text"
            color="primary"
            sx={{ fontSize: 9, fontWeight: 400, m: 1 }}
          >
            changer ma photo
          </Button>
        </Box>
        <CardContent sx={{ mx: 2 }}>
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
        <Button size="small" onClick={handleCvClick}>
          <UploadFileIcon />
          Intégrer mon CV
        </Button>

        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CVupload />
            <Button
              size="small"
              variant="contained"
              onClick={handleClose}
              sx={{ m: 2 }}
            >
              Fermer
            </Button>
          </Box>
        </Backdrop>

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button size="small">
            <DriveFileRenameOutlineIcon />
            Modifier mes Informations
          </Button>
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
