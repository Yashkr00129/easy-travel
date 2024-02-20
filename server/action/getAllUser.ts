"use server";
import connectDb from "@/server/db/connectDB";
import User from "@/server/models/User";
import { IUser } from "@/types";

const getAllUser = async () => {
	try {
		await connectDb();
		const users = await User.find();

		return users as IUser[];
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default getAllUser;
