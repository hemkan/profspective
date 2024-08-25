import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading = ({ height = "100vh", margin_top = "0" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
        backgroundColor: "#13131E",
        marginTop: margin_top,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loading;
