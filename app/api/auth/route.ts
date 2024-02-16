import connectDb from '@/app/utils/connectDB';
import User from '@/server/models/User';
import { NextResponse, NextRequest } from 'next/server';

connectDb();

export const POST = async (req: NextRequest) => {
	try {
		const { name, dateOfBirth, email } = await req.json();

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return NextResponse.json({
				msg: 'User already exists',
			});
		}

		const user = await User.create({
			name,
			dateOfBirth,
			email,
		});

		return NextResponse.json({
      user,
      status: 'success',
    });
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			error: 'Internal Server Error',
		});
	}
};
