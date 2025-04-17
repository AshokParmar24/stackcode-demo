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
import { useId } from "react";
import { Tune } from "@mui/icons-material";

const GoodPage = () => {
  const [original, setOriginal] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editUse, setEdituser] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    role: false,
  });
  const [isEdite, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");
  const id = useId();

  const handleClickOpen = (item) => {
    console.log("item :>> ", item);
    setEdituser(item);
    setOpen(true);
    setIsEdit(true)
  };
  const handleClose = () => {
    console.log("editUse :>> ", editUse);
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ;
    };

    const newError = {
      name: !editUse.name.trim(),
      email: !editUse.email.trim() && isValidEmail(),
      role: !editUse.role, // No need for trim() since it's a number
    };

    setError(newError);

    // Check if any errors exist
    const hasErrors = Object.values(newError).includes(true);
    if (!hasErrors) {
      if (isEdite) {
        const dataUpdate = data.map((v) => {
          return v.id === editUse.id ? editUse : v;
        });
        console.log("dataUpdate", dataUpdate);
        setData(dataUpdate);
        setOriginal(dataUpdate);

        setOpen(false);
        setEdituser({ id: null, name: "", email: "", role: "" });
      } else {
        const addData = [...data, { ...editUse, id: id }];
        setData(addData);
        setOpen(false);
        setOriginal(addData);
        setEdituser({ id: null, name: "", email: "", role: "" });
        console.log(data, original,addData);

      }
    }
    console.log("error :>> ", error);
    setIsEdit(false)
  };

  useEffect(() => {
    setData(userlsit);
    setOriginal(userlsit);
  }, [userlsit]);

  return (
    <Box padding={5}>
      <Box>
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
                  item.email
                    .toLowerCase()
                    .includes(e.target.value?.toLowerCase())
              );
              setData(filteredUsers);
            } else {
              setData(original);
            }
          }}
        />
        <Button
          onClick={() => {
            setOpen(true);
            setIsEdit(false);
          }}
        >
          Add User
        </Button>
      </Box>

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
        onClose={() => {
          setEdituser({ id: null, name: "", email: "", role: "" });
          setOpen(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {isEdite ? "Edit User Details" : "Create User"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setEdituser({ id: null, name: "", email: "", role: "" });
            setOpen(false);
          }}
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
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
              {error.name ? (
                <Typography sx={{ fontSize: "12px", color: "red" }}>
                  please enter name
                </Typography>
              ) : (
                ""
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                required
                type="email"
                label="Email"
                variant="filled"
                value={editUse?.email}
                fullWidth
                onChange={(e) => {
                  setEdituser({ ...editUse, email: e.target.value });
                }}
              />
              {error.email ? (
                <Typography sx={{ fontSize: "12px", color: "red" }}>
                  please enter email
                </Typography>
              ) : (
                ""
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
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
              {error.role ? (
                <Typography sx={{ fontSize: "12px", color: "red" }}>
                  please enter role
                </Typography>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GoodPage;
