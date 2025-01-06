import { createContext, useContext, useMemo, useState } from "react";

// Create context
const WorkContext = createContext();

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useWorkContext = () => {
  const context = useContext(WorkContext);
  return context;
};


// Provider component
// eslint-disable-next-line react/prop-types
export const WorkProvider = ({ children }) => {
    const [selectedWork, setSelectedWork] = useState(null);
    
    const value = useMemo(() => ({ selectedWork, setSelectedWork }), [selectedWork]);

  return (
    <WorkContext.Provider value={ value }>
      {children}
    </WorkContext.Provider>
  );
};
