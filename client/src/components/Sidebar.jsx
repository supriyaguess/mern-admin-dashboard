import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Client Facing", icon: null },
  { text: "Products", icon: <ShoppingCartOutlined /> },
  { text: "Customers", icon: <Groups2Outlined /> },
  { text: "Transactions", icon: <ReceiptLongOutlined /> },
  { text: "Geography", icon: <PublicOutlined /> },
  { text: "Sales", icon: null },
  { text: "Overview", icon: <PointOfSaleOutlined /> },
  { text: "Daily", icon: <TodayOutlined /> },
  { text: "Monthly", icon: <CalendarMonthOutlined /> },
  { text: "Breakdown", icon: <PieChartOutlined /> },
  { text: "Management", icon: null },
  { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
  { text: "Performance", icon: <TrendingUpOutlined /> },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Drawer
      open={isSidebarOpen}
      variant="persistent"
      anchor="left"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: theme.palette.background.alt,
        },
      }}
    >
      <Box>
        <FlexBetween m="1.5rem">
          <Typography variant="h4" fontWeight="bold">
            ECOMVISION
          </Typography>

          {!isNonMobile && (
            <IconButton onClick={() => setIsSidebarOpen(false)}>
              <ChevronLeft />
            </IconButton>
          )}
        </FlexBetween>

        <List>
          {navItems.map(({ text, icon }) =>
            !icon ? (
              <Typography key={text} sx={{ m: "2rem 0 1rem 2rem" }}>
                {text}
              </Typography>
            ) : (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(`/${text.toLowerCase()}`)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                  {active === text.toLowerCase() && (
                    <ChevronRightOutlined />
                  )}
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>

        {/* FOOTER */}
        <Box position="absolute" bottom="2rem" width="100%">
          <Divider />
          <FlexBetween m="1.5rem">
            <Box
              component="img"
              src={profileImage}
              height="40px"
              width="40px"
              borderRadius="50%"
            />

            <Box>
              <Typography fontWeight="bold">
                {user?.name || "Supriya"}
              </Typography>
              <Typography fontSize="0.8rem">
                {user?.occupation || "Administrator"}
              </Typography>
            </Box>

            <SettingsOutlined />
          </FlexBetween>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
