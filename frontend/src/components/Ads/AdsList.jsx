import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PropTypes } from "prop-types";

export default function AdsList({ infoData, infoDataNoFiltered }) {
  return (
    <>
      {infoDataNoFiltered && (
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Grid container spacing={4}>
            {infoDataNoFiltered.map((jobOffer) => (
              <Grid item key={jobOffer.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {jobOffer.name}
                    </Typography>
                    <Typography>{jobOffer.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {infoData && (
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Grid container spacing={4}>
            {infoData.map((jobOffer) => (
              <Grid item key={jobOffer.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {jobOffer.name}
                    </Typography>
                    <Typography>{jobOffer.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
    // console.log(infoData)
  );
}

AdsList.defaultProps = {
  infoData: [],
};

AdsList.propTypes = {
  infoData: PropTypes.arrayOf(
    PropTypes.shape({
      archived: PropTypes.number,
      company_id: PropTypes.number,
      contact: PropTypes.string,
      contract_type: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number,
      location: PropTypes.string,
      name: PropTypes.string,
      posting_date: PropTypes.string,
      remote: PropTypes.string,
      requirements: PropTypes.string,
      salary: PropTypes.string,
      title: PropTypes.string,
      website: PropTypes.string,
    })
  ),
};
AdsList.defaultProps = {
  infoDataNoFiltered: [],
};

AdsList.propTypes = {
  infoDataNoFiltered: PropTypes.arrayOf(
    PropTypes.shape({
      archived: PropTypes.number.isRequired,
      company_id: PropTypes.number.isRequired,
      contact: PropTypes.string.isRequired,
      contract_type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      location: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      posting_date: PropTypes.string.isRequired,
      remote: PropTypes.string.isRequired,
      requirements: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    })
  ),
};
