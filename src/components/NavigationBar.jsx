import React, { useState } from "react";
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

  const handleMenuOpen = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
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
          <Button color="inherit" href="/add-question">Add Question</Button>
          <Button color="inherit" href="/view-questions">View Questions</Button>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={menuOpen}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(menuOpen)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
