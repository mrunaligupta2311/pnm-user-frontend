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
import { typography, colors, shadows, radius, spacing } from "../styles/theme";

export default function Location() {
  const navigate = useNavigate();

  const [position, setPosition] = useState([22.3040, 73.1760]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const debounceRef = useRef(null);

  // ✅ Get current location
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, []);

  // ✅ Marker logic
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return (
      <Marker
        position={position}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const p = e.target.getLatLng();
            setPosition([p.lat, p.lng]);
          },
        }}
      />
    );
  }

  // ✅ Smooth movement
  function ChangeView({ center }) {
    const map = useMap();

    useEffect(() => {
      map.flyTo(center, 15, { duration: 0.5 });
    }, [center, map]);

    return null;
  }

  // ✅ Debounced search
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
      } catch (err) {
        console.error(err);
      }
    }, 400);
  };

  // ✅ Select suggestion
  const selectLocation = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);

    setPosition([lat, lon]);
    setSearch(place.display_name);
    setResults([]);
  };

  // ✅ Use current location
  const handleUseCurrent = () => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => alert("Location permission denied")
    );
  };

  return (
    <PageLayout>
      <div style={container}>
        <h2 style={title}>Select Location</h2>

        {/* 🔍 SEARCH */}
        <div style={searchContainer}>
          <input
            type="text"
            placeholder="Search location..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
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

        {/* 🗺️ MAP */}
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
                <CustomZoom />
              </>
            )}
          </MapContainer>

          {/* 📍 Floating GPS */}
          <button style={gpsBtn} onClick={handleUseCurrent}>
            📍
          </button>
        </div>

        {/* ✅ MAIN BUTTON (NEW - IMPORTANT) */}
        <GradientButton fullWidth onClick={handleUseCurrent}>
          Use Current Location
        </GradientButton>

        {/* ✅ CONFIRM */}
        <Card>
          <GradientButton fullWidth onClick={() => navigate("/vehicle")}>
            Confirm Location
          </GradientButton>
        </Card>
      </div>
    </PageLayout>
  );
}

/* ================= CUSTOM ZOOM ================= */
function CustomZoom() {
  const map = useMap();

  return (
    <div style={zoomBox}>
      <button onClick={() => map.zoomIn()} style={zoomBtn}>+</button>
      <button onClick={() => map.zoomOut()} style={zoomBtn}>−</button>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  flex: 1,
  padding: spacing.md,
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
  marginTop: 56,
};

const title = {
  ...typography.title,
  textAlign: "center",
};

/* SEARCH */
const searchContainer = {
  position: "relative",
  zIndex: 2000,
};

const searchInput = {
  width: "100%",
  padding: "14px",
  borderRadius: radius.lg,
  border: `1px solid ${colors.border}`,
  background: "#fff",
  boxShadow: shadows.soft,
};

/* DROPDOWN */
const dropdown = {
  position: "absolute",
  top: "110%",
  width: "100%",
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  maxHeight: "200px",
  overflowY: "auto",
};

const dropdownItem = {
  padding: "12px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
};

/* MAP */
const mapWrapper = {
  height: "360px",
  borderRadius: radius.lg,
  overflow: "hidden",
  position: "relative",
  boxShadow: shadows.card,
};

/* GPS */
const gpsBtn = {
  position: "absolute",
  right: 10,
  top: 10,
  background: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "50%",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  cursor: "pointer",
  zIndex: 1000,
};

/* ZOOM */
const zoomBox = {
  position: "absolute",
  right: 10,
  bottom: 10,
  background: "#fff",
  borderRadius: 10,
  overflow: "hidden",
  zIndex: 1000,
};

const zoomBtn = {
  border: "none",
  background: "#fff",
  padding: "8px 12px",
  cursor: "pointer",
};