import React from "react";
import Container from "@mui/material/Container";
import NewsCard from "../components/Blog/NewsCard";
import Navbar from "../components/Navbar";

export default function Blog() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <NewsCard />
      </Container>
    </>
  );
}
