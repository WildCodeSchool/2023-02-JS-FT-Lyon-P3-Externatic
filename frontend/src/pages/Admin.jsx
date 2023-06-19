import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import AdminCreate from "../components/Admin/AdminCreate";
import CandidatesTable from "../components/Admin/CandidatesTable";
import CompaniesTable from "../components/Admin/CompaniesTable";
import AdminDelete from "../components/Admin/AdminDelete";

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
