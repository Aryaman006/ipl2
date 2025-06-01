// utils/fetchAndProcessIPLData.js

export async function fetchAndProcessIPLData() {
  try {
    const res = await fetch(
      "https://opensheet.elk.sh/1ruOxbtk8JjFfn5keWaHI69MFo5ERDkbMPUrODb-7n6E/Sheet1"
    );
    if (!res.ok) throw new Error("Failed to fetch IPL match data");

    const matches = await res.json();
    console.log("matches", matches);

    // Team alias map for merging stats (legacy → current)
    const teamNameAliases = {
      "Delhi Daredevils": "Delhi Capitals",
      "Kings XI Punjab": "Punjab Kings",
      "Rising Pune Supergiant": "Rising Pune Supergiants",
    };

    // Normalize team name using alias map
    const normalizeName = (name) => teamNameAliases[name] || name;

    const teamStats = {};

    matches.forEach(({ team1, team2, winner }) => {
      const normalizedTeam1 = normalizeName(team1);
      const normalizedTeam2 = normalizeName(team2);
      const normalizedWinner = normalizeName(winner);

      [normalizedTeam1, normalizedTeam2].forEach((team) => {
        if (!team) return;
        if (!teamStats[team]) {
          teamStats[team] = { Team: team, Matches: 0, Wins: 0 };
        }
        teamStats[team].Matches += 1;
      });

      if (normalizedWinner && teamStats[normalizedWinner]) {
        teamStats[normalizedWinner].Wins += 1;
      }
    });

    // City & coordinates map (use normalized team names as keys)
    const teamCoordinates = {
      "Mumbai Indians": { city: "Mumbai", Lat: 19.076, Lng: 72.8777 },
      "Chennai Super Kings": { city: "Chennai", Lat: 13.0827, Lng: 80.2707 },
      "Royal Challengers Bangalore": { city: "Bangalore", Lat: 12.9716, Lng: 77.5946 },
      "Kolkata Knight Riders": { city: "Kolkata", Lat: 22.5726, Lng: 88.3639 },
      "Delhi Capitals": { city: "Delhi", Lat: 28.7041, Lng: 77.1025 },
      "Rajasthan Royals": { city: "Jaipur", Lat: 26.9124, Lng: 75.7873 },
      "Sunrisers Hyderabad": { city: "Hyderabad", Lat: 17.385, Lng: 78.4867 },
      "Punjab Kings": { city: "Mohali", Lat: 30.7046, Lng: 76.7179 },
      "Gujarat Titans": { city: "Ahmedabad", Lat: 23.0225, Lng: 72.5714 },
      // "Lucknow Super Giants": { city: "Lucknow", Lat: 26.8467, Lng: 80.9462 },
    };

    // Combine stats with location & win percentage
    const processedTeams = Object.values(teamStats)
      .map((team) => {
        const coords = teamCoordinates[team.Team] || {};
        const winPct = (team.Wins / team.Matches) * 100 || 0;
        return {
          ...team,
          City: coords.city || "Unknown",
          Lat: coords.Lat ?? NaN,
          Lng: coords.Lng ?? NaN,
          WinPercentage: +winPct.toFixed(2),
        };
      })
      .filter((team) => !isNaN(team.Lat) && !isNaN(team.Lng));

    console.log("processed-team", processedTeams);
    return processedTeams;
  } catch (error) {
    console.error("Error fetching or processing IPL data:", error);
    return [];
  }
}
