import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Company Name", width: 120 },
  { field: "contact", headerName: "Contact", width: 120 },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    width: 200,
  },
  { field: "city", headerName: "City", width: 100 },
  { field: "phone", headerName: "Phone", width: 130 },
  { field: "description", headerName: "Description", width: 130 },
];

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "http://localhost:6001/companies",
  headers: {},
};

export default function CompaniesTable() {
  const [companies, setCompanies] = useState([]);

  const getCompanies = () => {
    axios
      .request(config)
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        Liste des Entreprises
      </Typography>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={companies}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </Container>
  );
}
