 // src/pages/Location.jsx
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

  /* ================= CURRENT LOCATION ================= */
  useEffect(() => {
    handleUseCurrent();
  }, []);

  const handleUseCurrent = () => {
    navigator.geolocation?.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);
        setLoading(false);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();
          setAddress(data.display_name || "");
        } catch {
          setAddress("Unable to fetch address");
        }
      },
      () => {
        setLoading(false);
        alert("Location permission denied");
      }
    );
  };

  /* ================= MAP ================= */
  function LocationMarker() {
    useMapEvents({
      async click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        setPosition([lat, lng]);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();
          setAddress(data.display_name || "");
        } catch {}
      },
    });

    return (
      <Marker
        position={position}
        draggable
        eventHandlers={{
          dragend: async (e) => {
            const p = e.target.getLatLng();
            const lat = p.lat;
            const lng = p.lng;

            setPosition([lat, lng]);

            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
              );
              const data = await res.json();
              setAddress(data.display_name || "");
            } catch {}
          },
        }}
      />
    );
  }

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
        
        <h2 style={title}>Select Location</h2>

        {/* 🔥 SEARCH (ELEVATED) */}
        <div style={searchWrapper}>
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search location..."
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

        {/* 🔥 MAP */}
        <div style={mapWrapper}>
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

          <button style={gpsBtn} onClick={handleUseCurrent}>
            📍
          </button>
        </div>

        {/* 🔥 ADDRESS CARD */}
        {address && (
          <Card style={addressCard}>
            <p style={addressText}>{address}</p>
          </Card>
        )}

        {/* 🔥 BOTTOM CTA (GROUPED) */}
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
  flex: 1,
  padding: spacing.md,
  display: "flex",
  flexDirection: "column",
  gap: spacing.lg,
  marginTop: 56,
};

const title = {
  ...typography.title,
  textAlign: "center",
};

/* SEARCH */
const searchWrapper = {
  position: "relative",
  zIndex: 1000,
};

const searchInput = {
  width: "100%",
  padding: "16px",
  borderRadius: radius.lg,
  border: `1px solid ${colors.border}`,
  background: "#fff",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  fontSize: "14px",
};

/* DROPDOWN */
const dropdown = {
  position: "absolute",
  top: "110%",
  width: "100%",
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
  maxHeight: 220,
  overflowY: "auto",
};

const dropdownItem = {
  padding: 14,
  borderBottom: "1px solid #eee",
  cursor: "pointer",
  fontSize: 13,
};

/* MAP */
const mapWrapper = {
  height: 320,
  borderRadius: radius.lg,
  overflow: "hidden",
  position: "relative",
  boxShadow: shadows.card,
};

/* GPS */
const gpsBtn = {
  position: "absolute",
  right: 12,
  top: 12,
  background: "#fff",
  border: "none",
  padding: 10,
  borderRadius: "50%",
  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
  cursor: "pointer",
};

/* ADDRESS */
const addressCard = {
  padding: 14,
};

const addressText = {
  fontSize: 13,
  color: colors.text,
};

/* CTA */
const ctaBox = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
  marginTop: "auto",
};