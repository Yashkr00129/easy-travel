"use server";
import connectDb from "@/server/db/connectDB";
import User from "@/server/models/User";
import { ICreateUser, IUser } from "@/types";

const createUser = async (data: ICreateUser) => {
	try {
		await connectDb();

		const existingUser = await User.findOne({ email: data.email });

		if (existingUser) {
			return null;
		}

		const user = await User.create({
			...data,
		});

		return user as IUser;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default createUser;
