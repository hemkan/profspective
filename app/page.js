"use client"
import { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import TopNav from "./components/TopNav";
import HeroSection from "./components/HeroSection";
import Loading from "./components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the time as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      <TopNav />
      <HeroSection />
    </Box>
  );

}
