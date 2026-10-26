import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useToken } from "../Context/TokenContext";

export default function AppProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token]);

  return <>{children}</>;
}
