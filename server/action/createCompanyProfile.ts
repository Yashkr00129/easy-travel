'use server';
import connectDb from '@/server/db/connectDB';
import Company, { ICompany } from '@/server/models/Company';

const createCompanyProfile: (data: ICompany) => Promise<ICompany | null> = async(
  data: ICompany
) => {
  try {
    await connectDb();

    const company = await Company.create({
      ...data,
    });

    return company;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default createCompanyProfile;
