"use server";
import connectDb from "@/server/db/connectDB";
import User from "@/server/models/User";
import { IUser } from "@/types";

const getUserById = async (id: string) => {
	try {
		await connectDb();
		const user = await User.findById(id).populate("company");

		return user as IUser;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default getUserById;
