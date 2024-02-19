import { SignIn } from "@clerk/nextjs";
import { Typography, Box } from "@mui/material";

export default function Page() {
	return (
		<Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
			<SignIn />;
		</Box>
	);
}
