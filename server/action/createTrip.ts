"use server";
import connectDb from "@/server/db/connectDB";
import { ICreateTrip, ITrip, IUser } from "@/types";
import Trip from "../models/Trip";

const createTrip = async (data: ICreateTrip) => {
  try {
    await connectDb();

    const trip = await Trip.create(data);

    return trip as ITrip;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default createTrip;
