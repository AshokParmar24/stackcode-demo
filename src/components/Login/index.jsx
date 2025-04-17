// src/components/Login.js

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { userlsit } from "../../utils/contants";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const onsubmit = () => {
    const isAilavableUser = userlsit.find(
      (v) => v.email === data.email && v.password === data.password
    );
    console.log("isAilavableUser :>> ", isAilavableUser);
    if (isAilavableUser) {
      localStorage.setItem("token", "trueuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
      setError(false);
      navigate("/admin/dashboard");
    } else {
      setError(true);
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
          width: "600px", // ✅ Fix: removed typo [600px
          height: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          required
          label="Email"
          variant="filled"
          value={data.email}
          fullWidth
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <TextField
          required
          label="Password"
          type="text"
          variant="filled"
          value={data.password}
          fullWidth
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button
          onClick={onsubmit}
          fullWidth
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        {error && (
          <Typography color="error" sx={{ fontSize: "12px" }}>
            Email or password is incorrect
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
