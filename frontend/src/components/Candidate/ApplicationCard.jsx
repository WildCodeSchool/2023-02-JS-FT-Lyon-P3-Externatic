import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ApplicationCard({ candidateApplication }) {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardContent sx={{ m: 2 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {candidateApplication.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {candidateApplication.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {candidateApplication.contract_type}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Statut : {candidateApplication.status}
        </Typography>
      </CardContent>
    </Card>
  );
}

ApplicationCard.propTypes = {
  candidateApplication: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    contract_type: PropTypes.string,
  }),
};

ApplicationCard.defaultProps = {
  candidateApplication: {
    title: "company name",
    status: "en cours",
  },
};
