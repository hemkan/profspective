"use client";
import { Box, Container } from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import TopNav from "../../components/TopNav";

export default function SignUpPage() {
  return (
    <Box>
      <TopNav />
      <Container>
        <SignUp />
      </Container>
    </Box>
  );
}
