"use client";
import { useEffect, useState } from "react";
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
} from "@mui/material";
import createProfile from "@/server/action/createProfile";
import { ICompany, ICreateUser } from "@/types";
import getAllCompanys from "@/server/action/getAllCompanys";

export default function CreateUser() {
	const router = useRouter();
	const [companies, setCompanies] = useState<ICompany[]>([]);

	const [formData, setFormData] = useState<ICreateUser>({
		name: "",
		dateOfBirth: new Date(),
		phone: "",
		email: "",
		address: "",
		company: "",
		role: "Admin",
		priorityLevel: 0,
	});

	useEffect(() => {
		const loadCompanies = async () => {
			const companies = await getAllCompanys();
			if (companies === null) return;
			setCompanies(companies);
		};
		loadCompanies();
	}, []);

	const handleChange = (e: any) => {
		if (e.target.name === "dateOfBirth")
			setFormData({
				...formData,
				dateOfBirth: new Date(e.target.value),
			});

		setFormData({
			...formData,
			[e?.target?.name]: e?.target?.value,
		});
	};

	const onSubmit = async () => {
		try {
			const user = await createProfile(formData);

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
						<Button
							variant="outlined"
							onClick={() => router.push("/users")}>
							Go Back
						</Button>
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
					<FormControl fullWidth>
						<InputLabel id="company">Company</InputLabel>
						<Select
							labelId="company"
							name="company"
							onChange={handleChange}>
							{companies.map((company) => (
								<MenuItem value={company._id}>{company.name}</MenuItem>
							))}
						</Select>
					</FormControl>
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
