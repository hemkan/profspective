import React from "react";
import { Box, Typography } from "@mui/material";

const Message = ({ message }) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        color: "#fff",
        padding: "16px",
        fontFamily: "Montserrat, Roboto, Helvetica, sans-serif",
        fontSize: "10px",
        lineHeight: 1,
        maxWidth: "80%",
        alignSelf: message.role != "user" ? "flex-start" : "flex-end",
        backgroundColor: message.role != "user" ? "#303374" : "#202248",
      }}
    >
      <Typography>{message.content}</Typography>
    </Box>
  );
};

export default Message;
