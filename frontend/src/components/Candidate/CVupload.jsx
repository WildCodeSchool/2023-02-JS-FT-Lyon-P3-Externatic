import React, { useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CVupload() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notify = () => toast.success("Votre CV a bien été enregistré !");

  const inputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("monCV", inputRef.current.files[0]);

    axios
      .post(`${BACKEND_URL}/monCV`, formData)
      .then((response) => {
        console.warn(JSON.stringify(response.data));
        notify();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 450,
            height: 140,
            borderRadius: "1rem",
            border: "4px solid #CB1F61",
          }}
        >
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <input
              type="file"
              name="monCV"
              ref={inputRef}
              className="custom-file-input"
            />
            <Button type="submit" variant="outlined">
              2-Envoyer
            </Button>
          </form>
        </Paper>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

CVupload.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
