import connectDb from '@/server/db/connectDB';
import User from '@/server/models/User';
import { NextResponse, NextRequest } from 'next/server';

connectDb();

export const POST = async (req: NextRequest) => {
  try {
    const { name, dateOfBirth, email, phone, address } = await req.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        msg: 'User already exists',
        status: 'fail',
      });
    }

    const user = await User.create({
      name,
      dateOfBirth,
      email,
      phone,
      address,
    });

    return NextResponse.json({
      user,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
			error: 'Internal Server Error',
			status:"fail"
    });
  }
};
