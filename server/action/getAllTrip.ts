"use server";
import connectDb from "@/server/db/connectDB";
import User from "@/server/models/User";
import { ITrip } from "@/types";
import Trip from "../models/Trip";

const getAllTrip = async () => {
  try {
    await connectDb();
    const trips = await Trip.find();
    // const trip = Trip.create({
    //   name: "My Trip",
    //   description: "Trip Description",
    //   tripLength: 1000,
    //   status: "complete",
    //   cost: 10000,
    // });
    return trips as ITrip[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

// When creating a trip.
// We will create an array of iternaries, in the frontend.
// We will send that array in teh backend
// The backend will then create those itenaries in teh database
// And the id's of those itineraries will be in the trip

export default getAllTrip;
