import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function CompanyApplicationCard({ companyApplication }) {
  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
        <CardContent sx={{ m: 2 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {companyApplication.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {companyApplication.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {companyApplication.contract_type}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Statut : {companyApplication.status}
          </Typography>
        </CardContent>
      </Card>
      <Divider />
    </>
  );
}

CompanyApplicationCard.propTypes = {
  companyApplication: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    contract_type: PropTypes.string,
  }),
};

CompanyApplicationCard.defaultProps = {
  companyApplication: {
    title: "company name",
    status: "en cours",
  },
};
