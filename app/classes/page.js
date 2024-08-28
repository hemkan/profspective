"use client";
import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import ClassList from "../components/ClassList";
import { Box, Fab, Slide } from "@mui/material";
import ChatBot from "../components/ChatBot";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export default function Classes() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(true);

  const closeChat = () => {
    setIsChatOpen(false);

    setTimeout(() => {
      setIsFabOpen(true);
    }, 280);
  };

  const openChat = () => {
    setIsFabOpen(false);

    setTimeout(() => {
      setIsChatOpen(true);
    }, 200);
  };

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
      <Slide in={isChatOpen} direction="up" mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            bottom: { xs: "0px", sm: "15px" },
            right: { xs: "0px", sm: "25px" },
            zIndex: 1000,
            borderRadius: { xs: "0px", sm: "20px" },
            boxShadow: "0 0 3px white",
          }}
        >
          <ChatBot closeChat={closeChat} />
        </Box>
      </Slide>
      <Slide in={isFabOpen} direction="up" mountOnEnter unmountOnExit>
        <Fab
          sx={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            boxShadow: "0 0 3px white",
          }}
          onClick={openChat}
        >
          <ChatBubbleIcon />
        </Fab>
      </Slide>
    </Box>
  );
}
