import React, { createContext, useContext, useState } from "react";

type TokenContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const TokenContext = createContext<TokenContextType | null>(null);
export default function TokenContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("userToken"),
  );
  return (
    <>
      <TokenContext.Provider value={{ token, setToken }}>
        {children}
      </TokenContext.Provider>
    </>
  );
}

export const useToken = () => {
  const ctx = useContext(TokenContext);
  if (!ctx) throw new Error("useToken must be used within TokenProvider");
  return ctx;
};
