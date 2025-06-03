import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";
import { HEADER_HEIGHT } from "./HeaderBar";

const drawerWidth = 210;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position: 'relative',
        zIndex: 1100,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          border: 'none',
          marginTop: `${HEADER_HEIGHT}px`,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`
        },
      }}
    >
      <List>
        <ListItem disablePadding sx={{ px: 1, py: 0.5 }}>
          <ListItemButton
            component={Link}
            to="/"
            sx={{
              backgroundColor: location.pathname === "/" ? "#e6f4f9" : "transparent",
              borderTopRightRadius: location.pathname === "/" ? 8 : 0,
              borderBottomRightRadius: location.pathname === "/" ? 8 : 0,
              '&:hover': {
                backgroundColor: location.pathname === "/" ? "#e6f4f9" : "rgba(0, 0, 0, 0.04)",
              },
              margin: '4px 0',
              padding: '8px 18px',
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}><PeopleIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Audience Builder" primaryTypographyProps={{ fontSize: 14, color: "grey.700" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar; 