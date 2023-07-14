import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import NavAdmin from "../components/Admin/NavAdmin";

export default function Admin() {
  return (
    <Container maxWidth="xxl" sx={{ mt: 2, textAlign: "center" }}>
      <Typography variant="h4" color="primary" sx={{ py: 4 }}>
        Page Administrateur
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3.5}>
          <NavAdmin />
        </Grid>
        <Grid item xs={12} md={8.5}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}
