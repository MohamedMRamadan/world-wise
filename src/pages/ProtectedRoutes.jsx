import { useEffect } from "react";
import useAuth from "../context/FakeAuth";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { isAuthanticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthanticated) navigate("/");
  }, [navigate, isAuthanticated]);

  return isAuthanticated ? children : null;
}

export default ProtectedRoutes;
