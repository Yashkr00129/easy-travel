import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
	try {
		// Do your work
		return NextResponse.json({
			user: "some user data",
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			error: "Something failed in the server",
		});
	}
};

export const POST = async (req: NextRequest) => {};
