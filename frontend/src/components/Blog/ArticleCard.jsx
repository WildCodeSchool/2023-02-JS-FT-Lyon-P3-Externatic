import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";

const MEDIASTACK_API_KEY = import.meta.env.VITE_MEDIASTACK_API_KEY;

function ArticleCard() {
  const notify = () => toast.error("Désolé! Aucune Info pour le moment");
  const [news, setNews] = useState(null);
  const getNews = () => {
    axios
      .get(
        `http://api.mediastack.com/v1/news?access_key=${MEDIASTACK_API_KEY}&categories=technology,business&languages=fr&limit=20`
      )
      .then((response) => {
        setNews(response.data.data);
      })
      .catch((error) => {
        notify(error.message);
      });
  };

  useEffect(getNews, []);

  const [newsIndex, setNewsIndex] = useState(0);
  const handlePrevious = () => {
    setNewsIndex(newsIndex - 1);
  };
  const handleNext = () => {
    setNewsIndex(newsIndex + 1);
  };

  if (news) {
    return (
      <Card sx={{ maxWidth: "60%", mb: { xs: 3, md: 3 }, pt: 5 }}>
        {news[newsIndex].image !== null ? (
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image={news[newsIndex].image}
          />
        ) : (
          handleNext()
        )}
        <CardContent className="bottom-container">
          <Typography variant="h6" color="initial">
            {news[newsIndex].title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {news[newsIndex].description}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {news[newsIndex].content}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Source: {news[newsIndex].source.name}
          </Typography>
        </CardContent>

        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 4 }}
        >
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={newsIndex === 0}
            className="news-arrow news-arrow-prev"
          >
            <ArrowLeftIcon /> Prev
          </Button>
          <Link
            href={news[newsIndex].url}
            className="news-link"
            target="_blank"
            rel="noreferrer"
          >
            Lire Plus
          </Link>
          <Button
            type="button"
            onClick={handleNext}
            disabled={newsIndex === news.length - 1}
            className="news-arrow news-arrow-next"
          >
            Next
            <ArrowRightIcon />
          </Button>
        </Stack>
      </Card>
    );
  }
}

ArticleCard.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string,
    source: PropTypes.shape({ name: PropTypes.string }),
    image: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
  }),
};

ArticleCard.defaultProps = {
  news: null,
};

export default ArticleCard;
