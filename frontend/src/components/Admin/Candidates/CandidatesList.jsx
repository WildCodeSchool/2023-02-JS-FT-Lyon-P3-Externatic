import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { instance } from "../../../services/api";
import ConfirmationModal from "../ConfirmationModal";

export default function CandidatesList() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () =>
    toast.error("Problème de Récupération des Candidats..");
  const [candidates, setCandidates] = useState([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  const getCandidates = () => {
    instance
      .get(`${BACKEND_URL}/candidates`)
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      });
  };

  useEffect(() => {
    getCandidates();
  }, []);

  const handleDelete = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Make an API call to delete the Candidate from the database
    instance
      .delete(`${BACKEND_URL}/candidates/${selectedCandidateId}`)
      .then(() => {
        // Remove the deleted Candidate from the local state
        setCandidates((prevCandidates) =>
          prevCandidates.filter(
            (candidate) => candidate.id !== selectedCandidateId
          )
        );
        toast.success("Le Candidat a bien été effacé");
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      })
      .finally(() => {
        setConfirmationModalOpen(false);
        setSelectedCandidateId(null);
      });
  };

  const handleCancelDelete = () => {
    setConfirmationModalOpen(false);
    setSelectedCandidateId(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstname", headerName: "First name", width: 120 },
    { field: "lastname", headerName: "Last name", width: 150 },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 180,
    },
    { field: "city", headerName: "City", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstname || ""} ${params.row.lastname || ""}`,
    },
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
        id="Candidates-list"
        rows={candidates}
        columns={columns}
        pageSize={10}
        pagination
        autoHeight
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "#FDCA40",
          "& .MuiDataGrid-cell:hover": {
            color: "#FDCA40",
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
