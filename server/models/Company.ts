import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
		address: { type: String, required: true },
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

const Company = mongoose.model("Company", companySchema);
export default Company;
