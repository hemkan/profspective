"use client";
import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import Lottie from "lottie-react";
import WelcomeAnimation from "../../public/WelcomeAnimation.json";

export default function HeroSection() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column", // Stack elements vertically on small screens
            sm: "row", // Arrange elements horizontally on medium and larger screens
          },
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "40px 20px",
          backgroundColor: "#13131E",
          height: "80vh",
          textAlign: {
            xs: "center", // Center text on small screens
            sm: "left", // Align text to the left on larger screens
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: "600px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: "28px", // Font size for small screens
                sm: "40px", // Font size for larger screens
              },
              fontWeight: "bold",
              marginBottom: "16px",
              color: "#FFFFFF",
              fontFamily: "Righteous",
            }}
          >
            Find Your Ideal Professor
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: {
                xs: "16px", // Font size for small screens
                sm: "18px", // Font size for larger screens
                color: "#FFFFFF",
              },
              marginBottom: "32px",
            }}
          >
            Discover the professors who match your learning style and academic
            goals, with ProfSpective’s personalized recommendations and student
            insights.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column", // Stack buttons vertically on small screens
                sm: "row", // Arrange buttons horizontally on larger screens
              },
              gap: "16px",
            }}
          >
            <Link href="/">
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Righteous",
                  fontSize: {
                    xs: "14px",
                    sm: "16px",
                    color: "#E0DFFE",
                  },
                  backgroundColor: "#6E6ADE",
                  borderRadius: "20px",
                  padding: "12px 24px",
                }}
              >
                Get Started
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  fontFamily: "Righteous",
                  fontSize: {
                    xs: "14px",
                    sm: "16px",
                    color: "#6E6ADE",
                  },
                  borderColor: "#6E6ADE",
                  borderRadius: "20px",
                  padding: "12px 24px",
                }}
              >
                How It Works
              </Button>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "500px",
            height: "500px", // Set a fixed height for the image container
            maxWidth: "500px", // Set a max width for the image container
          }}
        >
          <div style={{ transform: "scale(1.4)", transformOrigin: "center" }}>
            <Lottie
              animationData={WelcomeAnimation}
              loop={true}
              alt="ProfSpective"
            />
          </div>
        </Box>
      </Box>
    </Container>
  );
}
