import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CompanyCard from "../components/Company/CompanyCard";
import CreateOffer from "../components/Company/CreateOffer";
import CompanyApplications from "../components/Company/CompanyApplications";
import CompanyOffers from "../components/Company/CompanyOffers";
import { useCompanyContext } from "../Contexts/CompanyContext";

export default function CompanyProfile() {
  const { company } = useCompanyContext();

  return (
    <Container maxWidth="xxl" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Espace Pro
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "column",
            lg: "row",
            xl: "row",
          },
        }}
      >
        <Grid
          item
          xs={12}
          lg={7}
          elevation={3}
          sx={{
            position: { lg: "fixed" },
          }}
        >
          <CompanyCard company={company} />
        </Grid>
        <Grid container spacing={4} justifyContent="flex-end">
          <Grid item xs={12} lg={7} elevation={3}>
            <CreateOffer />
          </Grid>
          <Grid item xs={12} lg={7} elevation={3}>
            <CompanyOffers />
          </Grid>
          <Grid item xs={12} lg={7} elevation={3}>
            <CompanyApplications />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
