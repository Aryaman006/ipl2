// utils/fetchTeamMatches.js

export async function fetchTeamMatches(teamName) {
  try {
    const res = await fetch("https://opensheet.elk.sh/1ruOxbtk8JjFfn5keWaHI69MFo5ERDkbMPUrODb-7n6E/Sheet1"); // Update with actual URL or import
    const allMatches = await res.json();

    const normalizedName = teamName.toLowerCase();

    // Filter matches where the team played (either team1 or team2)
    const teamMatches = allMatches.filter(
      (match) =>
        match.team1.toLowerCase() === normalizedName ||
        match.team2.toLowerCase() === normalizedName
    );

    // Optional: sort by date (newest first)
    teamMatches.sort((a, b) => new Date(b.date) - new Date(a.date));

    return teamMatches;
  } catch (error) {
    console.error("Error fetching team matches:", error);
    return [];
  }
}
