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
import { useRouter } from "next/navigation";
import { ITrip, IUser } from "@/types";
import { Scrollbar } from "@/app/components/Scrollbar";
import { getInitials } from "@/app/utils/getInitials";
import { useEffect, useState, useMemo, useCallback } from "react";
import { applyPagination } from "@/app/utils/applyPagination";
import { useSelection } from "@/app/hooks/useSelection";
import getAllTrip from "@/server/action/getAllTrip";

const usePaginatedAccounts = (
  data: ITrip[],
  page: number,
  rowsPerPage: number
) => {
  return useMemo((): ITrip[] => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data]);
};

export const TripsTable = () => {
  const router = useRouter();
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginatedTrips = useMemo(() => {
    return applyPagination<ITrip>(trips, page, rowsPerPage);
  }, [page, rowsPerPage, trips]);

  const tripIds = useMemo(() => {
    return trips.map((trip) => trip._id) as string[];
  }, [trips]);

  const tripsSelection = useSelection(tripIds);

  useEffect(() => {
    const loadTrips = async () => {
      const trips = await getAllTrip();
      if (trips) setTrips(trips);
    };
    loadTrips();
  }, []);

  const handlePageChange = useCallback((event: any, page: number) => {
    setPage(page);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target?.value);
  }, []);

  const selected = tripsSelection.selected;
  const selectedSome = selected.length > 0 && selected.length < trips.length;
  const selectedAll = trips.length > 0 && selected.length === trips.length;

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
                        tripsSelection.handleSelectAll();
                      } else {
                        tripsSelection.handleDeselectAll();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Trip Duration</TableCell>
                <TableCell>Upcoming Dates</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTrips.map((trip) => {
                const isSelected = selected.includes(trip._id as string);
                console.log(isSelected);
                return (
                  <TableRow
                    hover
                    key={trip._id}
                    selected={isSelected}
                    onClick={() => router.push(`/users/${trip._id}`)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            tripsSelection.handleSelectOne(trip._id as string);
                          } else {
                            tripsSelection.handleDeselectOne(
                              trip._id as string
                            );
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{trip.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{trip.description}</TableCell>
                    <TableCell>{trip.tripDuration}</TableCell>
                    <TableCell>{trip.upcomingDates.toString()}</TableCell>
                    <TableCell>{trip.status}</TableCell>
                    <TableCell>{trip.cost}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={trips.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
