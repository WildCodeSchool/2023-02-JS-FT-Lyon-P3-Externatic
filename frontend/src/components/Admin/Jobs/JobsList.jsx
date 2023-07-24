import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { instance } from "../../../services/api";
import ConfirmationModal from "../ConfirmationModal";

export default function JobsList() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () =>
    toast.error("Problème de Récupération des Utilisateurs..");
  const [jobsList, setjobsList] = useState([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedadId, setSelectedadId] = useState(null);

  const getjobsList = () => {
    instance
      .get(`${BACKEND_URL}/jobs`)
      .then((response) => {
        setjobsList(response.data);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      });
  };

  useEffect(() => {
    getjobsList();
  }, []);

  const handleDelete = (adId) => {
    setSelectedadId(adId);
    setConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    instance
      .delete(`${BACKEND_URL}/jobs/${selectedadId}`)
      .then(() => {
        setjobsList((prevjobsList) =>
          prevjobsList.filter((ad) => ad.id !== selectedadId)
        );
        toast.success(`l'annonce ${selectedadId} a bien été effacée`);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      })
      .finally(() => {
        setConfirmationModalOpen(false);
        setSelectedadId(null);
      });
  };

  const handleCancelDelete = () => {
    setConfirmationModalOpen(false);
    setSelectedadId(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Entreprise",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 200,
    },
    { field: "city", headerName: "Ville", width: 130 },
    { field: "contact", headerName: "Contact", width: 130 },
    { field: "phone", headerName: "Tel", width: 130 },
    { field: "title", headerName: "Titre", width: 120 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "salary", headerName: "Salaire", width: 100 },
    { field: "remote", headerName: "Remote", width: 100 },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        id="jobsList-list"
        rows={jobsList}
        columns={columns}
        pageSize={10}
        pagination
        autoHeight
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
      <ConfirmationModal
        open={confirmationModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
