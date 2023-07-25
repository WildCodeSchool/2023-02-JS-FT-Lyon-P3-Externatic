import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { instance } from "../../../services/api";
import ConfirmationModal from "../ConfirmationModal";

export default function CompaniesList() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const notifyError = () =>
    toast.error("Problème de Récupération des Entreprises..");
  const [companies, setCompanies] = useState([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const getCompanies = () => {
    instance
      .get(`${BACKEND_URL}/companies`)
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleDelete = (companyId) => {
    setSelectedCompanyId(companyId);
    setConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Make an API call to delete the company from the database
    instance
      .delete(`${BACKEND_URL}/companies/${selectedCompanyId}`)
      .then(() => {
        // Remove the deleted company from the local state
        setCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.id !== selectedCompanyId)
        );
        toast.success(`L'Entreprise ${selectedCompanyId} bien été effacée`);
      })
      .catch((error) => {
        notifyError();
        console.error(error.message);
      })
      .finally(() => {
        setConfirmationModalOpen(false);
        setSelectedCompanyId(null);
      });
  };

  const handleCancelDelete = () => {
    setConfirmationModalOpen(false);
    setSelectedCompanyId(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Company Name", width: 120 },
    { field: "contact", headerName: "Contact", width: 150 },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 180,
    },
    { field: "city", headerName: "City", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
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
        id="Companies-list"
        rows={companies}
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
