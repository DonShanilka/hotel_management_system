import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Hotel as RoomIcon,
  Book as ReservationIcon,
  Payment as BillingIcon,
  People as GuestIcon,
  CleaningServices as HousekeepingIcon,
  Analytics as ReportingIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Hotel Management
        </Typography>
      </Toolbar>
      <List>
        {/* Dashboard */}
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Room Management */}
        <ListItem button component={Link} to="/room-management">
          <ListItemIcon>
            <RoomIcon />
          </ListItemIcon>
          <ListItemText primary="Room Management" />
        </ListItem>

        {/* Reservation and Booking */}
        <ListItem button component={Link} to="/reservation">
          <ListItemIcon>
            <ReservationIcon />
          </ListItemIcon>
          <ListItemText primary="Reservation" />
        </ListItem>

        {/* Billing and Payments */}
        <ListItem button component={Link} to="/billing">
          <ListItemIcon>
            <BillingIcon />
          </ListItemIcon>
          <ListItemText primary="Billing" />
        </ListItem>

        {/* Guest Management */}
        <ListItem button component={Link} to="/guest-management">
          <ListItemIcon>
            <GuestIcon />
          </ListItemIcon>
          <ListItemText primary="Guest Management" />
        </ListItem>

        {/* Housekeeping and Maintenance */}
        <ListItem button component={Link} to="/housekeeping">
          <ListItemIcon>
            <HousekeepingIcon />
          </ListItemIcon>
          <ListItemText primary="Housekeeping" />
        </ListItem>

        {/* Reporting and Analytics */}
        <ListItem button component={Link} to="/reporting">
          <ListItemIcon>
            <ReportingIcon />
          </ListItemIcon>
          <ListItemText primary="Reporting" />
        </ListItem>

        {/* Notifications and Alerts */}
        <ListItem button component={Link} to="/notifications">
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;