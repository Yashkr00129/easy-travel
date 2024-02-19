import mongoose from 'mongoose';

export type ICompany = {
  _id?: string;
  name: string;
  phone: string;
  address: string;
  priorityLevel: number;
  createdAt?: Date;
  updatedAt?: Date;
};

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
  mongoose.models.Company || mongoose.model('Company', companySchema);
export default Company;
