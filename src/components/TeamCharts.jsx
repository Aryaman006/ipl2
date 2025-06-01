"use client"
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const shortToFullTeamNames = {
  RCB: "Royal Challengers Bangalore",
  CSK: "Chennai Super Kings",
  MI: "Mumbai Indians",
  KKR: "Kolkata Knight Riders",
  RR: "Rajasthan Royals",
  DC: "Delhi Capitals",
  SRH: "Sunrisers Hyderabad",
  PBKS: "Punjab Kings",
  KXIP: "Kings XI Punjab",
  GT: "Gujarat Titans",
  LSG: "Lucknow Super Giants",
  DD: "Delhi Daredevils",
  RPS: "Rising Pune Supergiants",
  GL: "Gujarat Lions",
  PWI: "Pune Warriors",
};

const fullToShortTeamNames = Object.fromEntries(
  Object.entries(shortToFullTeamNames).map(([short, full]) => [full, short])
);

const CustomizedAxisTickVertical = ({ x, y, payload }) => (
  <text
    x={x - 10}
    y={y + 5}
    textAnchor="end"
    fill="#475569"
    fontWeight="500"
    fontSize={12}
  >
    {payload.value}
  </text>
);

const CustomizedAxisTickHorizontal = ({ x, y, payload, isSmallScreen }) => {
  const shortName = payload.value;
  const fullName = shortToFullTeamNames[shortName] || shortName;

  return (
    <text
      x={x}
      y={y + (isSmallScreen ? 15 : 10)}
      textAnchor={isSmallScreen ? "middle" : "end"}
      fill="#475569"
      fontWeight="500"
      fontSize={isSmallScreen ? 10 : 12}
      transform={isSmallScreen ? "" : `rotate(-60, ${x}, ${y + 10})`}
      style={{ cursor: "default" }}
    >
      <title>{fullName}</title>
      {shortName}
    </text>
  );
};

function SmallScreenChart({ teams }) {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <div style={{ minWidth: 600, height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={teams}
            margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" tick={{ fontSize: 12, fill: "#475569" }} />
            <YAxis
              dataKey="Team"
              type="category"
              interval={0}
              width={120}
              tick={<CustomizedAxisTickVertical />}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Matches"
              fill="#6366f1"
              name="Matches Played"
              barSize={18}
              radius={[6, 6, 6, 6]}
            />
            <Bar
              dataKey="Wins"
              fill="#10b981"
              name="Matches Won"
              barSize={18}
              radius={[6, 6, 6, 6]}
            />
            <Bar
              dataKey="WinPercentage"
              fill="#fbbf24"
              name="Win %"
              barSize={18}
              radius={[6, 6, 6, 6]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function BigScreenChart({ teams, isSmallScreen }) {
  return (
    <div className="rounded-3xl shadow-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 p-10 border border-slate-200">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-800 tracking-tight">
          📊 Team Performance Overview
        </h2>
        <p className="text-slate-500 mt-2 text-base">
          Analyze Matches Played, Wins, and Winning Percentage
        </p>
      </div>

      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={teams}
            margin={{ top: 20, right: 40, left: 10, bottom: isSmallScreen ? 100 : 120 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

            <XAxis
              dataKey="Team"
              interval={0}
              height={isSmallScreen ? 60 : 90}
              tick={(props) => (
                <CustomizedAxisTickHorizontal {...props} isSmallScreen={isSmallScreen} />
              )}
            />

            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12, fill: "#475569" }}
              label={{
                value: "Matches / Wins",
                angle: -90,
                position: "insideLeft",
                fill: "#334155",
                fontSize: 12,
                fontWeight: 500,
              }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "#475569" }}
              label={{
                value: "Win %",
                angle: 90,
                position: "insideRight",
                fill: "#334155",
                fontSize: 12,
                fontWeight: 500,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
              labelStyle={{ color: "#1e293b", fontWeight: 600 }}
              itemStyle={{ color: "#1e293b" }}
              cursor={{ fill: "#f1f5f9", opacity: 0.3 }}
            />

            <Legend
              wrapperStyle={{ fontSize: "14px", paddingTop: "10px", fontWeight: 500 }}
              iconType="circle"
              align="center"
              verticalAlign="bottom"
            />

            <Bar
              yAxisId="left"
              dataKey="Matches"
              fill="#6366f1"
              name="Matches Played"
              barSize={18}
              radius={[6, 6, 0, 0]}
              animationDuration={700}
            />
            <Bar
              yAxisId="left"
              dataKey="Wins"
              fill="#10b981"
              name="Matches Won"
              barSize={18}
              radius={[6, 6, 0, 0]}
              animationDuration={700}
            />
            <Bar
              yAxisId="right"
              dataKey="WinPercentage"
              fill="#fbbf24"
              name="Win %"
              barSize={18}
              radius={[6, 6, 0, 0]}
              animationDuration={700}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function TeamChart({ teams }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map full team names to short names for consistent display
  const teamsWithShortNames = teams.map((team) => ({
    ...team,
    Team: fullToShortTeamNames[team.Team] || team.Team,
  }));

  return isSmallScreen ? (
    <SmallScreenChart teams={teamsWithShortNames} />
  ) : (
    <BigScreenChart teams={teamsWithShortNames} isSmallScreen={isSmallScreen} />
  );
}
