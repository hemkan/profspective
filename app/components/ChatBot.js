"use client";
import React, { useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useChat } from "ai/react";
import { ThreeDots } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ChatBot = ({ closeChat }) => {
  //Add State variables
  const chatInput = useRef(null);
  const messageRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "api/rag",
    initialMessages: [{ role: "assistant", content: "How can I help you?" }],
    onResponse: () => setApiLoading(false),
  });

  //Focus on the chat input
  useEffect(() => {
    if (!isLoading) {
      chatInput.current?.querySelector("textarea:first-child")?.focus();
    }
  }, [isLoading]);

  //Auto Scroll when Messages is changed
  useEffect(() => {
    const { scrollHeight, scrollTop, offsetHeight } =
      messageContainerRef.current;
    if (scrollHeight >= scrollTop + offsetHeight) {
      messageContainerRef.current?.scrollTo({
        top: scrollHeight,
        // behavior: "smooth",
      });
    }
  }, [messages]);

  //Show Scroll Button
  useEffect(() => {
    const handleScroll = () => {
      if (messageContainerRef.current) {
        const { scrollHeight, scrollTop, offsetHeight } =
          messageContainerRef.current;
        setShowScroll(scrollHeight - 70 >= scrollTop + offsetHeight);
      }
    };

    messageContainerRef.current?.addEventListener("scroll", handleScroll);
    return () =>
      messageContainerRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  //Handle Submit Button
  const submitMessage = (inputMessage) => {
    if (inputMessage.trim() != "") {
      setApiLoading(true);
      handleSubmit();
    }
  };

  return (
    <Stack
      direction="column"
      sx={{
        width: { xs: "100vw", sm: "425px" },
        height: "550px",
        paddingY: "25px",
        borderRadius: { xs: "0px", sm: "20px" },
        backgroundColor: "#13131e",
        overflow: "hidden",
      }}
    >
      {/* Header from the chatbot */}
      <Box sx={{ paddingX: "15px" }}>
        <Stack direction="row" alignItems="center">
          <Typography
            sx={{
              color: "#fff",
              flexGrow: "1",
              marginLeft: 1,
              fontFamily: "Righteous, Roboto, Helvetica, sans-serif",
              fontSize: "20px",
              lineHeight: 1.2,
            }}
          >
            Profspective Bot
          </Typography>
          {/* Close Chatbot */}
          <CloseIcon
            sx={{
              width: "25px",
              height: "25px",
              color: "#3D3E82",
              marginTop: "-10px",
              cursor: "pointer",
              ":hover": {
                color: "#fff",
              },
            }}
            onClick={closeChat}
          />
        </Stack>
        <Divider
          sx={{ width: "100%", backgroundColor: "#3D3E82", mt: "10px" }}
        />
      </Box>

      {/* Messages Display */}
      <Box
        flexGrow={1}
        overflow="hidden"
        position="relative"
        padding="12px 15px 8px"
      >
        <Stack
          ref={messageContainerRef}
          direction="column"
          gap="16px"
          paddingX="8px"
          height="100%"
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#a1a1a1",
              },
            },
          }}
        >
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {/* Loading Symbol if Api is Loading */}
          {apiLoading && (
            <Box
              sx={{
                borderRadius: 2,
                color: "#fff",
                padding: "16px",
                fontFamily: "Montserrat, Roboto, Helvetica, sans-serif",
                fontSize: "10px",
                lineHeight: 1,
                maxWidth: "80%",
                alignSelf: "flex-start",
                backgroundColor: "#303374",
              }}
            >
              <ThreeDots
                height="25px"
                width="25px"
                color="white"
                ariaLabel="loading"
              />
            </Box>
          )}
          <div ref={messageRef}></div>
        </Stack>

        {showScroll && (
          <IconButton
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "30px",
              // right: "50%",
              // transform: "translateX(50%)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "rgb(61, 62, 130)",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "white",
              },
              boxShadow: "0 0 2px white",
            }}
            onClick={() => {
              messageRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        )}
      </Box>

      {/* Message Sending Feature */}
      <Stack
        direction="row"
        alignItems="center"
        marginX="15px"
        sx={{
          gap: 1,
          padding: "8px 9px",
          border: "1px solid #5958b1",
          borderRadius: "16px",
        }}
      >
        {/* Message Input */}
        <TextField
          ref={chatInput}
          disabled={isLoading}
          fullWidth
          variant="outlined"
          placeholder="Enter Text"
          size="small"
          multiline
          maxRows={3}
          value={isLoading ? "Loading..." : input}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submitMessage(input);
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            flexGrow: "1",
            "& .MuiInputBase-input": {
              color: "#FFF",
              "&::-webkit-scrollbar": {
                width: "3px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#c1c1c1",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#a1a1a1",
                },
              },
            },
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "rgba(255, 255, 255, 0.6)",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
        {/* Submit Button */}
        <IconButton
          type="submit"
          aria-label="Send message"
          disabled={isLoading}
          onClick={() => {
            submitMessage(input);
          }}
        >
          <SendIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ChatBot;
