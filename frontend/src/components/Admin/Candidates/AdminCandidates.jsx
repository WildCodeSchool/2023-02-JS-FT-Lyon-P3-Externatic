import React from "react";
import Grid from "@mui/material/Grid";
import CandidatesList from "./CandidatesList";

function AdminCandidates() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CandidatesList />
      </Grid>
    </Grid>
  );
}

export default AdminCandidates;
