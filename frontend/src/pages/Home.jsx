import * as React from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import CardMedia from "@mui/material/CardMedia";
import TopAnnoncesCard from "../components/Home/TopAnnoncesCard";
import JobByTypeCard from "../components/Home/JobByTypeCard";
import backgroundImage from "../assets/tim-mossholder-GOMhuCj-O9w-unsplash-1024x683.jpg";
import externaticLogo from "../assets/EXTERNATIC-LOGO-VERTICAL-RVB-removebg-preview.png";
import { api } from "../services/api";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Externatic / Team PAF
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [jobsTypes, setJobsTypes] = React.useState([]);

  React.useEffect(() => {
    try {
      const getAlljobOffers = async () => {
        const jobs = [];
        const res = await api.getAlljobOffers();
        for (let i = 0; i < res.length; i += 1) {
          if (!jobs.includes(res[i].category)) {
            jobs.push(res[i].category);
            setJobsTypes(jobs);
          }
        }
      };
      getAlljobOffers();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Container maxWidth="xxl">
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 6,
          pb: 6,
        }}
      >
        <Container maxWidth="xxl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CardMedia
              sx={{
                m: { xs: "none", md: 3 },
                height: { xs: 200, md: 250 },
                width: { xs: 300, md: 370 },
              }}
              image={externaticLogo}
              title="externatic logo"
              align="center"
            />
          </Box>
          <Typography
            component="h1"
            sx={{
              xs: {
                variant: "h5",
                margin: "20px",
              },
              md: {
                variant: "h3",
                margin: "20px",
              },
            }}
            align="center"
            color="text.primary"
            gutterBottom
          >
            Vos Opportunités d'emploi, <br />
            uniquement chez les client finaux
          </Typography>
          <Typography
            sx={{
              xs: {
                variant: "h6",
                margin: "auto",
                maxWidth: "lg",
              },
              md: {
                variant: "h4",
                margin: "auto",
                maxWidth: "lg",
              },
            }}
            color="text.secondary"
            paragraph
          >
            Si vous recherchez des opportunités d'emploi dans le domaine
            informatique, le cabinet de recrutement Externatic peut mettre à
            votre disposition une équipe de consultants en technologie de
            l'information, pour vous aider à trouver l'emploi qui vous
            correspond. Notre cabinet de recrutement s'attache à placer l'humain
            au centre de son action. Nous nous appuyons ainsi sur des méthodes
            authentiques pour vous accompagner dans al recherche de votre
            emploi.
          </Typography>
          <Stack
            sx={{ pt: 4, m: 3 }}
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            justifyContent="center"
          >
            <Button
              onClick={() => {
                navigate("/register-candidate");
              }}
              variant="contained"
            >
              M'inscrire en tant que candidat
            </Button>
            <Button
              onClick={() => {
                navigate("/register-company");
              }}
              variant="contained"
            >
              M'inscrire en tant qu'entreprise
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
              sx={{
                variant: {
                  xs: "h3",
                  md: "h2",
                },
                margin: 5,
              }}
              align="center"
              color="text.primary"
              gutterBottom
            >
              Qui sommes-nous
            </Typography>
            <Typography
              component="h3"
              sx={{
                variant: {
                  xs: "h4",
                  md: "h3",
                },
                margin: 3,
              }}
              align="center"
              color="text.primary"
              gutterBottom
            >
              Nos valeurs humaines et professionnelles:
            </Typography>
            <Typography
              sx={{
                variant: {
                  xs: "h6",
                  md: "h5",
                },
                textAlign: "center",
              }}
              color="text.secondary"
              paragraph
            >
              Externatic, c'est avant tout une équipe d'experts IT, tous animés
              par la même passion des relations humaines. L'intelligence
              émotionnelle et l'éducation cognitive ne peuvent être remplacées
              par des algorithmes. Notre cabinet de recrutement s'appuie sur des
              méthodes authentiques, où l'humain est tout simplement
              indispensable. Depuis 12 ans, externatic a développé un
              savoir-faire sur le recrutement de profils pénuriques. Ces
              compétences nous permettent d'intervenir sur d'autres secteurs que
              l'IT. Notamment l'industrie avec Induseo et la cybersécurité avec
              Underguard.
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
          sx={{ m: 4 }}
          display="flex"
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
        >
          {jobsTypes.map((offer) => (
            <ReactLink key={offer} to="/annonces">
              <JobByTypeCard jobTypes={offer} />
            </ReactLink>
          ))}
        </Box>
      </Container>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
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
  );
}
