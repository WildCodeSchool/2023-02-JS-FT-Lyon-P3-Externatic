import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import AdminCreate from "../components/AdminCreate";
import CandidatesTable from "../components/CandidatesTable";
import CompaniesTable from "../components/CompaniesTable";
import AdminDelete from "../components/AdminDelete";

export default function Admin() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Typography variant="h3" color="initial">
          Page Administrateur
        </Typography>
        <AdminCreate />
        <AdminDelete />
        <CandidatesTable />
        <CompaniesTable />
      </Container>
    </>
  );
}
