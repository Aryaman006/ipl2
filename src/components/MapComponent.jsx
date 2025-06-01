"use client";

import React, { useEffect, useState } from "react";
import { createTeamIcon } from "@/utils/createTeamIcons";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useRouter } from "next/navigation";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function ClientOnlyMap({ teams }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const center = [20.5937, 78.9629];
  const zoom = windowWidth < 640 ? 4 : 5;

  return (
    <div
      style={{
        width: "100%",
        height: windowWidth < 640 ? "300px" : "600px",
        maxWidth: "100vw",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {teams.map(({ Team, Lat, Lng }) => (
          <Marker
            key={Team}
            position={[Lat, Lng]}
            icon={createTeamIcon(Team, "large")}
            eventHandlers={{
              click: () => {
                router.push(`/team/${Team.toLowerCase().replace(/\s+/g, "-")}`);
              },
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d5a3f86 (updated files)
