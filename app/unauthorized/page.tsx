"use client";
import { useAuth } from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

export default function Unauthorized() {
	const { signOut } = useAuth();

	useEffect(() => {
		signOut();
	});

	return (
		<Box>
			<Typography>
				You're not authorized to access the dashboard. In order to access the
				dashboard, access the admin, or <Link href="/sign-in">Sign In </Link>{" "}
				with a different account.
			</Typography>
		</Box>
	);
}
