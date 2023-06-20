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
          Statut : {candidateApplication.status}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          id entreprise : {candidateApplication.company_id}
        </Typography>
      </CardContent>
    </Card>
  );
}

ApplicationCard.propTypes = {
  candidateApplication: PropTypes.shape({
    company_id: PropTypes.number,
    status: PropTypes.string,
  }),
};

ApplicationCard.defaultProps = {
  candidateApplication: {
    company_id: 2,
    status: "en cours",
  },
};
