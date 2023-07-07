import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function CompanyCard({ company }) {
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
            src={company.picture}
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
            {company.name.charAt(0).toUpperCase() + company.name.slice(1)}{" "}
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {company.contact.charAt(0).toUpperCase() + company.contact.slice(1)}{" "}
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
          <Button size="small">
            <DriveFileRenameOutlineIcon />
            Modifier mes Informations
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

CompanyCard.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
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
