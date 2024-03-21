"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Grid,
  SvgIcon,
  Typography,
} from "@mui/material";
import { SidebarLayout } from "@/app/components/dashboard/Layout";
import { SearchBox } from "../components/SearchBox";
import { AccountingTable } from "../components/accounting/AccountingTable";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

export default function Accounting() {
  const router = useRouter();
  return (
    <>
      <SidebarLayout>
        <Head>
          <title>Accounting</title>
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
                <Typography variant="h4">Accounting</Typography>
                <div>
                  <FormDialog />
                </div>
              </Stack>

              <Grid
                container
                spacing={2}
                direction={"row"}
                justifyContent={"space-evenly"}
              >
                <Grid item xs={12} md={4}>
                  <Card sx={{ p: 2, width: "100%" }}>
                    <Stack alignItems={"flex-start"}>
                      <Typography variant="h4" color="primary">
                        Income
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: "500" }}>
                        00.00
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ p: 2, width: "100%" }}>
                    <Stack alignItems={"flex-start"}>
                      <Typography variant="h4" color="primary">
                        Expenses
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: "500" }}>
                        00.00
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ p: 2, width: "100%" }}>
                    <Stack alignItems={"flex-start"}>
                      <Typography variant="h4" color="primary">
                        Total
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: "500" }}>
                        00.00
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>

              <SearchBox placeholder="Search Transactions" />
              <AccountingTable />
            </Stack>
          </Container>
        </Box>
      </SidebarLayout>
    </>
  );
}

function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={
          <SvgIcon fontSize="small">
            <PlusIcon />
          </SvgIcon>
        }
      >
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>Form description</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="category"
            name="category"
            label="Category"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="transactionItem"
            name="transactionItem"
            label="Transaction Item"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
