"use client";
import { Box, Container } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
import TopNav from "../../components/TopNav";

export default function SignUpPage() {
  return (
    <Box>
      <TopNav />
      <Container>
        <SignIn />
      </Container>
    </Box>
  );
}
