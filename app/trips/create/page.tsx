"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarLayout } from "@/app/components/dashboard/Layout";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import createUser from "@/server/action/createUser";
import { ICreateTrip, IItinerary } from "@/types";
import createTrip from "@/server/action/createTrip";

export default function CreateTrip() {
  const router = useRouter();

  const [formData, setFormData] = useState<ICreateTrip>({
    name: "",
    description: "",
    tripDuration: 0,
    upcomingDates: [],
    itenerary: [],
    cost: 0,
  });
  const [itineraries, setItineraries] = useState<IItinerary[]>([]);

  const onItinerarySubmit = (itinerary: IItinerary) => {
    setItineraries([...itineraries, itinerary]);
  };

  const handleChange = (e: any) => {
    if (e.target.name === "upcomingDate")
      setFormData({
        ...formData,
        upcomingDates: [...formData.upcomingDates, new Date(e.target.value)],
      });

    setFormData({
      ...formData,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const onSubmit = async () => {
    try {
      const trip = await createTrip(formData);

      if (trip) return router.push("/users");
    } catch (error) {
      console.log(error);
    }
  };

  const Itinerary = () => {
    const [itineraryData, setItineraryData] = useState<IItinerary>({
      name: "",
      description: "",
    });

    const handleChange = (e: any) => {
      setItineraryData({
        ...itineraryData,
        [e?.target?.name]: e?.target?.value,
      });
    };

    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box>
            <TextField
              label="Name"
              name="name"
              autoComplete="name"
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <TextField
              label="Description"
              name="description"
              autoComplete="description"
              fullWidth
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={() => onItinerarySubmit(itineraryData)}
            variant="contained"
            sx={{ width: "100%" }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <SidebarLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            component="div"
            direction="row"
            sx={{ width: "100%" }}
            justifyContent="space-between"
          >
            <Typography variant="h4" color="primary">
              Create Trip
            </Typography>
            <Button variant="outlined" onClick={() => router.push("/trips")}>
              Go Back
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            name="name"
            autoComplete="name"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Description"
            name="description"
            autoComplete="description"
            fullWidth
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            label="TripDuration"
            name="tripDuration"
            autoComplete="tripDuration"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Upcoming Date"
            name="upcomingDates"
            type="date"
            autoComplete="upcomingDates"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            label="Cost"
            name="cost"
            autoComplete="cost"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Itinerary />
          {itineraries.map((itinerary, i) => (
            <DisplayItinerary key={i} itinerary={itinerary} />
          ))}
        </Grid>
      </Grid>
      <Button onClick={() => onSubmit()} variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </SidebarLayout>
  );
}

const DisplayItinerary = ({ itinerary }: { itinerary: IItinerary }) => {
  function onSubmit() {}
  return (
    <Paper elevation={4} sx={{ mt: 4, width: "100%" }}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" color="primary">
            {itinerary.name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" color="primary">
            {itinerary.name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained">Delete</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
