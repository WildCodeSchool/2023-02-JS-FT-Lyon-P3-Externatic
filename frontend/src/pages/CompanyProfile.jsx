import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CompanyCard from "../components/Company/CompanyCard";
import { useCompanyContext } from "../Contexts/CompanyContext";

export default function CompanyProfile() {
  const { company } = useCompanyContext();
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" color="initial">
        Espace Recruteur
      </Typography>
      <CompanyCard company={company} />
    </Container>
  );
}
