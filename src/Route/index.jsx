// src/routes/AppRouter.js

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../components/Login";
import HomePage from "../components/cartList";

export const AppRouter = () => {
  const isLogin = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};
