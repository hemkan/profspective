import { Box, Typography } from "@mui/material";
import TopNav from "./components/TopNav";

export default function Home() {
  return (
    <Box>
      <TopNav />
      <Typography variant="h1">
        Welcome to Rate My Professor Assistant
      </Typography>
      <Button variant="contained" color="primary" href="/sign-up">
        Sign Up
      </Button>
      <Button variant="contained" color="primary" href="/sign-in">
        Log In
      </Button>
    </Box>
  );
}
