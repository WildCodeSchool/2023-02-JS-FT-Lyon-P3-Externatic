import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

export default function AdsList() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/jobs`)
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (albums.length === 0) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Grid container spacing={4}>
        {albums.map((album) => (
          <Grid item key={album.id} xs={12} sm={6} md={4}>
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
                  {album.name}
                </Typography>
                <Typography>{album.description}</Typography>
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
  );
}
