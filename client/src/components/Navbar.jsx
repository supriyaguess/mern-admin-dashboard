import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Typography,
  Box,
  Menu,
  IconButton,
  InputBase,
  MenuItem,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpeg";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
        height: "64px",
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>

          <FlexBetween
            background={theme.palette.background.alt}
            borderRadius="9px"
            gap="1rem"
            px="1.5rem"
            py="0.2rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>

          <IconButton>
            <SettingsOutlined />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                textTransform: "none",
                display: "flex",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                src={profileImage}
                alt="profile"
                height="32px"
                width="32px"
                borderRadius="50%"
              />

              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.85rem">
                  {user?.name || "Admin User"}
                </Typography>
                <Typography fontSize="0.75rem">
                  {user?.occupation || "Administrator"}
                </Typography>
              </Box>

              <ArrowDropDownOutlined />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
