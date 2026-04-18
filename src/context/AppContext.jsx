 import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  /* ================= CORE FLOW ================= */

  const [location, setLocation] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [service, setService] = useState(null);
  const [mechanic, setMechanic] = useState(null);

  /* ================= REQUEST STATE ================= */

  const [request, setRequest] = useState({
    status: null, // pending | accepted | onway | arrived | started | completed
    startedAt: null,
  });

  /* ================= USER ================= */

  const [user, setUser] = useState({
    name: "User",
    phone: "",
    wallet: 1200,
    isLoggedIn: false,
  });

  /* ================= PERSISTENCE ================= */

  useEffect(() => {
    const saved = localStorage.getItem("pnm_state");
    if (saved) {
      const parsed = JSON.parse(saved);

      setLocation(parsed.location || null);
      setVehicle(parsed.vehicle || null);
      setService(parsed.service || null);
      setMechanic(parsed.mechanic || null);
      setUser(parsed.user || user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pnm_state",
      JSON.stringify({
        location,
        vehicle,
        service,
        mechanic,
        user,
      })
    );
  }, [location, vehicle, service, mechanic, user]);

  /* ================= HELPERS ================= */

  const resetFlow = () => {
    setLocation(null);
    setVehicle(null);
    setService(null);
    setMechanic(null);
    setRequest({ status: null });
  };

  return (
    <AppContext.Provider
      value={{
        location,
        setLocation,
        vehicle,
        setVehicle,
        service,
        setService,
        mechanic,
        setMechanic,

        request,
        setRequest,

        user,
        setUser,

        resetFlow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);