"use client";
import React from "react";
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
import { IoClose } from "react-icons/io5";

const ChatBot = () => {
  const [apiLoading, setApiLoading] = useState(false);
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

  const submitMessage = (inputMessage) => {
    if (input.trim() != "") {
      setApiLoading(true);
      handleSubmit();
    }
  };

  return (
    <Stack
      direction="column"
      sx={{
        maxWidth: "350px",
        width: "100%",
        maxHeight: "550px",
        height: "100%",
        paddingY: "25px",
        borderRadius: "20px",
        backgroundColor: "#13131e",
      }}
    >
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
          <IoClose
            style={{
              width: "25px",
              height: "25px",
              color: "#3D3E82",
              marginTop: "-10px",
            }}
          />
        </Stack>
        <Divider
          sx={{ width: "100%", backgroundColor: "#3D3E82", mt: "10px" }}
        />
      </Box>

      <Box
        flexGrow={1}
        overflow="hidden"
        position="relative"
        padding="12px 15px 8px"
      >
        <Stack
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
        </Stack>
      </Box>

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
        <TextField
          disabled={isLoading}
          fullWidth
          variant="outlined"
          placeholder="Enter Text"
          size="small"
          value={input}
          onKeyDown={(event) => {
            if (event.key == "Enter" && !event.shiftKey) {
              submitMessage(input);
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            flexGrow: "1",
            "& .MuiInputBase-input": {
              color: "#FFF",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
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
