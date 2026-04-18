 import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { useApp } from "../context/AppContext";

import {
  typography,
  colors,
  shadows,
  radius,
  spacing,
} from "../styles/theme";

export default function Location() {
  const navigate = useNavigate();
  const { setLocation } = useApp();

  const [position, setPosition] = useState([22.304, 73.176]);
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const debounceRef = useRef(null);

  /* ================= AUTO LOAD CURRENT ================= */
  useEffect(() => {
    handleUseCurrent();
  }, []);

  /* ================= GET CURRENT LOCATION ================= */
  const handleUseCurrent = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();
          setAddress(data.display_name || "");
        } catch {
          setAddress("Unable to fetch address");
        }

        setLoading(false);
      },
      () => {
        setLoading(false);
        alert("Location permission denied");
      }
    );
  };

  /* ================= MAP MARKER ================= */
  function LocationMarker() {
    useMapEvents({
      async click(e) {
        updatePosition(e.latlng.lat, e.latlng.lng);
      },
    });

    return (
      <Marker
        position={position}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const p = e.target.getLatLng();
            updatePosition(p.lat, p.lng);
          },
        }}
      />
    );
  }

  const updatePosition = async (lat, lng) => {
    setPosition([lat, lng]);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      setAddress(data.display_name || "");
    } catch {}
  };

  function ChangeView({ center }) {
    const map = useMap();

    useEffect(() => {
      map.flyTo(center, 15, { duration: 0.5 });
    }, [center]);

    return null;
  }

  /* ================= SEARCH ================= */
  const handleSearch = (value) => {
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
        );
        const data = await res.json();
        setResults(data.slice(0, 5));
      } catch {}
    }, 400);
  };

  const selectLocation = (place) => {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);

    setPosition([lat, lng]);
    setSearch(place.display_name);
    setResults([]);
    setAddress(place.display_name);
  };

  /* ================= CONFIRM ================= */
  const handleConfirm = () => {
    if (!address) return alert("Select location first");

    setLocation({
      lat: position[0],
      lng: position[1],
      address,
    });

    navigate("/vehicle");
  };

  return (
    <PageLayout>
      <div style={container}>

        <h2 style={title}>Select Your Location</h2>

        {/* ================= SEARCH ================= */}
        <div style={searchWrapper}>
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search address..."
            style={searchInput}
          />

          {results.length > 0 && (
            <div style={dropdown}>
              {results.map((item, i) => (
                <div
                  key={i}
                  style={dropdownItem}
                  onClick={() => selectLocation(item)}
                >
                  {item.display_name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= MAP ================= */}
        <div style={mapWrapper}>
          {loading && <Loader text="Fetching location..." />}

          <MapContainer
            center={position}
            zoom={14}
            zoomControl={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {!loading && (
              <>
                <ChangeView center={position} />
                <LocationMarker />
              </>
            )}
          </MapContainer>

          {/* QUICK GPS ICON */}
          <button style={gpsBtn} onClick={handleUseCurrent}>
            📍
          </button>
        </div>

        {/* ================= ADDRESS ================= */}
        {address && (
          <Card variant="glass">
            <p style={addressText}>{address}</p>
          </Card>
        )}

        {/* ================= MAIN CTA ================= */}
        <div style={ctaBox}>
          <GradientButton fullWidth onClick={handleUseCurrent}>
            Use Current Location
          </GradientButton>

          <GradientButton fullWidth onClick={handleConfirm}>
            Confirm Location
          </GradientButton>
        </div>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
};

const title = {
  ...typography.title,
};

const searchWrapper = {
  position: "relative",
  zIndex: 10,
};

const searchInput = {
  width: "100%",
  padding: "14px",
  borderRadius: radius.lg,
  border: `1px solid ${colors.border}`,
  background: colors.surface,
  boxShadow: shadows.soft,
  fontSize: 14,
};

const dropdown = {
  position: "absolute",
  top: "110%",
  width: "100%",
  background: "#fff",
  borderRadius: radius.md,
  boxShadow: shadows.strong,
  maxHeight: 220,
  overflowY: "auto",
};

const dropdownItem = {
  padding: 12,
  borderBottom: `1px solid ${colors.border}`,
  cursor: "pointer",
  fontSize: 13,
};

const mapWrapper = {
  height: 320,
  borderRadius: radius.lg,
  overflow: "hidden",
  position: "relative",
  boxShadow: shadows.card,
};

const gpsBtn = {
  position: "absolute",
  right: 12,
  top: 12,
  background: "#fff",
  border: "none",
  padding: 10,
  borderRadius: "50%",
  boxShadow: shadows.soft,
  cursor: "pointer",
};

const addressText = {
  fontSize: 13,
  color: colors.text,
};

const ctaBox = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};