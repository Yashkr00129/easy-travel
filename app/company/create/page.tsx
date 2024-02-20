"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarLayout } from "@/app/components/dashboard/Layout";
import {
	TextField,
	Button,
	Stack,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	SelectChangeEvent,
} from "@mui/material";
import createCompanyProfile from "@/server/action/createCompanyProfile";

export default function CreateCompanyPage() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		address: "",
		priorityLevel: 0,
	});

	const handleChange = (e: any) => {
		setFormData({
			...formData,
			[e?.target?.name]: e?.target?.value,
		});
	};

	const onSubmit = async () => {
		try {
			await createCompanyProfile(formData);
			return router.push("/company");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SidebarLayout>
			<Stack
				spacing={2}
				justifyContent={"center"}
				alignItems={"center"}>
				<Stack
					spacing={2}
					sx={{ width: "60%" }}>
					<Typography
						variant="h4"
						color="primary">
						CREATE COMPANY
					</Typography>
					<TextField
						label="Name"
						name="name"
						autoComplete="name"
						sx={{ marginTop: "2rem" }}
						onChange={handleChange}
					/>
					<TextField
						label="Phone"
						name="phone"
						autoComplete="Phone"
						onChange={handleChange}
					/>
					<TextField
						label="Address"
						name="address"
						autoComplete="address"
						onChange={handleChange}
					/>
					<FormControl fullWidth>
						<InputLabel id="priorityLevel">Priority Level</InputLabel>
						<Select
							label="Priority Level"
							name="priorityLevel"
							onChange={handleChange}>
							<MenuItem value={1}>One</MenuItem>
							<MenuItem value={2}>Two</MenuItem>
							<MenuItem value={3}>Three</MenuItem>
							<MenuItem value={4}>Four</MenuItem>
							<MenuItem value={5}>Five</MenuItem>
							<MenuItem value={6}>Six</MenuItem>
							<MenuItem value={7}>Seven</MenuItem>
							<MenuItem value={8}>Eight</MenuItem>
							<MenuItem value={9}>Nine</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
						</Select>
					</FormControl>
					<Button
						variant="contained"
						onClick={() => onSubmit()}>
						Submit
					</Button>
				</Stack>
			</Stack>
		</SidebarLayout>
	);
}
