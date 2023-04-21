import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EventIcon from "@mui/icons-material/Event";
import DatasetIcon from "@mui/icons-material/Dataset";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import WeeklyScreen from "./screens/WeeklyScreen";
import AllScreen from "./screens/AllScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { useSelector } from "react-redux";

const windowWidth = window.innerWidth;
const drawerWidth = windowWidth > 600 ? 240 : 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -(
      drawerWidth - (windowWidth > 600 ? (windowWidth - 600) / 2 : 0)
    ),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: (window.innerWidth - 600 - drawerWidth) / 2,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AppDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const uiSlice = useSelector((state) => state.ui);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlerSelect = (index) => {
    setOpen(false);
    setSelectedTab(index);
  };

  const tabsArr = [
    {
      name: "Weekly",
      component: <WeeklyScreen />,
      faName: "هفتگی",
      icon: <EventIcon />,
    },
    {
      name: "All",
      component: <AllScreen />,
      faName: "کل دیتا",
      icon: <DatasetIcon />,
    },
    {
      name: "Settings",
      component: <SettingsScreen />,
      faName: "تنظیمات",
      icon: <SettingsIcon />,
    },
  ];
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Work log
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {tabsArr.map((tab, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handlerSelect(index)}
                selected={selectedTab === index}
              >
                <ListItemIcon>{tab.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography style={{ fontFamily: "Vazirmatn" }}>
                      {uiSlice.language === "Fa" ? tab.faName : tab.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {tabsArr[selectedTab].component}
      </Main>
    </Box>
  );
};

export default AppDrawer;
