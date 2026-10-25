import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "../Context/TokenContext";

export default function AuthProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return <>{children}</>;
}
