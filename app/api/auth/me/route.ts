import User from '@/server/models/User';
import connectDb from '@/server/db/connectDB';
import { NextResponse, NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs';

connectDb();

export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    const currentUserEmailId = user?.emailAddresses[0].emailAddress;

    const dbUser = await User.findOne({ email: currentUserEmailId });
    if (!dbUser)
      return NextResponse.json({
        msg: 'User not found',
        status: 'fail',
      });
    return NextResponse.json({
      user: dbUser,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: 'Internal Server Error',
    });
  }
};
