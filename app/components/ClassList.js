"use client";
import React, { use, useEffect } from "react";
import { Dialog, Typography } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Loading from "./Loading";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Snackbar,
  Alert,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { IoIosMore } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export default function ClassList() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState("");
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [dialogType, setDialogType] = useState("add"); // "add" or "rename"
  const [dialogTitle, setDialogTitle] = useState("Add Class");
  const [newName, setNewName] = useState("");

  const router = useRouter();

  const getClasses = async () => {
    if (!isLoaded || !isSignedIn) return;
    try {
      // users -> user.id -> classes
      const classesCollectionRef = collection(db, "users", user.id, "classes");
      const fetchedClasses = [];
      const querySnapshot = await getDocs(classesCollectionRef);

      querySnapshot.forEach((doc) => {
        fetchedClasses.push({ id: doc.id, ...doc.data() });
      });
      setClasses(fetchedClasses);
    } catch (error) {
      setOpenSnackbar("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addClass = async (classs) => {
    try {
      const userDocRef = doc(
        collection(doc(collection(db, "users"), user.id), "classes"),
        classs
      );
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setOpenSnackbar("Class already exists.");
      } else {
        await setDoc(userDocRef, {
          Professor: "None",
          professorID: "None",
        });
        setOpenSnackbar("Class added successfully!");
      }
    } catch (error) {
      setOpenSnackbar("An error occurred. Please try again.");
    } finally {
      getClasses();
      handleCloseDialogue();
    }
  };

  const deleteClass = async () => {
    setOpenSnackbar("");

    try {
      const userDocRef = doc(
        collection(doc(collection(db, "users"), user.id), "classes"),
        selectedClass.id
      );
      await deleteDoc(userDocRef);
      setOpenSnackbar("Class deleted successfully!");
    } catch (error) {
      setOpenSnackbar("An error occurred. Please try again.");
    } finally {
      getClasses();
      handleCloseUserMenu();
    }
  };

  const renameClass = async (newName) => {
    try {
      const oldDocRef = doc(
        collection(doc(collection(db, "users"), user.id), "classes"),
        selectedClass.id
      );

      const newDocRef = doc(
        collection(doc(collection(db, "users"), user.id), "classes"),
        newName
      );
      const newDocSnap = await getDoc(newDocRef);
      if (newDocSnap.exists()) {
        console.log("A class with this name already exists.");
        setOpenSnackbar("Class with this name already exists.");
        return;
      }
      const oldDocSnap = await getDoc(oldDocRef);
      await setDoc(newDocRef, oldDocSnap.data());
      await deleteDoc(oldDocRef);
      setOpenSnackbar("Class renamed successfully!");
    } catch (error) {
      setOpenSnackbar("An error occurred. Please try again.");
    } finally {
      getClasses();
      handleCloseDialogue();
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar("");
  };

  const handleOpenUserMenu = (event, classs) => {
    event.stopPropagation();
    setAnchorElUser(event.currentTarget);
    setSelectedClass(classs);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setSelectedClass(null);
  };

  const handleClickOpenDialogue = (type) => {
    setDialogType(type);
    if (type === "rename" && selectedClass) {
      setDialogTitle("Rename Class");
      setNewName(selectedClass.id);
    } else {
      setDialogTitle("Add Class");
      setNewName("");
    }
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setAnchorElUser(null);
    setOpenDialogue(false);
  };

  const handleDialogSubmit = (event) => {
    event.preventDefault();
    if (dialogType === "add") {
      addClass(newName);
    } else if (dialogType === "rename") {
      renameClass(newName);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      getClasses();
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (openSnackbar == "") {
      setOpenSnackbar(false);
    }
  }, [openSnackbar]);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Righteous",
            color: "#E0DFFE",
          }}
        >
          Classes
        </Typography>
        <Box display="flex" flexDirection="row">
          <Box
            borderRadius={4}
            border="1px solid #5B5BD6"
            color="#E0DFFE"
            mr={"1rem"}
            bgcolor={"#5B5BD6"}
            px={2}
            sx={{
              "&:hover": {
                border: "1px solid #E0DFFE",
              },
              transition: "border 0.3s",
            }}
          >
            <Button
              onClick={() => {
                router.push("/find-my-professors");
              }}
              bgcolor={"#5B5BD6"}
              sx={{
                color: "#E0DFFE",
                fontFamily: "Righteous",
              }}
            >
              FIND MY PROFESSORS
            </Button>
          </Box>
          <Box
            borderRadius={10}
            border="1px solid #5B5BD6"
            color="#E0DFFE"
            bgcolor={"#5B5BD6"}
            p={0.5}
            sx={{
              "&:hover": {
                border: "1px solid #E0DFFE",
              },
              transition: "border 0.3s",
            }}
          >
            <IconButton
              onClick={() => {
                handleClickOpenDialogue("add");
              }}
              bgcolor={"#5B5BD6"}
              sx={{
                color: "#E0DFFE",
              }}
            >
              <FaPlus size={15} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ mt: 1 }}
        display="flex"
        justifyContent="center"
      >
        {isLoading ? (
          <Loading height="100%" margin_top={"10%"} />
        ) : classes.length === 0 ? (
          <Box marginTop="10%">
            <Typography
              fontFamily={"Montserrat"}
              variant="h5"
              color="#E0DFFE"
              textAlign="center"
            >
              No classes found
            </Typography>
          </Box>
        ) : (
          classes.map((classs, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 5,
                  padding: "1rem",
                  border: "1px solid #262A65",
                  bgcolor: "#262A65",
                  "&:hover": {
                    border: "1px solid #FFFFFF",
                  },
                  transition: "border 0.3s",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <CardActionArea>
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontFamily: "Montserrat",
                          color: "#E0DFFE",
                        }}
                      >
                        {classs.id}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontFamily: "Montserrat",
                          color: "#E0DFFE",
                          paddingTop: "0.5rem",
                        }}
                      >
                        Professor: {classs.Professor}
                      </Typography>
                    </Box>
                  </CardActionArea>
                  <Box display={"flex"} alignItems={"center"}>
                    <Tooltip title="Options">
                      <div>
                        <IconButton
                          onClick={(event) => handleOpenUserMenu(event, classs)}
                          sx={{ p: 1, color: "#E0DFFE" }}
                        >
                          <IoIosMore />
                        </IconButton>
                      </div>
                    </Tooltip>
                    <Menu
                      sx={{
                        mt: "45px",

                        "& .MuiPaper-root": {
                          boxShadow: "0px 0px 1px grey !important",
                        },
                        "& .MuiMenu-paper": {
                          backgroundColor: "#262A65",
                          color: "#E0DFFE",
                        },
                        "& .MuiMenuItem-root": {
                          "&:hover": {
                            backgroundColor: "#5B5BD6",
                            color: "#E0DFFE",
                          },
                        },
                      }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                      aria-hidden={anchorElUser ? "false" : "true"}
                    >
                      <MenuItem
                        onClick={() => handleClickOpenDialogue("rename")}
                        sx={{
                          color: "#E0DFFE",
                        }}
                      >
                        <Typography textAlign="center">Rename</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={deleteClass}
                        sx={{
                          color: "#E0DFFE",
                        }}
                      >
                        <Typography textAlign="center">Delete</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Dialog
        open={openDialogue}
        onClose={handleCloseDialogue}
        PaperProps={{
          component: "form",
          onSubmit: handleDialogSubmit,
          sx: {
            backgroundColor: "#202248",
            color: "#E0DFFE",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#E0DFFE",
            fontFamily: "Righteous",
          }}
        >
          {dialogTitle}
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            sx={{ color: "#E0DFFE", fontFamily: "Montserrat" }}
          >
            {dialogType === "add"
              ? "Enter the course number for the new class:"
              : "Enter the new course number for the class:"}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="class_num"
            label="Course Number"
            fontFamily="Montserrat"
            type="text"
            fullWidth
            variant="filled"
            sx={{ color: "#E0DFFE", marginTop: "1rem" }}
            InputLabelProps={{
              style: { color: "#E0DFFE", fontFamily: "Montserrat" },
            }}
            InputProps={{
              style: {
                color: "#E0DFFE",
                fontFamily: "Montserrat",
              },
            }}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialogue}
            sx={{ color: "#E0DFFE", fontFamily: "Montserrat" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{ color: "#E0DFFE", fontFamily: "Montserrat" }}
          >
            {dialogType === "add" ? "Add" : "Rename"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          sx={{
            width: "100%",
            backgroundColor: "#5B5BD6",
            color: "#E0DFFE",
          }}
          icon={false}
        >
          {openSnackbar}
        </Alert>
      </Snackbar>
    </Container>
  );
}
