import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstname", headerName: "First name", width: 120 },
  { field: "lastname", headerName: "Last name", width: 120 },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    width: 200,
  },
  { field: "city", headerName: "City", width: 100 },
  { field: "phone", headerName: "Phone", width: 130 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstname || ""} ${params.row.lastname || ""}`,
  },
];

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: `${BACKEND_URL}/candidates`,
  headers: {},
};

export default function CandidatesTable() {
  const [candidates, setCandidates] = useState([]);

  const getCandidates = () => {
    axios
      .request(config)
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ py: 4 }}>
        Liste des Candidats
      </Typography>
      <DataGrid
        id="candidates-list"
        rows={candidates}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
    </Container>
  );
}
