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
import { useCandidateContext } from "../../Contexts/CandidateContext";

export default function CVupload({ handleCvClose }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyUpload = () => toast.success("Votre CV a bien été enregistré !");
  const notifyUploadError = () => toast.error("Problème à l'enregistrement !");
  const { candidate, loginCandidate } = useCandidateContext();

  const inputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("monCV", inputRef.current.files[0]);

    axios
      .post(`${BACKEND_URL}/monCV`, formData, { withCredentials: true })
      .then((response) => {
        notifyUpload();
        loginCandidate({ ...candidate, cv: response.data.cvPath });
        handleCvClose();
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
        <Typography variant="body1" color="initial" sx={{ p: 1 }}>
          Vous pouvez charger votre CV pour le rendre disponible pour les
          recruteurs.
        </Typography>
        {candidate.cv ? (
          <Typography variant="body1">Votre CV: {candidate.cv}</Typography>
        ) : (
          <Typography variant="body1">
            Aucun CV chargé pour le moment
          </Typography>
        )}
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Input type="file" name="monCV" inputRef={inputRef} sx={{ m: 2 }} />
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

CVupload.propTypes = {
  handleCvClose: PropTypes.func.isRequired,
};
