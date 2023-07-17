import React from "react";
import Container from "@mui/material/Container";
import NewsCard from "../components/Blog/NewsCard";
import ArticleCard from "../components/Blog/ArticleCard";

export default function Blog() {
  return (
    <Container maxWidth="lg">
      <NewsCard />
      <ArticleCard />
    </Container>
  );
}
