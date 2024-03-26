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

  const handleDeleteItinerary = (index: number) => {
    // Create a new array without the deleted itinerary
    const updatedItineraries = [...itineraries];
    updatedItineraries.splice(index, 1); // Remove the itinerary at the specified index
    setItineraries(updatedItineraries); // Update the state
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
      <Typography variant="h6" color="primary" sx={{ mt: 2, mb: 1 }}>
        Itineraries
      </Typography>
      {itineraries.map((itinerary, i) => (
        <DisplayItinerary
          key={i}
          keyProp={i}
          itinerary={itinerary}
          onDelete={() => handleDeleteItinerary(i)}
        />
      ))}
      <Itinerary onItinerarySubmit={onItinerarySubmit} />

      <Button onClick={() => onSubmit()} variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </SidebarLayout>
  );
}

const DisplayItinerary = ({
  itinerary,
  keyProp,
  onDelete,
}: {
  itinerary: IItinerary;
  keyProp: number;
  onDelete: () => void;
}) => {
  return (
    <Paper elevation={4} sx={{ mb: 2, width: "100%", p: 2 }}>
      <Stack spacing={1}>
        <Grid
          sx={{ width: "100%" }}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" sx={{ textDecoration: "underline" }}>
              Itinerary {keyProp + 1}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={onDelete}>
              Delete
            </Button>
          </Grid>
        </Grid>
        <Stack direction={"row"}>
          <Typography variant="h5" color="primary">
            Name:
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {itinerary.name}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <Typography variant="h5" color="primary">
            Description:
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {itinerary.description}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

const Itinerary = ({
  onItinerarySubmit,
}: {
  onItinerarySubmit: (itinerary: IItinerary) => void;
}) => {
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
          sx={{ width: "100%", height: "100%" }}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};
