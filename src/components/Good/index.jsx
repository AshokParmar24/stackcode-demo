import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { userlsit } from "../../utils/contants";
import CloseIcon from "@mui/icons-material/Close";

const GoodPage = () => {
  const [original, setOriginal] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editUse, setEdituser] = useState(null);
  const [search, setSearch] = useState("");

  const handleClickOpen = (item) => {
    console.log("item :>> ", item);
    setEdituser(item);
    setOpen(true);
  };
  const handleClose = () => {
    const dataUpdate = data.map((v) => {
      return v.id === editUse.id ? editUse : v;
    });
    console.log("dataUpdate", dataUpdate);
    setData(dataUpdate);
    setOriginal(dataUpdate);

    setOpen(false);
  };

  useEffect(() => {
    setData(userlsit);
    setOriginal(userlsit);
  }, [userlsit]);

  return (
    <Box padding={5}>
      <TextField
        sx={{ paddingBottom: "20px" }}
        label="Search"
        value={search}
        fullWidth
        onChange={(e) => {
          setSearch(e.target.value);
          if (e.target.value.length > 0) {
            const filteredUsers = data.filter(
              (item) =>
                item.name
                  .toLowerCase()
                  .includes(e.target.value?.toLowerCase()) ||
                item.email.toLowerCase().includes(e.target.value?.toLowerCase())
            );
            setData(filteredUsers);
          } else {
            setData(original);
          }
        }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  {row.role == 1 ? "ADMIN" : "USER"}
                </TableCell>
                <TableCell align="right">
                  <Box>
                    <Button variant="text" onClick={() => handleClickOpen(row)}>
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => {
                        const editedData = data.filter((v) => {
                          console.log("v.id ", v.id, "row.id", row.id);
                          return v.id !== row.id;
                        });
                        console.log(editedData, "editedData");
                        setData(editedData);
                        setOriginal(editedData);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit User Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: "500px",
            }}
          >
            <TextField
              required
              label="name"
              variant="filled"
              value={editUse?.name}
              fullWidth
              onChange={(e) => {
                setEdituser({ ...editUse, name: e.target.value });
              }}
            />
            <TextField
              required
              label="Email"
              variant="filled"
              value={editUse?.email}
              fullWidth
              onChange={(e) => {
                setEdituser({ ...editUse, email: e.target.value });
              }}
            />

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={editUse?.role}
              label="Role"
              onChange={(e) => {
                setEdituser({ ...editUse, role: e.target.value });
              }}
            >
              <MenuItem value={1}>ADMIN</MenuItem>
              <MenuItem value={2}>USER</MenuItem>
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GoodPage;
