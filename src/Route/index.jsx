// src/routes/AppRouter.js

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../components/Login/index";
import HomePage from "../components/CartList/index";
import GoodPage from "../components/Good";
import Authorization from "../Authentication";
import SingInPage from "../components/Singin/index"

export const AppRouter = () => {
  const isLogin = () => {
    return !!localStorage.getItem("token");
  };
  
  return (
    <Router>
      <Routes>
        {/* Protected Routes inside Authorization wrapper */}
        <Route element={<Authorization />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<GoodPage />} />
          <Route path="/singin" element={<SingInPage />} />

        </Route>
        <Route path="/" element={<LoginPage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to={isLogin() ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
};
