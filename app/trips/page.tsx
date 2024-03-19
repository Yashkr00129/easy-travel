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
import { SearchBox } from "../components/SearchBox";
import { TripsTable } from "../components/trip/TripTable";

export default function Trips() {
  const router = useRouter();
  return (
    <>
      <SidebarLayout>
        <Head>
          <title>Trips</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Typography variant="h4">Trips</Typography>
                <div>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={() => router.push("/trips/create")}
                  >
                    Add
                  </Button>
                </div>
              </Stack>
              <SearchBox placeholder="Search Trips" />
              <TripsTable />
            </Stack>
          </Container>
        </Box>
      </SidebarLayout>
    </>
  );
}
