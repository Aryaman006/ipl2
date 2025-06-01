export default function SummaryCards({ teams }) {
  const totalTeams = teams.length;
  const avgWinPercent =
    teams.reduce((acc, t) => acc + t.WinPercentage, 0) / (totalTeams || 1);
  const totalMatches = teams.reduce((acc, t) => acc + t.Matches, 0);

  return (
    <div className="flex justify-center gap-6 flex-wrap mb-6">
      <div className="bg-indigo-600 text-white p-4 rounded shadow w-48 text-center">
        <h4 className="text-lg font-bold">Teams</h4>
        <p className="text-2xl">{totalTeams}</p>
      </div>
      <div className="bg-green-600 text-white p-4 rounded shadow w-48 text-center">
        <h4 className="text-lg font-bold">Avg Win %</h4>
        <p className="text-2xl">{avgWinPercent.toFixed(2)}%</p>
      </div>
      <div className="bg-purple-600 text-white p-4 rounded shadow w-48 text-center">
        <h4 className="text-lg font-bold">Total Matches</h4>
        <p className="text-2xl">{totalMatches}</p>
      </div>
    </div>
  );
}
