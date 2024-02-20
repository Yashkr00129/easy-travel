"use server";
import connectDb from "@/server/db/connectDB";
import Company from "@/server/models/Company";
import { ICompany } from "@/types";

const getAllCompanys = async () => {
	try {
		await connectDb();
		const companys = await Company.find();

		return companys as ICompany[];
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default getAllCompanys;
