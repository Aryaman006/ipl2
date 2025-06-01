"use client";

import React, { useEffect, useState } from "react";
import { fetchAndProcessIPLData } from "@/utils/fetchSheetData";
import { fetchTeamMatches } from "@/utils/fetchTeamMatches";

// Team short names
const teamShortNames = {
  "Royal Challengers Bangalore": "RCB",
  "Chennai Super Kings": "CSK",
  "Mumbai Indians": "MI",
  "Kolkata Knight Riders": "KKR",
  "Rajasthan Royals": "RR",
  "Delhi Capitals": "DC",
  "Sunrisers Hyderabad": "SRH",
  "Punjab Kings": "PBKS",
  "Kings XI Punjab": "KXIP",
  "Gujarat Titans": "GT",
  "Lucknow Super Giants": "LSG",
  "Deccan Chargers": "DC",
  "Pune Warriors": "PWI",
  "Rising Pune Supergiants": "RPS",
  "Gujarat Lions": "GL",
  "Delhi Daredevils": "DD",
};

// Team color schemes
const teamColors = {
  "Royal Challengers Bangalore": { primary: "#B71C1C", secondary: "#FFB300" },
  "Chennai Super Kings": { primary: "#FBC02D", secondary: "#1565C0" },
  "Mumbai Indians": { primary: "#0D47A1", secondary: "#FF8F00" },
  "Kolkata Knight Riders": { primary: "#512DA8", secondary: "#FFC107" },
  "Rajasthan Royals": { primary: "#EA1A8E", secondary: "#1E40AF" },
  "Delhi Capitals": { primary: "#17449B", secondary: "#D71920" },
  "Punjab Kings": { primary: "#D71920", secondary: "#B8860B" },
  "Kings XI Punjab": { primary: "#C62828", secondary: "#FFEB3B" },
  "Sunrisers Hyderabad": { primary: "#EF6C00", secondary: "#212121" },
  "Gujarat Titans": { primary: "#1B5E20", secondary: "#FBC02D" },
  "Lucknow Super Giants": { primary: "#FFB300", secondary: "#283593" },
  "Deccan Chargers": { primary: "#1976D2", secondary: "#E0E0E0" },
  "Pune Warriors": { primary: "#C62828", secondary: "#0D47A1" },
  "Rising Pune Supergiants": { primary: "#EF6C00", secondary: "#283593" },
  "Gujarat Lions": { primary: "#FFB300", secondary: "#212121" },
  "Delhi Daredevils": { primary: "#17449B", secondary: "#D71920" },
};

// Team home grounds
const teamHomeGrounds = {
  "Royal Challengers Bangalore": "M. Chinnaswamy Stadium",
  "Chennai Super Kings": "M. A. Chidambaram Stadium",
  "Mumbai Indians": "Wankhede Stadium",
  "Kolkata Knight Riders": "Eden Gardens",
  "Rajasthan Royals": "Sawai Mansingh Stadium",
  "Delhi Capitals": "Arun Jaitley Stadium",
  "Sunrisers Hyderabad": "Rajiv Gandhi International Cricket Stadium",
  "Punjab Kings": "Punjab Cricket Association IS Bindra Stadium",
  "Kings XI Punjab": "Punjab Cricket Association IS Bindra Stadium",
  "Gujarat Titans": "Narendra Modi Stadium",
  "Lucknow Super Giants": "BRSABV Ekana Cricket Stadium",
  "Deccan Chargers": "Rajiv Gandhi International Cricket Stadium",
  "Pune Warriors": "Subrata Roy Sahara Stadium",
  "Rising Pune Supergiants": "Subrata Roy Sahara Stadium",
  "Gujarat Lions": "Saurashtra Cricket Association Stadium",
  "Delhi Daredevils": "Arun Jaitley Stadium",
};

// Mapping legacy team names to current equivalents
const teamNameAliases = {
  "Delhi Daredevils": "Delhi Capitals",
  "Kings XI Punjab": "Punjab Kings",
  "Rising Pune Supergiant": "Rising Pune Supergiants", // fix typo
};

