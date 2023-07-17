import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import SelectedCandidateInfos from "./SelectedCandidateInfos";

export default function CompanyApplicationCard({ companyApplication }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

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
          <Button variant="text" onClick={handleOpen}>
            plus d'infos sur le Candidat
          </Button>
        </CardContent>
      </Card>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={handleClose}
      >
        <SelectedCandidateInfos companyApplication={companyApplication} />
      </Backdrop>
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
    candidate_id: PropTypes.number,
  }),
};

CompanyApplicationCard.defaultProps = {
  companyApplication: {
    title: "company name",
    status: "en cours",
  },
};
