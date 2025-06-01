"use client"
export default function SortSelect({ sortBy, setSortBy }) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-gray-700 font-medium whitespace-nowrap">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
      >
        <option value="winPercentageDesc">Win % (High to Low)</option>
        <option value="winPercentageAsc">Win % (Low to High)</option>
        <option value="matchesDesc">Matches Played (High to Low)</option>
        <option value="matchesAsc">Matches Played (Low to High)</option>
        <option value="winsDesc">Wins (High to Low)</option>
        <option value="winsAsc">Wins (Low to High)</option>
      </select>
    </div>
  );
}
