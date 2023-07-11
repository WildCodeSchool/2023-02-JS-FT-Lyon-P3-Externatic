import React, { useEffect } from "react";
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
import Backdrop from "@mui/material/Backdrop";
import TopicIcon from "@mui/icons-material/Topic";
import CVupload from "./CVupload";
import PhotoUpload from "./PhotoUpload";
import UpdateCandidate from "./UpdateCandidate";

export default function CandidateCard({ candidate }) {
  const [openCv, setOpenCV] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openPhoto, setOpenPhoto] = React.useState(false);

  const handleCvClose = () => {
    setOpenCV(false);
  };
  const handleCvClick = () => {
    setOpenCV(true);
  };

  const handlePhotoClose = () => {
    setOpenPhoto(false);
  };
  const handlePhotoOpen = () => {
    setOpenPhoto(true);
  };

  const handleUpdateOpen = () => {
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const imagePath = `${BACKEND_URL}/${candidate.picture}`;

  useEffect(() => {}, [candidate.picture]);

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
            src={imagePath}
            sx={{ width: 150, height: 150 }}
          />
          <Button
            variant="text"
            color="primary"
            sx={{ fontSize: 9, fontWeight: 400, m: 1 }}
            onClick={handlePhotoOpen}
          >
            changer ma photo
          </Button>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 10,
            }}
            open={openPhoto}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhotoUpload />
              <Button
                size="small"
                variant="contained"
                onClick={handlePhotoClose}
                sx={{ m: 2 }}
              >
                Fermer
              </Button>
            </Box>
          </Backdrop>
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
          {candidate.cv === null ? (
            <Button size="small" onClick={handleCvClick}>
              <UploadFileIcon />
              <Typography variant="body2" color="text.secondary">
                Intégrer Votre CV
              </Typography>
            </Button>
          ) : (
            <Button size="small" onClick={handleCvClick}>
              <TopicIcon />
              <Typography variant="body2" color="text.secondary">
                Changer le CV
              </Typography>
            </Button>
          )}
        </CardContent>

        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={openCv}
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
              onClick={handleCvClose}
              sx={{ m: 2 }}
            >
              Fermer
            </Button>
          </Box>
        </Backdrop>

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button size="small" onClick={handleUpdateOpen}>
            <DriveFileRenameOutlineIcon />
            Modifier mes Informations
          </Button>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 10,
            }}
            open={openUpdate}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UpdateCandidate />
              <Button
                size="small"
                variant="contained"
                onClick={handleUpdateClose}
                sx={{ m: 2 }}
              >
                Fermer
              </Button>
            </Box>
          </Backdrop>
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
    picture: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
};
