import React from "react";
import Grid from "@mui/material/Grid";
import JobsList from "./JobsList";

function AdminJobs() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <JobsList />
      </Grid>
    </Grid>
  );
}

export default AdminJobs;
