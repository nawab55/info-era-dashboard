import { createContext, useState, useContext } from "react";

// Create Context
const UserContext = createContext();

// Provider Component
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
   const context = useContext(UserContext);
   return context;
}