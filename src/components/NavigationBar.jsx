import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if the user is logged in and get the user role from localStorage
    const userEmail = localStorage.getItem("userEmail");
    const role = localStorage.getItem("userRole");
    if (userEmail && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
  };

  const handleLogOut = () => {
    // Clear localStorage
    localStorage.clear();
    // Redirect to home page or login page
    window.location.href = "/";
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          border: 1,
          borderRadius: 50,
          borderColor: "primary.main",
          color: "white",
          bgcolor: "#131842",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 3 }}>
            Quizzy
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          
          {/* Conditionally render buttons based on user role */}
          {isLoggedIn && userRole === "admin" && (
            <>
              <Button color="inherit" href="/add-question">Add Question</Button>
              <Button color="inherit" href="/view-questions">View Questions</Button>
            </>
          )}
          
          {isLoggedIn ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ display: "flex", alignItems: "center" }} // Ensure alignment
              >
                <AccountCircle />
                <Typography 
                  variant="body1" 
                  sx={{ marginLeft: 1, fontWeight: 500, color: "white" }} // Adjust styles here
                >
                  {localStorage.getItem("family_name")}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ marginLeft: 1, fontWeight: 500, color: "white" }} // Adjust styles here
                >
                  {userRole}
                </Typography>
              </IconButton>
              <Button color="inherit" onClick={handleLogOut}>Log Out</Button>
            </>
          ) : (
            <Button color="inherit" href="/login">Log In</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
