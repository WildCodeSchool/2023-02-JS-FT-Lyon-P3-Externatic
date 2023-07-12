import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import CompanyCard from "../components/Company/CompanyCard";
import { useCompanyContext } from "../Contexts/CompanyContext";

export default function CompanyProfile() {
  const { company } = useCompanyContext();
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h3" color="initial" gutterBottom>
          Espace Pro
        </Typography>
        <CompanyCard company={company} />
      </Container>
    </>
  );
}
