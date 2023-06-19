import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
  url: "http://localhost:6001/candidates",
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
      <Typography variant="h5" gutterBottom>
        Liste des Candidats
      </Typography>
      <DataGrid
        rows={candidates}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Container>
  );
}
