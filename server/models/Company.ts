import mongoose from "mongoose";
import { ICompany } from "@/types";

const companySchema = new mongoose.Schema<ICompany>(
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

const Company =
	mongoose.models.Company || mongoose.model("Company", companySchema);
export default Company;
