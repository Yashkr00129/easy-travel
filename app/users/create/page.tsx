"use client";
import { useUser } from "@clerk/nextjs";
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
	Grid,
	Divider,
} from "@mui/material";
import axios from "axios";
import createProfile from "@/server/action/createProfile";
import { IRole } from "@/server/models/User";

export default function CreateProfile() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		dateOfBirth: "",
		phone: "",
		email: "",
		address: "",
		companyId: "",
		role: "Admin",
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
			const payload = {
				...formData,
				dateOfBirth: new Date(formData.dateOfBirth),
				role: formData.role as IRole,
			};

			const user = await createProfile(payload);

			if (user) return router.push("/users");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SidebarLayout>
			<Grid
				container
				spacing={2}>
				<Grid
					item
					xs={12}>
					<Stack
						component="div"
						direction="row"
						sx={{ width: "100%" }}
						justifyContent="space-between">
						<Typography
							variant="h4"
							color="primary">
							Create User
						</Typography>
						<Button variant="outlined" onClick={()=>router.push('/users')}>Go Back</Button>
					</Stack>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}>
					<TextField
						label="Name"
						name="name"
						autoComplete="name"
						onChange={handleChange}
						fullWidth
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}>
					<TextField
						label="Date Of Birth"
						name="dateOfBirth"
						type="date"
						autoComplete="dateOfBirth"
						fullWidth
						onChange={handleChange}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}>
					{" "}
					<TextField
						label="Email"
						name="email"
						autoComplete="email"
						fullWidth
						onChange={handleChange}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}>
					<TextField
						label="Phone"
						name="phone"
						autoComplete="Phone"
						fullWidth
						onChange={handleChange}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}>
					<TextField
						label="Address"
						name="address"
						autoComplete="address"
						fullWidth
						onChange={handleChange}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}>
					<TextField
						label="CompanyId"
						name="companyId"
						autoComplete="CompanyId"
						fullWidth
						onChange={handleChange}
					/>
				</Grid>
				<Grid
					item
					xs={12}>
					<Typography
						variant="h6"
						color="primary">
						Assign Privillages
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}>
					{" "}
					<FormControl fullWidth>
						<InputLabel id="priorityLevel">Priority Level</InputLabel>
						<Select
							labelId="priorityLevel"
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
				</Grid>
				<Grid
					item
					xs={12}
					md={6}>
					<FormControl fullWidth>
						<InputLabel id="role">Role</InputLabel>
						<Select
							labelId="role"
							name="role"
							defaultValue="Customer"
							onChange={handleChange}>
							<MenuItem value={"Admin"}>Admin</MenuItem>
							<MenuItem value={"Manager"}>Manager</MenuItem>
							<MenuItem value={"Guide"}>Guide</MenuItem>
							<MenuItem value={"Customer"}>Customer</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Button
				onClick={() => onSubmit()}
				variant="contained"
				sx={{ mt: 2 }}>
				Submit
			</Button>
		</SidebarLayout>
	);
}