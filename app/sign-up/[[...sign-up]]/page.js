"use client";
import { Box, Container, Typography } from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import TopNav from "../../components/TopNav";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensure the container takes full viewport height
        width: "100vw", // Full viewport width
        overflowX: "hidden", // Hide any horizontal overflow
      }}
    >
      <TopNav />
      <Container
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column", // Stack items vertically on extra-small screens
            sm: "row",    // Arrange items horizontally on small screens and above
          },
          alignItems: "center",
          justifyContent: "center",
          padding: {
            xs: "20px",  // Reduce padding on extra-small screens
            sm: "40px",  // Increase padding on small screens and above
          },
          margin: "0 auto", // Center the container horizontally
          maxWidth: "1200px", // Optional: Set a max-width for better readability
          width: "100%", // Ensure the container takes full width
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            paddingRight: {
              sm: "40px", // Add padding between the sign-up form and image on larger screens
              xs: "0",    // Remove padding on extra-small screens
            },
            marginBottom: {
              xs: "20px", // Add margin at the bottom for small screens
              sm: "0",    // Remove margin on larger screens
            },
          }}
        >
          <SignUp />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column", // Stack text and image vertically
            alignItems: "center",
            justifyContent: "center",
            minHeight: "500px", // Adjust the height for larger screens
            width: "100%",    // Ensure the box takes full width
            order: {
              xs: 2, // Move the sign-up form above the image on extra-small screens
              sm: 1, // Move the sign-up form to the left on small screens and above
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: {
                xs: "24px", // Reduce font size on extra-small screens
                sm: "36px", // Increase font size on small screens and above
              },
              marginBottom: "24px",
              color: "#FFFFFF",
              fontFamily: "Righteous",
              textAlign: "center", // Center align text
            }}
          >
            Welcome to ProfSpective!
          </Typography>
          <Box
            sx={{
              display: { xs: "block", sm: "block" }, // Show image on both screens
              width: "100%",
              maxWidth: "400px", // Set max width for the image
              height: "auto",
              marginTop: "20px", // Add space between text and image
            }}
          >
            <Image
              src="/Welcome.png"
              alt="Welcome"
              width={400} // Adjust width of the image for larger screens
              height={400} // Adjust height of the image for larger screens
              style={{ borderRadius: "8px", width: "100%", height: "auto" }} // Ensure image scales properly
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
