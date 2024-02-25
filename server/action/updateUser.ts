"use server";
import connectDb from "@/server/db/connectDB";
import User from "@/server/models/User";
import { ICreateUser, IUser } from "@/types";

const updateUser = async (id: string, payload: ICreateUser | IUser) => {
	try {
		await connectDb();

		const user = await User.findByIdAndUpdate(id, payload);

		return user as IUser;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default updateUser;
