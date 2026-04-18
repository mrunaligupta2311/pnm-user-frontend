 import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const STORAGE_KEY = "pnm_state_v1";

/* ================= DEFAULT STATE ================= */
const defaultState = {
  location: null,
  vehicle: null,
  service: null,
  mechanic: null,
  request: {
    status: null,
    startedAt: null,
    updatedAt: null,
  },
  user: {
    name: "User",
    phone: "",
    wallet: 1200,
    isLoggedIn: false,
  },
};

export function AppProvider({ children }) {
  const [hydrated, setHydrated] = useState(false);

  /* ================= CORE STATE ================= */
  const [location, setLocationState] = useState(null);
  const [vehicle, setVehicleState] = useState(null);
  const [service, setServiceState] = useState(null);
  const [mechanic, setMechanicState] = useState(null);
  const [request, setRequestState] = useState(defaultState.request);
  const [user, setUserState] = useState(defaultState.user);

  /* ================= LOAD FROM STORAGE ================= */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        setLocationState(parsed.location || null);
        setVehicleState(parsed.vehicle || null);
        setServiceState(parsed.service || null);
        setMechanicState(parsed.mechanic || null);
        setRequestState(parsed.request || defaultState.request);
        setUserState(parsed.user || defaultState.user);
      }
    } catch (err) {
      console.warn("Failed to restore state:", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  /* ================= SAVE TO STORAGE ================= */
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        location,
        vehicle,
        service,
        mechanic,
        request,
        user,
      })
    );
  }, [location, vehicle, service, mechanic, request, user, hydrated]);

  /* ================= SAFE SETTERS ================= */
  const setLocation = (val) => setLocationState(val);
  const setVehicle = (val) => setVehicleState(val);
  const setService = (val) => setServiceState(val);
  const setMechanic = (val) => setMechanicState(val);
  const setUser = (val) => setUserState(val);

  const setRequest = (val) => setRequestState(val);

  /* ================= FLOW CONTROL ================= */

  const resetFlow = () => {
    setLocationState(null);
    setVehicleState(null);
    setServiceState(null);
    setMechanicState(null);
    setRequestState(defaultState.request);

    localStorage.removeItem(STORAGE_KEY);
  };

  const softResetFlow = () => {
    // keeps user data, resets only service flow
    setVehicleState(null);
    setServiceState(null);
    setMechanicState(null);
    setRequestState(defaultState.request);
  };

  const isFlowComplete = () => {
    return !!(location && vehicle && service);
  };

  const startRequest = () => {
    setRequestState({
      status: "pending",
      startedAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  /* ================= PROVIDER ================= */
  return (
    <AppContext.Provider
      value={{
        /* core */
        location,
        setLocation,
        vehicle,
        setVehicle,
        service,
        setService,
        mechanic,
        setMechanic,

        /* request */
        request,
        setRequest,
        startRequest,

        /* user */
        user,
        setUser,

        /* flow control */
        resetFlow,
        softResetFlow,
        isFlowComplete,

        /* system */
        hydrated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);