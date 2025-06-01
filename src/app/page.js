"use client";

import { useEffect, useState } from "react";
import TeamChart from "@/components/TeamCharts";
import dynamic from "next/dynamic";
import SortSelect from "@/components/SortSelect";
import { fetchAndProcessIPLData } from "@/utils/fetchSheetData";
import FilterPanel from "@/components/Filters";
import CompareTeams from "@/components/CompareTeams";
const ClientOnlyMap = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", minWin: 0 });
  const [sortBy, setSortBy] = useState("winPercentageDesc");

  useEffect(() => {
    fetchAndProcessIPLData()
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtering
  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.Team.toLowerCase().includes(filters.search.toLowerCase());
    const meetsWin = team.WinPercentage >= filters.minWin;
    return matchesSearch && meetsWin;
  });

  // Sorting
  const sortedTeams = filteredTeams.sort((a, b) => {
    switch (sortBy) {
      case "matchesAsc":
        return a.Matches - b.Matches;
      case "matchesDesc":
        return b.Matches - a.Matches;
      case "winsAsc":
        return a.Wins - b.Wins;
      case "winsDesc":
        return b.Wins - a.Wins;
      case "winPercentageAsc":
        return a.WinPercentage - b.WinPercentage;
      case "winPercentageDesc":
      default:
        return b.WinPercentage - a.WinPercentage;
    }
  });

  if (loading) return <p className="text-center mt-20 text-xl">Loading IPL data...</p>;

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">IPL Teams Dashboard</h1>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <FilterPanel filters={filters} setFilters={setFilters} />
        <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <TeamChart teams={sortedTeams} />

      <h2 className="mt-16 mb-6 text-2xl font-semibold text-center">Team Locations Map</h2>
      <ClientOnlyMap teams={sortedTeams} />
       <section className="mt-16">
    <h2 className="text-2xl font-semibold text-center mb-6">Compare Selected IPL Teams</h2>
    <CompareTeams teams={sortedTeams}/>
  </section>
    </main>
  );
}
