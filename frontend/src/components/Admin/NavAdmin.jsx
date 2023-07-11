import React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

function NavAdmin() {
  const navigate = useNavigate();
  const handleLinkCreate = () => {
    navigate("admin-create");
  };
  const handleLinkDelete = () => {
    navigate("admin-delete");
  };
  const handleLinkCandidates = () => {
    navigate("candidates-list");
  };
  const handleLinkCompanies = () => {
    navigate("companies-list");
  };

  return (
    <Stack
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      divider={<Divider light flexItem />}
      sx={{ p: 4 }}
    >
      <Button size="large" variant="text" onClick={handleLinkCreate}>
        <AddIcon sx={{ mr: 1 }} />
        Création
      </Button>
      <Button size="large" variant="text" onClick={handleLinkDelete}>
        <RemoveIcon sx={{ mr: 1 }} />
        Suppression
      </Button>
      <Button size="large" variant="text" onClick={handleLinkCandidates}>
        Liste des Candidats
      </Button>
      <Button size="large" variant="text" onClick={handleLinkCompanies}>
        Liste des Entreprises
      </Button>
    </Stack>
  );
}

export default NavAdmin;
