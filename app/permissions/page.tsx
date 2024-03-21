"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
	Box,
	Button,
	Container,
	Stack,
	SvgIcon,
	Typography,
} from "@mui/material";
import { SidebarLayout } from "@/app/components/dashboard/Layout";
import { UsersTable } from "@/app/components/user/UserTable";
import { SearchBox } from "../components/SearchBox";
import { PermissionsTable } from "../components/permissions/PermissionsTable";

const PermissionsPage = () => {
	const router = useRouter();
	return (
		<>
			<SidebarLayout>
				<Head>
					<title>Permission</title>
				</Head>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						py: 8,
					}}>
					<Container maxWidth="xl">
						<Stack spacing={3}>
							<Stack
								direction="row"
								justifyContent="space-between"
								spacing={4}>
								<Typography variant="h4">Permissions</Typography>
								<div>
									<Button
										startIcon={
											<SvgIcon fontSize="small">
												<PlusIcon />
											</SvgIcon>
										}
										variant="contained"
										onClick={() => router.push("/users/create")}>
										Add
									</Button>
								</div>
							</Stack>
							{/* <SearchBox placeholder="Search Users" /> */}
							<PermissionsTable />
						</Stack>
					</Container>
				</Box>
			</SidebarLayout>
		</>
	);
};

export default PermissionsPage;
