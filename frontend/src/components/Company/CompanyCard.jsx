import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PhotoUpload from "../Candidate/PhotoUpload";
import UpdateCompany from "./UpdateCompany";

export default function CompanyCard({ company }) {
  const [openPhoto, setOpenPhoto] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

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

  const imagePath = `${BACKEND_URL}/${company.picture}`;

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
            alt="Company Picture"
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
            {company.name.charAt(0).toUpperCase() + company.name.slice(1)}{" "}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            "
            {company.description.charAt(0).toUpperCase() +
              company.description.slice(1)}
            "
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Contact:
            {company.contact.charAt(0).toUpperCase() + company.contact.slice(1)}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {company.city}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {company.email}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {company.phone}
          </Typography>
        </CardContent>

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
              <UpdateCompany />
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

CompanyCard.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    contact: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    city: PropTypes.string,
    picture: PropTypes.string,
  }),
};

CompanyCard.defaultProps = {
  company: {
    name: "Nom de l'Entreprise",
    contact: "nom du contact",
    phone: "0102030405",
    email: "entreprise@mail.com",
    city: "Paris",
    picture: "../../assets/profilePicture.jpg",
  },
};
