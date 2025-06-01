import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TEAM_ACRONYMS = {
  "Mumbai Indians": "MI",
  "Chennai Super Kings": "CSK",
  "Royal Challengers Bangalore": "RCB",
  "Kolkata Knight Riders": "KKR",
  "Delhi Capitals": "DC",
  "Sunrisers Hyderabad": "SRH",
  "Rajasthan Royals": "RR",
  "Punjab Kings": "PBKS",
  "Gujarat Titans": "GT",
};

const TEAM_COLORS = {
  "Mumbai Indians": "#0D47A1",
  "Chennai Super Kings": "#FBC02D",
  "Royal Challengers Bangalore": "#B71C1C",
  "Kolkata Knight Riders": "#512DA8",
  "Delhi Capitals": "#17449B",
  "Sunrisers Hyderabad": "#EF6C00",
  "Rajasthan Royals": "#EA1A8E",
  "Punjab Kings": "#D71920",
  "Gujarat Titans": "#1B5E20",
};

export default function CompareTeams({ teams = [] }) {
  const [selected, setSelected] = useState([]);

  const toggleTeam = (teamName) => {
    setSelected((prev) =>
      prev.includes(teamName)
        ? prev.filter((name) => name !== teamName)
        : [...prev, teamName]
    );
  };

  const selectedTeams = teams.filter((t) => selected.includes(t.Team));

  // Prepare data for Pie Charts
  const winsData = selectedTeams.map((team) => ({
    name: team.Team,
    value: team.Wins,
  }));

  const winPercentageData = selectedTeams.map((team) => ({
    name: team.Team,
    value: team.WinPercentage,
  }));

  // Dynamically adjust pie radius based on number of selected teams
  const getPieRadius = () => {
    const count = selectedTeams.length;
    if (count <= 3) return 90;
    if (count <= 6) return 70;
    return 55;
  };

  const pieRadius = getPieRadius();

  return (
    <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto gap-6">
      {/* Team selection & table */}
      <div className="flex-1 p-4 border-r border-gray-200 min-w-[280px] max-w-full">
        <h2 className="text-2xl font-extrabold mb-6 text-indigo-600">
          Compare IPL Teams
        </h2>

        <div className="flex flex-wrap gap-4 mb-6">
          {teams.map((team) => (
            <label
              key={team.Team}
              className="flex items-center space-x-3 cursor-pointer hover:text-indigo-500"
            >
              <input
                type="checkbox"
                onChange={() => toggleTeam(team.Team)}
                checked={selected.includes(team.Team)}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="font-semibold text-gray-700">{team.Team}</span>
            </label>
          ))}
        </div>

        {selectedTeams.length === 0 && (
          <p className="text-gray-500 italic">
            Select teams to compare their stats.
          </p>
        )}

        {selectedTeams.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Team
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    City
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-right">
                    Matches
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-right">
                    Wins
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-right">
                    Win %
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedTeams.map((team) => (
                  <tr
                    key={team.Team}
                    className="hover:bg-indigo-50 transition-colors duration-150"
                  >
                    <td
                      className="border border-gray-300 px-4 py-2 font-semibold text-indigo-700"
                      style={{ color: TEAM_COLORS[team.Team] || "inherit" }}
                    >
                      {team.Team}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{team.City}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {team.Matches}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {team.Wins}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {team.WinPercentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Visual Pie Charts */}
      {selectedTeams.length > 0 && (
        <aside className="w-full lg:w-1/2 p-6 overflow-auto">
          <h3 className="text-xl font-bold mb-6 text-indigo-600 text-center">
            Visual Comparison - Pie Charts
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wins Pie Chart */}
            <div className="flex flex-col items-center">
              <h4 className="font-semibold mb-3 text-gray-800 text-center">
                Wins Distribution
              </h4>
              <div className="w-full h-[320px] md:h-[280px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={winsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={pieRadius}
                      label={({ name, percent }) =>
                        `${TEAM_ACRONYMS[name] || name}: ${(percent * 100).toFixed(
                          0
                        )}%`
                      }
                    >
                      {winsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={TEAM_COLORS[entry.name] || "#8884d8"}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} wins`} />
                    <Legend
                      wrapperStyle={{ fontSize: 12 }}
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Win Percentage Pie Chart */}
            <div className="flex flex-col items-center">
              <h4 className="font-semibold mb-3 text-gray-800 text-center">
                Win Percentage
              </h4>
              <div className="w-full h-[320px] md:h-[280px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={winPercentageData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={pieRadius}
                      label={({ name, percent }) =>
                        `${TEAM_ACRONYMS[name] || name}: ${(percent * 100).toFixed(
                          0
                        )}%`
                      }
                    >
                      {winPercentageData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={TEAM_COLORS[entry.name] || "#82ca9d"}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend
                      wrapperStyle={{ fontSize: 12 }}
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
