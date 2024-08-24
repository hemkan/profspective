import TopNav from "../../components/TopNav";
import { UserProfile } from "@clerk/nextjs";
import { Box, Container } from "@mui/material";

const UserProfilePage = () => {
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
      <Container maxWidth="md" sx={{ flexGrow: 1, mt: 2 }}>
        <UserProfile path="/user-profile" />
      </Container>
    </Box>
  );
};

<UserProfile path="/user-profile" />;

export default UserProfilePage;
