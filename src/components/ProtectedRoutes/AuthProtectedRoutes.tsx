import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useToken } from "../Context/TokenContext";

export default function AuthProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return <>{children}</>;
}
