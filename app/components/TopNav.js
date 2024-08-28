"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function TopNav() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Breakpoint for mobile screens
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} href="/">
          <ListItemText primary="Home" />
        </ListItem>
        <SignedOut>
          <ListItem button component={Link} href="/sign-in">
            <ListItemText primary="Log In" />
          </ListItem>
          <ListItem button component={Link} href="/sign-up">
            <ListItemText primary="Sign Up" />
          </ListItem>
        </SignedOut>
        <SignedIn>
          <ListItem button component={Link} href="/user-profile">
            <ListItemText primary="Profile" />
          </ListItem>
        </SignedIn>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#13131E",
        padding: isMobile ? "0 10px" : "0 20px", // Adjust padding for different screen sizes
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(-20px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        boxShadow: "none", // Remove any box shadow
        height: "110px",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "64px", // Keep default height for mobile and desktop
          padding: "8px 0", // Maintain padding to adjust the height
          display: "flex",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 0.8s, transform 1s ease 0.8s",
        }}
      >
        <Box sx={{ marginRight: "auto" }}>
          <Link href="/">
            <img
              src="/Profspective.svg" // Update this path to your image file
              alt="Profspective"
              style={{
                height: isMobile ? "20px" : "24px", // Adjust icon size for different screens
                cursor: "pointer",
              }}
            />
          </Link>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              // edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ color: "#E0DFFE" }} />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2, marginLeft: "auto" }}>
            <SignedOut>
              <SignInButton>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    fontSize: "18px",
                    fontFamily: "Righteous",
                    color: "#E0DFFE", // Set font color for the Log In button
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
                    fontSize: "18px",
                    borderRadius: "20px",
                    color: "#E0DFFE", // Set font color for the Sign Up button
                    backgroundColor: "#6A6AFE",
                    fontFamily: "Righteous",
                    padding: "0 10px",
                    "&:hover": {
                      backgroundColor: "#6958AD",
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
        )}
      </Toolbar>
    </AppBar>
  );
}
