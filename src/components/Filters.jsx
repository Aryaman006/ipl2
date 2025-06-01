"use client"
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

export default function FilterPanel({ filters, setFilters }) {
  const handleSearchChange = (e) => {
    const input = e.target.value;
    const upperInput = input.toUpperCase();
    const fullName = shortToFullTeamNames[upperInput] || input;

    setFilters((prev) => ({
      ...prev,
      search: fullName,
    }));
  };

  const handleMinWinChange = (e) => {
    const value = Number(e.target.value);
    setFilters((prev) => ({
      ...prev,
      minWin: isNaN(value) ? 0 : value,
    }));
  };

  return (
    <div className="w-full flex justify-center py-5">
      <div className="w-full max-w-4xl bg-white  rounded-2xl p-6 md:p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Search Input */}
        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="🔍 Search team or short name..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
          />
        </div>

        {/* Min Win Input */}
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
          <label htmlFor="minWin" className="font-medium text-gray-700 whitespace-nowrap">
            Min Win %:
          </label>
          <input
            id="minWin"
            type="number"
            min="0"
            max="100"
            value={filters.minWin}
            onChange={handleMinWinChange}
            className="w-24 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
