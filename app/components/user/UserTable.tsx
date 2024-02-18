import { format } from "date-fns";
import {
	Box,
	Card,
	Checkbox,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import { IUser } from "@/server/models/User";
import { Scrollbar } from "@/app/components/Scrollbar";
import { getInitials } from "@/app/utils/getInitials";
import getAllUser from "@/server/action/getAllUser";
import { useEffect, useState, useMemo, useCallback } from "react";
import { applyPagination } from "@/app/utils/applyPagination";
import { useSelection } from "@/app/hooks/useSelection";

const usePaginatedAccounts = (
	data: IUser[],
	page: number,
	rowsPerPage: number
) => {
	return useMemo((): IUser[] => {
		return applyPagination(data, page, rowsPerPage);
	}, [page, rowsPerPage, data]);
};

const useUserIds = (users: IUser[]): string[] => {
	return useMemo((): string[] => {
		return users.map((user) => user._id as string);
	}, [users]);
};

export const UsersTable = () => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const paginatedUsers = usePaginatedAccounts(users, page, rowsPerPage);
	const usersIds = useUserIds(paginatedUsers);
	const usersSelection = useSelection(usersIds);

	useEffect(() => {
		const loadUsers = async () => {
			const users = await getAllUser();
			if (users) setUsers(users);
		};
		loadUsers();
	}, []);

	const handlePageChange = useCallback((event: any, page: number) => {
		setPage(page);
	}, []);

	const handleRowsPerPageChange = useCallback((event: any) => {
		setRowsPerPage(event.target?.value);
	}, []);

	const selected = usersSelection.selected;
	const selectedSome = selected.length > 0 && selected.length < users.length;
	const selectedAll = users.length > 0 && selected.length === users.length;

	return (
		<Card>
			<Scrollbar>
				<Box sx={{ minWidth: 800 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										checked={selectedAll}
										indeterminate={selectedSome}
										onChange={(event) => {
											if (event.target.checked) {
												usersSelection.handleSelectAll();
											} else {
												usersSelection.handleDeselectAll();
											}
										}}
									/>
								</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Date Of Birth</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>Role</TableCell>
								<TableCell>Company Id</TableCell>
								<TableCell>Priority Level</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{paginatedUsers.map((user) => {
								const isSelected = selected.includes(user._id as string);
								return (
									<TableRow
										hover
										key={user._id}
										selected={isSelected}>
										<TableCell padding="checkbox">
											<Checkbox
												checked={isSelected}
												onChange={(event) => {
													if (event.target.checked) {
														usersSelection.handleSelectOne(user._id as string);
													} else {
														usersSelection.handleDeselectOne(
															user._id as string
														);
													}
												}}
											/>
										</TableCell>
										<TableCell>
											<Stack
												alignItems="center"
												direction="row"
												spacing={2}>
												<Typography variant="subtitle2">{user.name}</Typography>
											</Stack>
										</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>
											{new Date(user.dateOfBirth).toDateString()}
										</TableCell>
										<TableCell>{user.phone}</TableCell>
										<TableCell>{user.role}</TableCell>
										<TableCell>{user.companyId}</TableCell>
										<TableCell>{user.priorityLevel}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Box>
			</Scrollbar>
			<TablePagination
				component="div"
				count={users.length}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};
