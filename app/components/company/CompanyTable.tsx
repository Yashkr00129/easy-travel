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
} from '@mui/material';
import { ICompany } from '@/server/models/Company';
import { Scrollbar } from '@/app/components/Scrollbar';
import { getInitials } from '@/app/utils/getInitials';
import getAllCompanys from '@/server/action/getAllCompanys';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { applyPagination } from '@/app/utils/applyPagination';
import { useSelection } from '@/app/hooks/useSelection';

export const CompanysTable = () => {
  const [companys, setCompanys] = useState<ICompany[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginatedCompanys = useMemo(() => {
    return applyPagination<ICompany>(companys, page, rowsPerPage);
  }, [page, rowsPerPage, companys]);

  const companysIds = useMemo(() => {
    return paginatedCompanys.map((company) => company._id);
  }, [companys]) as string[];

  const companysSelection = useSelection(companysIds);

  useEffect(() => {
    const loadCompanys = async () => {
      const companys = await getAllCompanys();
      if (companys) setCompanys(companys);
    };
    loadCompanys();
  }, []);

  const handlePageChange = useCallback((event: any, page: number) => {
    setPage(page);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(parseInt(event.target?.value, 10));
    setPage(0);
  }, []);

  const selected = companysSelection.selected;
  const selectedSome = selected.length > 0 && selected.length < companys.length;
  const selectedAll = selected.length === companys.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        companysSelection.handleSelectAll();
                      } else {
                        companysSelection.handleDeselectAll();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Priority Level</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCompanys.map((company) => {
                const isSelected = selected.includes(company._id as string);
                return (
                  <TableRow hover key={company._id} selected={isSelected}>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            companysSelection.handleSelectOne(
                              company._id as string
                            );
                          } else {
                            companysSelection.handleDeselectOne(
                              company._id as string
                            );
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {company.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>{company.address}</TableCell>
                    <TableCell>{company.priorityLevel}</TableCell>
                    <TableCell>
                      {new Date(company.createdAt as Date).toDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component='div'
        count={companys.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
