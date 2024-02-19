"use server";
import connectDb from "@/server/db/connectDB";
import User, { IUser } from "@/server/models/User";

const createProfile = async (data: IUser) => {
	try {
		await connectDb();

		const existingUser = await User.findOne({ email: data.email });

		if (existingUser) {
			return {
				msg: "User already exists",
				status: "fail",
			};
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

export default createProfile;
