import React from "react";
import Grid from "@mui/material/Grid";
import CompaniesList from "./CompaniesList";

function AdminCompanies() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CompaniesList />
      </Grid>
    </Grid>
  );
}

export default AdminCompanies;
