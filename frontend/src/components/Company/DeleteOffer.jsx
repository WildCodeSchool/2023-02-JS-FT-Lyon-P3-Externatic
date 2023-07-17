import React, { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteOffer() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyDeletion = () => toast.success("Suppression Effectuée");
  const notifyErrorDeletion = () =>
    toast.error("Problème lors de la suppression");

  const [offerId, setOfferId] = useState("");
  const [confirmation, setConfirmation] = useState(false); // Added confirmation state

  const handleOfferInputChange = (event) => {
    setOfferId(parseInt(event.target.value, 10));
  };

  const handleDeleteOffer = (event) => {
    event.preventDefault();

    const deleteButton = (itemName) => {
      console.log(itemName);
      axios.delete("url/itemName").then(() => {
        let newList = itemList.filter((el) => el.itemName !== itemName);

        setItemList(newList);
      });
    };

    if (offerId && confirmation) {
      axios
        .delete(`${BACKEND_URL}/jobs/${offerId}`)
        .then(() => {
          setOfferId("");
          setConfirmation(false);
          notifyDeletion();
          let newList = itemList.filter(
            (el) => company.id === job_posting.company_id
          );
        })
        .catch(() => notifyErrorDeletion());
    }
  };

  const toggleConfirmation = () => {
    setConfirmation((prevState) => !prevState);
  };

  return (
    <Container maxWidth="xl" sx={{ pb: "3rem" }}>
      <Typography variant="h4" color="initial" sx={{ py: 4 }}>
        Suppression
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="Offer-content"
          id="Offer-header"
        >
          <Typography>Supprimer une offre d'emploi</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleDeleteOffer}
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <TextField
                id="delete-offer"
                label="Entrer l'ID de l'offre à supprimer"
                name="offerId"
                sx={{ width: "30%" }}
                value={offerId}
                onChange={handleOfferInputChange}
              />
              {confirmation ? (
                <Button
                  variant="outlined"
                  sx={{ m: 3 }}
                  color="error"
                  onClick={toggleConfirmation}
                >
                  Annuler
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{ m: 3 }}
                  color="error"
                  onClick={toggleConfirmation}
                >
                  Effacer
                </Button>
              )}
              {confirmation && (
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ m: 3 }}
                  startIcon={<DeleteIcon />}
                >
                  Confirmer la Suppression
                </Button>
              )}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="deleteOffer-content"
          id="deleteOffer-header"
        ></AccordionSummary>
      </Accordion>
    </Container>
  );
}
