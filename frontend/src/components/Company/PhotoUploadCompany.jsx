import React, { useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import { useCompanyContext } from "../../Contexts/CompanyContext";

export default function PhotoUploadCompany({ handlePhotoClose }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyUpload = () =>
    toast.success("Votre Photo a bien été enregistrée !");
  const notifyUploadError = () => toast.error("Problème à l'enregistrement !");
  const notifyFileSizeError = () =>
    toast.error("Le fichier est trop volumineux !");
  const notifyFileTypeError = () =>
    toast.error("Le fichier doit être conforme aux formats acceptés!");
  const handleNullFileError = () =>
    toast.error("Vous devez sélectionner un fichier");

  const { company, loginCompany } = useCompanyContext();

  const inputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const file = inputRef.current.files[0];

    // Check if the file is an accepted type
    if (file) {
      if (
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/gif"
      ) {
        notifyFileTypeError();
        return;
      }
    } else {
      // Handle the case when the file object is null or undefined
      handleNullFileError();
      return;
    }

    // Check file size (5MB limit)
    if (file && file.size > 5 * 1024 * 1024) {
      notifyFileSizeError();
      return;
    }

    const formData = new FormData();
    formData.append("maPhoto", file);

    axios
      .post(`${BACKEND_URL}/maPhoto`, formData, { withCredentials: true })
      .then((response) => {
        notifyUpload();
        loginCompany({ ...company, picture: response.data.photoPath });
        handlePhotoClose();
      })
      .catch((error) => {
        console.error(error);
        notifyUploadError();
      });
  };

  const uploadedImageName = company.picture ? company.picture.slice(37) : null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: { xs: "100%", md: 600 },
          height: { xs: 300, md: 300 },
          borderRadius: "1rem",
          border: "4px solid #CB1F61",
        }}
      >
        <Typography variant="body1" color="initial">
          Choisissez un fichier pour votre photo de profil
        </Typography>
        {company.picture ? (
          <Typography variant="body1">
            Votre Photo actuelle: {uploadedImageName}
          </Typography>
        ) : (
          <Typography variant="body1">
            Aucun Photo de Profil pour le moment
          </Typography>
        )}
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Input type="file" name="monCV" inputRef={inputRef} sx={{ mr: 2 }} />
          <Button type="submit" variant="outlined">
            Envoyer
          </Button>
        </form>
        <Typography variant="body2" color="grey">
          Le fichier doit être inférieur à 5Mo
        </Typography>
      </Paper>
    </Box>
  );
}

PhotoUploadCompany.propTypes = {
  handlePhotoClose: PropTypes.func.isRequired,
};
