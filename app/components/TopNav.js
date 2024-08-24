"use client";
import { Typography, Toolbar, Button, AppBar, Box } from "@mui/material";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function TopNav() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">
          <Link
            href="/"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Swift-Cards
          </Link>
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <SignedOut>
            <SignInButton>
              <Button
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                }}
              >
                Log In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  borderRadius: "5px",
                  px: 1,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#FFD700",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton userProfileUrl="/user-profile" />
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
