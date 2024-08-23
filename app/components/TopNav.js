"use client";
import { Typography, Toolbar, Button, AppBar, Box } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: colors.text }}>
          Swift-Cards
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <SignedOut>
            <Button
              color="inherit"
              sx={{
                color: colors.text,
                textTransform: "none",
                fontSize: "12px",
              }}
              href="/sign-in"
            >
              Log In
            </Button>
            <Button
              color="inherit"
              sx={{
                backgroundColor: colors.highlight,
                color: colors.primary,
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
              href="/sign-up"
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton userProfileUrl="/user-profile" />
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
