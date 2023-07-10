import React, { useRef } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";

export default function PhotoUpload() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyUpload = () =>
    toast.success("Votre Photo a bien été enregistrée !");
  const notifyUploadError = () => toast.error("Problème à l'enregistrement !");

  const inputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("maPhoto", inputRef.current.files[0]);

    axios
      .post(`${BACKEND_URL}/maPhoto`, formData, { withCredentials: true })
      .then((response) => {
        console.warn(JSON.stringify(response.data));
        notifyUpload();
      })
      .catch((error) => {
        console.error(error);
        notifyUploadError();
      });
  };

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