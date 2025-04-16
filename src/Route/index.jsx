import { BrowserRouter as Router, Route, Routes } from "react-router";
import LoginPage from "../components/Login";
import HomePage from "../components/cartList";
 
export const AppRouter = () => {
  const isLogin = localStorage.getItem("token");

  return (
    <>
      <Router>
        {isLogin ? (
          <Routes>
            <Route path="/home" element={<HomePage />} />
           </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage />} />
           </Routes>
        )}
        
      </Router>
    </>
  );
};
