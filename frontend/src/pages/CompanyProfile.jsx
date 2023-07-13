import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navbar";
import CompanyCard from "../components/Company/CompanyCard";
import CreateOffer from "../components/Company/CreateOffer";
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
            lg={5}
            elevation={3}
            sx={{
              position: { lg: "fixed" },
            }}
          >
            <CompanyCard company={company} />
          </Grid>
          <Grid container spacing={4} justifyContent="flex-end">
            <Grid item xs={12} lg={9} elevation={3}>
              <CreateOffer />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
