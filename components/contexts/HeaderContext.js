import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const HEADERContext = createContext();

export function HEADERContextProvider({ children }) {
  const [serves, setServes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const headers = {
        "Content-Type": "application/json",
      };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/react/serves/serves.php`,
        { headers }
      );
      console.log(data);
      setServes(data.allserves);
    }
    fetchData();
  }, []);
  return (
    <HEADERContext.Provider value={{ serves }}>
      {children}
    </HEADERContext.Provider>
  );
}

export function useHEADER() {
  const context = useContext(HEADERContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
