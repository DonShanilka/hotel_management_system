import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

// Define the Room type
type Room = {
  roomNumber: string;
  roomType: string;
  price: number;
  status: string;
};

const RoomManagement: React.FC = () => {
  // State for form inputs
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [roomType, setRoomType] = useState<string>('Single');
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<string>('Available');

  // State to store the list of rooms
  const [rooms, setRooms] = useState<Room[]>([]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new room object
    const newRoom: Room = {
      roomNumber,
      roomType,
      price,
      status,
    };

    // Add the new room to the list
    setRooms([...rooms, newRoom]);

    // Clear the form fields
    setRoomNumber('');
    setRoomType('Single');
    setPrice(0);
    setStatus('Available');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Room Management
      </Typography>

      {/* Room Input Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Room Type"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Double">Double</MenuItem>
              <MenuItem value="Suite">Suite</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Booked">Booked</MenuItem>
              <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Room
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Display Rooms in Cards */}
      <Grid container spacing={3}>
        {rooms.map((room, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Room {room.roomNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Type:</strong> {room.roomType}
                </Typography>
                <Typography variant="body1">
                  <strong>Price:</strong> ${room.price}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {room.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoomManagement;