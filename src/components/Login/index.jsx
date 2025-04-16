import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { userlsit } from "../../utils/contants";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const navigate=useNavigate()
  const onsubmit = () => {
    const isAilavableUser = userlsit.find((v) => v.email === data.email);
    console.log("isAilavableUser", isAilavableUser);
    if (isAilavableUser && isAilavableUser.password == data.password) {
      localStorage.setItem("token", true);
      
      setError(false);
      navigate("/home")
    } else {
      setError(true);
      localStorage.setItem("token", false);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <Box
        sx={{
          width: "[600px",
          height: "400px",
          color: "red",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          required
          label="email"
          variant="filled"
          value={data.email}
          fullWidth
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <TextField
          required
          label="Password"
          variant="filled"
          value={data.password}
          fullWidth
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
          sx={{ marginTop: "10px" }}
        />

        <Button sx={{ marginTop: "10px" }} onClick={onsubmit} fullWidth>
          {" "}
          Submit
        </Button>
        {error && (
          <Typography color="red" sx={{ fontSize: "12px" }}>
            email and password is wrong
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
