import mongoose from "mongoose";
import { IUser } from "@/types";

const userSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
			min: 3,
			max: 30,
		},
		dateOfBirth: {
			type: Date,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company",
		},
		role: {
			type: String,
			enum: ["Admin", "Manager", "Guide", "Customer"],
			default: "Admin",
		},
		profileImage: {
			type: String,
		},
		address: {
			type: String,
		},
		priorityLevel: {
			type: Number,
			min: 1,
			max: 10,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
