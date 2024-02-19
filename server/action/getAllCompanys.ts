'use server';
import connectDb from '@/server/db/connectDB';
import Company, { ICompany } from '@/server/models/Company';

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
