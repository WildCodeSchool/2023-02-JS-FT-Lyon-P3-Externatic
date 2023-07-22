import React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function AdminNav() {
  const navigate = useNavigate();
  const handleLinkCandidatesAdmin = () => {
    navigate("admin-candidates");
  };
  const handleLinkCompaniesAdmin = () => {
    navigate("admin-companies");
  };
  const handleLinkJobsAdmin = () => {
    navigate("admin-jobs");
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" color="initial">
        Listes
      </Typography>
      <Stack
        spacing={8}
        direction="row"
        justifyContent="center"
        alignItems="center"
        divider={<Divider light flexItem />}
        sx={{ p: 3 }}
      >
        <Button
          size="large"
          variant="text"
          sx={{
            fontSize: 18,
            width: 250,
            color: "#FDCA40",
            borderColor: "#FDCA40",
            "& .MuiButton:hover": {
              color: "#FDCA40",
            },
          }}
          onClick={handleLinkCandidatesAdmin}
        >
          Candidats
        </Button>
        <Button
          size="large"
          variant="text"
          sx={{
            fontSize: 18,
            width: 250,
            color: "primary.light",
            borderColor: "primary.light",
          }}
          onClick={handleLinkCompaniesAdmin}
        >
          Entreprises
        </Button>
        <Button
          size="large"
          variant="text"
          sx={{
            fontSize: 18,
            width: 250,
            color: "primary",
            borderColor: "primary",
          }}
          onClick={handleLinkJobsAdmin}
        >
          Annonces
        </Button>
      </Stack>
    </Container>
  );
}

export default AdminNav;
