import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const tripSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		tripLength: { type: Number, required: true },
		upcomingDates: { type: [Date], default: [] },
		status: { type: String, enum: ["pending", "complete"] },
		itenerary: { type: [ObjectId], ref: "Itinerary" },
		cost: { type: Number },
	},
	{
		timestamps: true,
	}
);

const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);

export default Trip;