export default function TeamPage({ params }) {
  const unwrappedParams = React.use(params);
  const { teamName } = unwrappedParams;
  const formattedTeamName = decodeURIComponent(teamName).replace(/-/g, " ");
  const normalizedTeamName = teamNameAliases[formattedTeamName] || formattedTeamName;

  const [teamData, setTeamData] = useState(null);
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterOpponent, setFilterOpponent] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const homeGround = teamData
    ? teamHomeGrounds[teamData.Team] ||
      teamHomeGrounds[teamNameAliases[teamData.Team]] ||
      "Not Available"
    : "Not Available";

  useEffect(() => {
    async function loadData() {
      const allTeams = await fetchAndProcessIPLData();

      const team = allTeams.find(
        (t) =>
          t.Team.toLowerCase() === normalizedTeamName.toLowerCase() ||
          teamNameAliases[t.Team] === normalizedTeamName
      );

      if (team) {
        setTeamData(team);
        const matchHistory = await fetchTeamMatches(team.Team);

        const normalizedMatches = matchHistory.map((m) => ({
          ...m,
          team1: teamNameAliases[m.team1] || m.team1,
          team2: teamNameAliases[m.team2] || m.team2,
          winner: teamNameAliases[m.winner] || m.winner,
          toss_winner: teamNameAliases[m.toss_winner] || m.toss_winner,
        }));

        setMatches(normalizedMatches);
        console.log("match",normalizedMatches);
        
        setFilteredMatches(normalizedMatches);
      }

      setLoading(false);
    }

    loadData();
  }, [normalizedTeamName]);

  useEffect(() => {
    filterAndSortMatches();
  }, [filterDate, filterYear, filterOpponent, sortOrder, matches]);

  const filterAndSortMatches = () => {
    let filtered = [...matches];

    if (filterDate) {
      filtered = filtered.filter(
        (m) => new Date(m.date).toISOString().split("T")[0] === filterDate
      );
    }

    if (filterYear) {
      filtered = filtered.filter(
        (m) => new Date(m.date).getFullYear().toString() === filterYear
      );
    }

    if (filterOpponent) {
      const normalizedOpponent = teamNameAliases[filterOpponent] || filterOpponent;
      filtered = filtered.filter(
        (m) =>
          (m.team1 === teamData.Team && m.team2 === normalizedOpponent) ||
          (m.team2 === teamData.Team && m.team1 === normalizedOpponent)
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredMatches(filtered);
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-lg animate-pulse text-gray-700">
        Loading team details...
      </p>
    );

  if (!teamData)
    return (
      <p className="text-center mt-20 text-lg text-red-600">Team not found</p>
    );

  const displayTeamName = teamNameAliases[teamData.Team] || teamData.Team;
  const logoShortName =
    teamShortNames[displayTeamName] ||
    displayTeamName.toLowerCase().replace(/\s+/g, "");

  const colors = teamColors[displayTeamName] || {
    primary: "#4F46E5",
    secondary: "#A5B4FC",
  };

  return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" style={{ color: colors.primary }}>
  {/* Header */}
  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
    <div className="text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.primary }}>
        {displayTeamName}{" "}
        {teamShortNames[displayTeamName] && (
          <span className="text-xl" style={{ color: colors.secondary }}>
            ({teamShortNames[displayTeamName]})
          </span>
        )}
      </h1>
      <p className="text-base sm:text-lg mt-2 font-semibold" style={{ color: colors.secondary }}>
        {teamData.City}
      </p>
    </div>
    <img
      src={`/logo/${logoShortName}.png`}
      alt={displayTeamName}
      className="w-24 sm:w-28 h-24 sm:h-28 object-contain rounded-full border-4 shadow-lg transition-transform duration-500 hover:scale-110"
      style={{ borderColor: colors.primary }}
    />
  </div>

  {/* Stats */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
    <StatCard label="Matches" value={teamData.Matches} colors={colors} />
    <StatCard label="Wins" value={teamData.Wins} colors={colors} />
    <StatCard label="Win %" value={`${teamData.WinPercentage}%`} colors={colors} />
    <StatCard label="Home Ground" value={homeGround} colors={colors} />
  </div>

  {/* Filters */}
  <div
    className="bg-gray-100 p-4 sm:p-5 rounded-lg mb-8 flex flex-wrap gap-4 sm:gap-6 items-center justify-between shadow-md"
    style={{ border: `2px solid ${colors.primary}` }}
  >
    {/* Date */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 w-full sm:w-auto">
      <label className="text-sm font-semibold" style={{ color: colors.primary }}>Date:</label>
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className="border rounded p-2 text-sm w-full sm:w-auto"
        style={{ borderColor: colors.secondary, color: colors.primary }}
      />
    </div>

    {/* Year */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 w-full sm:w-auto">
      <label className="text-sm font-semibold" style={{ color: colors.primary }}>Year:</label>
      <input
        type="number"
        min="2008"
        max="2099"
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
        placeholder="e.g., 2020"
        className="border rounded p-2 text-sm w-full sm:w-28"
        style={{ borderColor: colors.secondary, color: colors.primary }}
      />
    </div>

    {/* Opponent */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 w-full sm:w-auto">
      <label className="text-sm font-semibold" style={{ color: colors.primary }}>Opponent:</label>
      <select
        value={filterOpponent}
        onChange={(e) => setFilterOpponent(e.target.value)}
        className="border rounded p-2 text-sm w-full sm:w-auto"
        style={{ borderColor: colors.secondary, color: colors.primary }}
      >
        <option value="">All</option>
        {Object.keys(teamShortNames)
          .filter((team) => (teamNameAliases[team] || team) !== teamData.Team)
          .map((team) => (
            <option key={team} value={team}>{team}</option>
          ))}
      </select>
    </div>

    {/* Sort */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 w-full sm:w-auto">
      <label className="text-sm font-semibold" style={{ color: colors.primary }}>Sort:</label>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border rounded p-2 text-sm w-full sm:w-auto"
        style={{ borderColor: colors.secondary, color: colors.primary }}
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </div>
  </div>

  {/* Match History */}
  <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6" style={{ color: colors.primary }}>
    Match History
  </h2>
  {filteredMatches.length === 0 ? (
    <p className="text-gray-600">No matches found for selected filter.</p>
  ) : (
    <div className="overflow-x-auto border rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-100" style={{ backgroundColor: colors.secondary }}>
          <tr>
            {["Date", "Venue", "Teams", "Winner", "Result Margin", "Toss"].map((th) => (
              <th
                key={th}
                className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: colors.primary }}
              >
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredMatches.map((match) => (
            <tr
              key={match.id}
              className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">
                {new Date(match.date).toLocaleDateString()}
              </td>
              <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{match.venue}</td>
              <td className="px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">
                {match.team1} vs {match.team2}
              </td>
              <td className="px-4 sm:px-6 py-3 text-sm text-green-600 font-semibold">
                {match.winner || "N/A"}
              </td>
              <td className="px-4 sm:px-6 py-3 text-sm text-gray-600">
                {match.result_margin ? `${match.result_margin} ${match.result}` : "N/A"}
              </td>
              <td className="px-4 sm:px-6 py-3 text-sm font-medium" style={{ color: colors.secondary }}>
                {match.toss_winner} chose to {match.toss_decision}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
}

function StatCard({ label, value, colors }) {
  return (
    <div
      className="
        rounded-lg 
        p-4 sm:p-5 
        shadow-md 
        text-center 
        transform transition-transform duration-300 
        hover:scale-105 
        min-w-[7rem] sm:min-w-[14rem] 
        max-w-xs sm:max-w-sm 
        mx-auto
      "
      style={{ backgroundColor: colors.primary, color: "#fff" }}
    >
      <p className="text-xs sm:text-sm font-medium">{label}</p>
      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">{value}</p>
    </div>
  );
}


