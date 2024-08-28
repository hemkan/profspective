"use client";
import { useState, useEffect } from "react";
import { Box, Fab, Slide } from "@mui/material";
import TopNav from "./components/TopNav";
import HeroSection from "./components/HeroSection";
import Loading from "./components/Loading";
import ChatBot from "./components/ChatBot";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the time as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
    <Box>
      <TopNav />
      <HeroSection />
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
