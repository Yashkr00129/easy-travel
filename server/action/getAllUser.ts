'use server';
import connectDb from '@/server/db/connectDB';
import User, { IUser } from '@/server/models/User';

const getAllUser: () => Promise<IUser[]|null> = async () => {
  try {
    await connectDb();
    const users = await User.find();

    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getAllUser;
