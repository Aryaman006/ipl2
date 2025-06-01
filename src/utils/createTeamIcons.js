import L from "leaflet";

export function createTeamIcon(teamName, size = "small") {
  const teamLogos = {
    "Mumbai Indians": "/logo/MI.png",
    "Chennai Super Kings": "/logo/CSK.png",
    "Royal Challengers Bangalore": "/logo/RCB.png",
    "Kolkata Knight Riders": "/logo/KKR.png",
    "Delhi Capitals": "/logo/DC.png",
    "Rajasthan Royals": "/logo/RR.png",
    "Sunrisers Hyderabad": "/logo/SRH.png",
    "Punjab Kings": "/logo/PBKS.png",
    "Gujarat Titans":"/logo/GT.png"
  };

  const logoUrl = teamLogos[teamName];
  if (!logoUrl) return new L.Icon.Default();

  // Marker pin images (your existing map marker pins)
  const pinUrlSmall = "/icon.png"; // e.g. 30x40 px
  const pinUrlLarge = "/icon2x.png"; // e.g. 50x70 px

  const pinUrl = size === "large" ? pinUrlLarge : pinUrlSmall;
  const iconSize = size === "large" ? [50, 70] : [30, 40];
  const iconAnchor = size === "large" ? [25, 70] : [15, 40];
  const popupAnchor = size === "large" ? [0, -70] : [0, -40];

  // Size of the logo inside the pin (adjust as needed)
  const logoSize = size === "large" ? 36 : 24;

  // HTML structure:
  // A div container sized as the pin image,
  // with the pin image as a background,
  // and the team logo centered on top.
  const html = `
    <div style="
      position: relative;
      width: ${iconSize[0]}px;
      height: ${iconSize[1]}px;
      background-image: url(${pinUrl});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center bottom;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    ">
      <img 
        src="${logoUrl}" 
        alt="${teamName}" 
        style="
          width: ${logoSize}px;
          height: ${logoSize}px;
          border-radius: 50%;
          border: 2px solid white;
          background: white;
          box-shadow: 0 0 5px rgba(0,0,0,0.3);
          margin-bottom: ${size === "large" ? "14px" : "10px"};
          pointer-events: none;
          user-select: none;
        "
      />
    </div>
  `;

  return L.divIcon({
    html,
    iconSize,
    iconAnchor,
    popupAnchor,
    className: "", // no default styling
  });
<<<<<<< HEAD
}
=======
}
>>>>>>> d5a3f86 (updated files)
