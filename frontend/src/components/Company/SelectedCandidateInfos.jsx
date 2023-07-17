import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";

export default function SelectedCandidateInfos({ companyApplication }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [candidate, setCandidate] = useState({});

  const selectedCandidateId = parseInt(companyApplication.candidate_id, 10);

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BACKEND_URL}/candidates/${selectedCandidateId}`,
    headers: {},
  };

  const getSelectedCandidateInfos = () => {
    axios
      .request(config)
      .then((response) => {
        setCandidate(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getSelectedCandidateInfos();
  }, [candidate]);

  const imagePath = `${BACKEND_URL}/picture/${candidate.picture}`;
  const cvPath = `${BACKEND_URL}/cv/${candidate.cv}`;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = `${companyApplication.date}`;
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString("fr-FR", options);

  return (
    <Card sx={{ p: 3 }}>
      {!candidate.id ? null : (
        <>
          <Box
            sx={{
              m: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Candidate Picture"
              src={imagePath}
              sx={{ width: 100, height: 100 }}
            />
          </Box>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Candidature de :
          </Typography>
          <CardContent sx={{ mx: 2 }}>
            <Typography gutterBottom variant="h4" component="div">
              {candidate.firstname.charAt(0).toUpperCase() +
                candidate.firstname.slice(1)}{" "}
              {candidate.lastname.charAt(0).toUpperCase() +
                candidate.lastname.slice(1)}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              a postulé le {formattedDate}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {candidate.city}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {candidate.email}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {candidate.phone}
            </Typography>
            {candidate.cv === null ? (
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Le candidat n'a pas chargé son CV
              </Typography>
            ) : (
              <Link href={cvPath} target="_blank" rel="noreferrer">
                Consulter le CV de{" "}
                {candidate.firstname.charAt(0).toUpperCase() +
                  candidate.firstname.slice(1)}{" "}
                {candidate.lastname.charAt(0).toUpperCase() +
                  candidate.lastname.slice(1)}
              </Link>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}

SelectedCandidateInfos.propTypes = {
  companyApplication: PropTypes.shape({
    id: PropTypes.number,
    candidate_id: PropTypes.number,
    date: PropTypes.string,
  }),
};

SelectedCandidateInfos.defaultProps = {
  companyApplication: PropTypes.shape({
    id: 1,
    candidate_id: 13,
  }),
};
