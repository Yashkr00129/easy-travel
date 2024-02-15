import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
		required: true,
	},
	conpanyId: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["Admin", "Manager", "Guide", "Customer"],
	},
	profileImage: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	priorityLevel: {
		type: Number,
		required: true,
		min: 1,
		max: 10,
	},	
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
export default User;

// 