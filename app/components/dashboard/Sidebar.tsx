import NextLink from "next/link";
import { usePathname } from "next/navigation";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
	Box,
	Button,
	Divider,
	Drawer,
	Stack,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { Logo } from "../Logo";
import { Scrollbar } from "../Scrollbar";
import { items } from "@/app/config/sidebarListItems";
import { SideNavItem } from "./SideNavItem";

type PropTypes = {
	open: boolean;
	onClose: () => unknown;
};

export const Sidebar = (props: PropTypes) => {
	const { open, onClose } = props;
	const pathname = usePathname();
	// @ts-ignore
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

	const content = (
		<Scrollbar
			sx={{
				"height": "100%",
				"& .simplebar-content": {
					height: "100%",
				},
				"& .simplebar-scrollbar:before": {
					background: "neutral.400",
				},
			}}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "100%",
				}}>
				<Stack
					sx={{ p: 3, textDecoration: "none", color: "white" }}
					alignItems="center"
					direction="row"
					gap="1rem"
					component={NextLink}
					href="/">
					<Box
						sx={{
							display: "inline-flex",
							height: 32,
							width: 32,
						}}>
						<Logo />
					</Box>
					<Typography variant="h5">EasyTravel</Typography>
				</Stack>
				<Divider sx={{ borderColor: "neutral.700" }} />
				<Box
					component="nav"
					sx={{
						flexGrow: 1,
						px: 2,
						py: 3,
					}}>
					<Stack
						component="ul"
						spacing={0.5}
						sx={{
							listStyle: "none",
							p: 0,
							m: 0,
						}}>
						{items.map((item) => {
							const active = item.path ? pathname === item.path : false;

							return (
								<SideNavItem
									active={active}
									disabled={item.disabled}
									external={item.external}
									icon={item.icon}
									key={item.title}
									path={item.path}
									title={item.title}
								/>
							);
						})}
					</Stack>
				</Box>
				<Divider sx={{ borderColor: "neutral.700" }} />
				<Box
					sx={{
						px: 2,
						py: 3,
					}}></Box>
			</Box>
		</Scrollbar>
	);

	if (lgUp) {
		return (
			<Drawer
				anchor="left"
				open
				PaperProps={{
					sx: {
						backgroundColor: "neutral.800",
						color: "common.white",
						width: 280,
					},
				}}
				variant="permanent">
				{content}
			</Drawer>
		);
	}

	return (
		<Drawer
			anchor="left"
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					backgroundColor: "neutral.800",
					color: "common.white",
					width: 280,
				},
			}}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			variant="temporary">
			{content}
		</Drawer>
	);
};
