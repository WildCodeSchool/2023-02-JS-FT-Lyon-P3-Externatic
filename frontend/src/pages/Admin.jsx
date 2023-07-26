import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AdminNav from "../components/Admin/NavAdmin";
import AdminCreate from "../components/Admin/AdminCreate";

function Admin() {
  return (
    <Container maxWidth="xl" sx={{ mt: 2, textAlign: "center" }}>
      <Typography variant="h4" color="text.main" sx={{ py: 2 }}>
        Page Administrateur
      </Typography>
      <AdminCreate />
      <Box fullwidth>
        <AdminNav />
      </Box>
      <Outlet />
    </Container>
  );
}

export default Admin;
