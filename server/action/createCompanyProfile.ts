'use server';
import connectDb from '@/server/db/connectDB';
import Company from "@/server/models/Company";
import { ICompany, ICreateCompany } from "@/types";

const createCompanyProfile = async (data: ICreateCompany) => {
	try {
		await connectDb();

		const company = await Company.create({
			...data,
		});

		return company as ICompany;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default createCompanyProfile;
