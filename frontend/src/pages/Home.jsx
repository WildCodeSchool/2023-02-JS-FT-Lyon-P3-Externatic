import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TopAnnoncesCard from "../components/Home/TopAnnoncesCard";
import JobByTypeCard from "../components/Home/JobByTypeCard";
import backgroundImage from "../assets/tim-mossholder-GOMhuCj-O9w-unsplash-1024x683.jpg";
import externaticLogo from "../assets/EXTERNATIC-LOGO-VERTICAL-RVB-removebg-preview.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const jobTypes = {
    devBack: "Développeur Back-end",
    devFront: "Dévelopeur Front-End",
    devWeb: "Développeur Web",
    devData: "Data Scientist",
    prodcuctOwner: "Product Owner",
    chefProject: "Chef de projet IT",
    devOps: "DevOps",
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardMedia
                sx={{
                  m: 3,
                  height: 250,
                  width: 370,
                }}
                image={externaticLogo}
                title="externatic logo"
                align="center"
              />
            </Box>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
              margin="20px"
            >
              Vos Opportunités d'emploi, <br />
              uniquement chez les client finaux
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              maxWidth={900}
              margin="auto"
            >
              Si vous recherchez des opportunités d'emploi dans le domaine
              informatique, le cabinet de recrutement Externatic peut mettre à
              votre disposition une équipe de consultants en technologie de
              l'information, pour vous aider à trouver l'emploi qui vous
              correspond. Notre cabinet de recrutement s'attache à placer
              l'humain au centre de son action. Nous nous appuyons ainsi sur des
              méthodes authentiques pour vous accompagner dans al recherche de
              votre emploi.
            </Typography>
            <Stack
              sx={{ pt: 4, m: 3 }}
              direction="row"
              spacing={3}
              justifyContent="center"
            >
              <Button
                onClick={() => {
                  navigate("/register");
                }}
                variant="contained"
              >
                M'inscrire
              </Button>
              <Button
                onClick={() => {
                  navigate("/annonces");
                }}
                variant="outlined"
              >
                Voir les Offres
              </Button>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                sx={{
                  minHeight: 430,
                  minWidth: "100%",
                  maxWidth: 1200,
                }}
                image={backgroundImage}
                title="This must be the place"
                align="center"
              />
            </Box>
            <Box sx={{ m: 5 }}>
              <Typography
                component="h2"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
                margin={5}
              >
                Qui sommes-nous
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
                margin={3}
              >
                Nos valeurs humaines et professionnelles:
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Externatic, c'est avant tout une équipe d'experts IT, tous
                animés par al même passion des relations humaines.
                L'intelligence émotionnelle et l'éducation cognitive en peuvent
                être remplacées par des algorithmes. Notre cabinet de
                recrutement s'appuie sur des méthodes authentiques, où l'humain
                est tout simplement indispensable. Depuis 12 ans, externatic a
                développé un savoir-faire sur le recrutement de profils
                pénuriques. Ces compétences nous permettent d'intervenir sur
                d'autres secteurs que l'IT. Notamment l'industrie avec Induseo
                et al cybersécurité avec Underguard.
              </Typography>
            </Box>
          </Container>
        </Box>
        <Container maxWidth="xl" sx={{ py: 1 }}>
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            flexWrap="wrap"
            gutterBottom
          >
            Top Annonces
          </Typography>
          {/* {Carousel TopAnnoncesCard} */}
          <TopAnnoncesCard />
          <Box
            maxWidth="xl"
            sx={{ m: 2 }}
            display="flex"
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
          >
            <JobByTypeCard jobTypes={jobTypes.devFront} />
            <JobByTypeCard jobTypes={jobTypes.devBack} />
            <JobByTypeCard jobTypes={jobTypes.prodcuctOwner} />
            <JobByTypeCard jobTypes={jobTypes.devData} />
            <JobByTypeCard jobTypes={jobTypes.chefProject} />
            <JobByTypeCard jobTypes={jobTypes.devOps} />
          </Box>
        </Container>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            &copy;Externatic
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </Container>
    </>
  );
}
