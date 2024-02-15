import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
export default Itinerary;
