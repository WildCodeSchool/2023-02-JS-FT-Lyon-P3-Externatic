import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdminCreateCompany from "./Companies/AdminCreateCompany";
import AdminCreateCandidate from "./Candidates/AdminCreateCandidate";

export default function AdminCreate() {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        pb: "3rem",
      }}
    >
      <Typography variant="h5" color="initial" sx={{ py: 4 }}>
        Création
      </Typography>
      <AdminCreateCandidate />
      <AdminCreateCompany />
    </Container>
  );
}
