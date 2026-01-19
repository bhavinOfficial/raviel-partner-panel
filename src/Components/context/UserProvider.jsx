import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "../Profile/userApi";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await getUserProfile();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    refreshUser().finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
