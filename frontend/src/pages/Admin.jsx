import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdminCreate from "../components/AdminCreate";
import CandidatesTable from "../components/CandidatesTable";
import CompaniesTable from "../components/CompaniesTable";

export default function Admin() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" color="initial">
        Admin Page
      </Typography>
      <AdminCreate />
      <CandidatesTable />
      <CompaniesTable />
    </Container>
  );
}
