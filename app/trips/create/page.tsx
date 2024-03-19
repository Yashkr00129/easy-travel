"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarLayout } from "@/app/components/dashboard/Layout";
import { TextField, Button, Stack, Typography, Grid } from "@mui/material";
import createUser from "@/server/action/createUser";
import { ICreateTrip } from "@/types";
import createTrip from "@/server/action/createTrip";

export default function CreateTrip() {
  const router = useRouter();

  const [formData, setFormData] = useState<ICreateTrip>({
    name: "",
    description: "",
    tripLength: 0,
    upcomingDates: [],
    itenerary: [],
    cost: 0,
  });

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
            label="TripLength"
            name="tripLength"
            autoComplete="tripLength"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Address"
            name="address"
            autoComplete="address"
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
        <Grid item xs={12}>
          <Typography variant="h6" color="primary">
            Create Itineraries
          </Typography>
        </Grid>
      </Grid>
      <Button onClick={() => onSubmit()} variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </SidebarLayout>
  );
}
