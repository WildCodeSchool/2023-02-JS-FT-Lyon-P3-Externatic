import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";
import CardMedia from "@mui/material/CardMedia";
import background from "../../assets/background.png";

export default function JobByTypeCard({ jobTypes }) {
  return (
    <Card
      sx={{
        minWidth: 500,
        maxWidth: 700,
        // width: 600,
        height: 300,
        margin: 3,
        padding: 0,
        backgroundColor: "#851442",
        position: "relative",
      }}
    >
      <CardMedia
        sx={{
          height: 300,
          minWidth: 500,
          maxWidth: 700,
          // width: 600,
          cursor: "pointer",
        }}
        image={background}
        align="center"
      >
        <Box
          sx={{
            fontSize: 34,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "20px",
            alignItems: "center",
            height: "100%",
            // fontSize: 24,
            minWidth: 500,
            maxWidth: 700,
            // width: 600,
            // alignItems: "center",
          }}
          color="white"
        >
          {jobTypes}
          <Typography
            sx={{
              fontSize: 24,
              minWidth: 500,
              maxWidth: 700,
              // width: 600,
              alignItems: "center",
            }}
            color="white"
            gutterBottom
          >
            00 Jobs
          </Typography>
        </Box>
      </CardMedia>
      {/* </CardContent> */}
    </Card>
  );
}

JobByTypeCard.propTypes = {
  jobTypes: PropTypes.string.isRequired,
};
