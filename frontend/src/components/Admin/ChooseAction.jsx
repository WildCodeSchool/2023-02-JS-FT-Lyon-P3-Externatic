import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ChooseAction() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" color="secondary" sx={{ pt: 5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          Choisissez l'action à réaliser{" "}
        </Box>
      </Typography>
    </Container>
  );
}
