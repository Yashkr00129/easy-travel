import { useRouter } from "next/navigation";
import {
	Box,
	Divider,
	MenuItem,
	MenuList,
	Popover,
	Typography,
} from "@mui/material";

type PropTypes = {
	anchorEl: Element | null;
	onClose: () => unknown;
	open: boolean;
};

export const AccountPopover = (props: PropTypes) => {
	const { anchorEl, onClose, open } = props;
	const router = useRouter();

	return (
		<>
			<Popover
				anchorEl={anchorEl}
				anchorOrigin={{
					horizontal: "left",
					vertical: "bottom",
				}}
				onClose={onClose}
				open={open}
				PaperProps={{ sx: { width: 200 } }}>
				<Box
					sx={{
						py: 1.5,
						px: 2,
					}}>
					<Typography variant="overline">Account</Typography>
					<Typography
						color="text.secondary"
						variant="body2">
						Anika Visser
					</Typography>
				</Box>
				<Divider />
				<MenuList
					disablePadding
					dense
					sx={{
						"p": "8px",
						"& > *": {
							borderRadius: 1,
						},
					}}>
					<MenuItem>Sign out</MenuItem>
				</MenuList>
			</Popover>
		</>
	);
};
