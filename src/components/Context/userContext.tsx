import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { userProfileI } from "../../types/user.type";
import { getMyProfile } from "../../Services/profile.service";
import axios from "axios";
import toast from "react-hot-toast";
import { useToken } from "./TokenContext";
export type UserContextType = {
  userDetails: userProfileI | null;
  setUserDetails: Dispatch<SetStateAction<userProfileI | null>>;
};
export const UserContext = createContext<UserContextType | null>(null);
export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userDetails, setUserDetails] = useState<userProfileI | null>(null);

  const { token } = useToken();

  async function getUserProfile() {
    try {
      const { data } = await getMyProfile();

      setUserDetails(data.data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message, {
          duration: 4000,
          position: "top-right",
        });
      }
    }
  }

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}
