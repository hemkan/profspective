import React from "react";
import TopNav from "../components/TopNav";
import ClassList from "../components/ClassList";
import { Box } from "@mui/material";

export default function Classes() {
  return (
    <Box
      paddingBottom={3}
      width="100%"
      sx={{
        bgcolor: "#13131E",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopNav />
      <ClassList />
    </Box>
  );
}
