import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  Box,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Navbar({ userType }) {
  const navigate = useNavigate();

  const [anchorElWork, setAnchorElWork] = useState(null);
  const [anchorElDeliver, setAnchorElDeliver] = useState(null);
  const [anchorElPostJob, setAnchorElPostJob] = useState(null);
  const [anchorElHires, setAnchorElHires] = useState(null);
  const [anchorElReport, setAnchorElReport] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null); // For profile dropdown

  const openWork = Boolean(anchorElWork);
  const openDeliver = Boolean(anchorElDeliver);
  const openPostJob = Boolean(anchorElPostJob);
  const openHires = Boolean(anchorElHires);
  const openReport = Boolean(anchorElReport);
  const openProfile = Boolean(anchorElProfile);

  const handleMenuClick = (setter) => (event) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = (setter) => () => {
    setter(null);
  };

  const freelancerLinks = () => (
    <Box sx={{ display: "flex", gap: 2 }}>
      <div>
        <Button
          color="inherit"
          onClick={handleMenuClick(setAnchorElWork)}
          endIcon={<ArrowDropDown />}
          sx={{ color: "#007bff" }}
        >
          Find Work
        </Button>
        <Menu
          anchorEl={anchorElWork}
          open={openWork}
          onClose={handleMenuClose(setAnchorElWork)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem
            onClick={handleMenuClose(setAnchorElWork)}
            href="/findFreelancer"
          >
            Find Work
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose(setAnchorElWork)}
            href="/savedJobs"
          >
            Saved Projects
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose(setAnchorElWork)}
            href="/proposals"
          >
            Proposals
          </MenuItem>
        </Menu>
      </div>

      <div>
        <Button
          color="inherit"
          onClick={handleMenuClick(setAnchorElDeliver)}
          endIcon={<ArrowDropDown />}
          sx={{ color: "#007bff" }}
        >
          Deliver Work
        </Button>
        <Menu
          anchorEl={anchorElDeliver}
          open={openDeliver}
          onClose={handleMenuClose(setAnchorElDeliver)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem
            onClick={handleMenuClose(setAnchorElDeliver)}
            href="/activeContracts"
          >
            Active Contracts
          </MenuItem>
        </Menu>
      </div>

      <Button color="inherit" href="/refund" sx={{ color: "#007bff" }}>
        Refund Policy
      </Button>
      <Button color="inherit" href="/messages" sx={{ color: "#007bff" }}>
        Messages
      </Button>
    </Box>
  );

  const clientLinks = () => (
    <Box sx={{ display: "flex", gap: 2 }}>
      <div>
        <Button
          color="inherit"
          onClick={handleMenuClick(setAnchorElPostJob)}
          endIcon={<ArrowDropDown />}
          sx={{ color: "#007bff" }}
        >
          Post Job
        </Button>
        <Menu
          anchorEl={anchorElPostJob}
          open={openPostJob}
          onClose={handleMenuClose(setAnchorElPostJob)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={handlePostProject} href="/post-project-layout">
            Post a Project
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose(setAnchorElPostJob)}
            href="/dashboard"
          >
            Dashboard
          </MenuItem>
        </Menu>
      </div>

      <div>
        <Button
          color="inherit"
          onClick={handleMenuClick(setAnchorElHires)}
          endIcon={<ArrowDropDown />}
          sx={{ color: "#007bff" }}
        >
          Your Hires
        </Button>
        <Menu
          anchorEl={anchorElHires}
          open={openHires}
          onClose={handleMenuClose(setAnchorElHires)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem
            onClick={handleMenuClose(setAnchorElHires)}
            href="/yourhires"
          >
            Your Hires
          </MenuItem>
        </Menu>
      </div>

      <div>
        <Button
          color="inherit"
          onClick={handleMenuClick(setAnchorElReport)}
          endIcon={<ArrowDropDown />}
          sx={{ color: "#007bff" }}
        >
          Report
        </Button>
        <Menu
          anchorEl={anchorElReport}
          open={openReport}
          onClose={handleMenuClose(setAnchorElReport)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem
            onClick={handleMenuClose(setAnchorElReport)}
            href="/weeklySummary"
          >
            Weekly Summary
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose(setAnchorElReport)}
            href="/transactionHistory"
          >
            Transaction History
          </MenuItem>
        </Menu>
      </div>

      <Button color="inherit" href="/messages" sx={{ color: "#007bff" }}>
        Messages
      </Button>
    </Box>
  );
  //logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const handlePostProject = () => {
    navigate("/post-project-layout");
    setAnchorElPostJob(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#ffffff", color: "#000000" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            Work<span style={{ color: "#00b3ff" }}>Link</span>
          </a>
        </Typography>

        {userType === "freelancer"
          ? freelancerLinks()
          : userType === "client"
          ? clientLinks()
          : null}

        <TextField
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "white", borderRadius: "4px", marginRight: 2 }}
          placeholder="Search"
        />

        <div>
          <IconButton onClick={handleMenuClick(setAnchorElProfile)}>
            <Avatar alt="" src="/profile.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorElProfile}
            open={openProfile}
            onClose={handleMenuClose(setAnchorElProfile)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                navigate("/profile");
                setAnchorElProfile(null); // Close the menu
              }}
            >
              profile
            </MenuItem>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  userType: PropTypes.oneOf(["freelancer", "client"]).isRequired,
};
