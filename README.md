# IPL Team Details & Match History Viewer

This is a React (Next.js) application that displays detailed information about IPL (Indian Premier League) teams, their statistics, home grounds, color schemes, and historical match data. Users can filter match history by date, year, opponent, and also sort matches by ascending or descending date.

## 🔧 Tech Stack

- **Framework**: [Next.js 13+](https://nextjs.org/)
- **Language**: JavaScript (React)
- **Styling**: Tailwind CSS
- **Data Source**: Google Sheets or other backend exposed via custom utility functions

---

## 🚀 Features

- View team details: name, short code, city, home ground, and logo
- Show team colors dynamically as UI theme
- Display matches played and win percentage
- Filter matches by:
  - Specific date
  - Year
  - Opponent team
- Sort matches by date (ascending/descending)
- Smooth, responsive design with animations

---

## 📂 Folder Structure

.
├── app/
│ └── team/[teamName]/page.js # Main team page component
├── public/
│ └── logo/ # Team logo images (e.g., MI.png, CSK.png)
├── utils/
│ ├── fetchSheetData.js # Fetch and process team summary data
│ └── fetchTeamMatches.js # Fetch matches played by a team
├── components/
│ └── StatCard.js # Reusable stat card component


---

## 🧠 Key Concepts Used

- **Dynamic routing** via `[teamName]` parameter in Next.js
- **Client components** using `"use client"`
- **State Management** via `useState`
- **Side Effects** via `useEffect`
- **Filtering & Sorting** array of matches based on user inputs
- **Alias mapping** to handle legacy IPL team names

---

## 🛠️ Setup Instructions

1. **Clone the repo**
   git clone https://github.com/Aryaman006/ipl2
   cd ipl2

Install dependencies
npm install

Add logo images
Place PNG logos in the public/logo/ directory, named according to the teamShortNames mapping (e.g., RCB.png, MI.png).

Run the app
npm run dev
🖼️ Example Team Page Route

To view a team page, navigate to:

http://localhost:3000/team/Mumbai-Indians
The team name in the URL is kebab-case. Internally, it's normalized to match the actual team name.

📸 Screenshots

### 🏠 Home Page
![Home Page](/public/screenshots/home.png)

### 🆚 Team Comparison
![Team Comparison](/public/screenshots/team-comparision.png)

### 🏏 Team Details Page
![Team Details](/public/screenshots/team-page.png)


🤝 Contributing
Feel free to fork this repo and submit pull requests for improvements. Ensure you keep team mappings and data utilities consistent when adding features.

# 🏏 IPL Team Stats Web App

A dynamic web application built using **Next.js 14** and **Tailwind CSS** to showcase IPL team statistics, matches, and performance breakdown. The app fetches data from a centralized Google Sheet and displays it in a user-friendly format with dynamic routing for each team.

---

## 🚀 Live Demo

🔗 [Visit the Live App](https://ipl2-mauve.vercel.app)
---

✨ Features Implemented
✅ Dynamic routing for each IPL team

✅ Team-specific stats: matches played, wins, win percentage

✅ Home city and stadium display

✅ Logo and theme color per team

✅ Opponent and year-based filtering for matches

✅ Legacy team name mapping (e.g. Delhi Daredevils → Delhi Capitals)

✅ Sorted matches by date (asc/desc toggle)

✅ Responsive layout with Tailwind

✅ Clean, accessible UI

🧠 Future Improvements

 Add match scores, locations, and MVPs

 Add team comparison page

 Improve mobile responsiveness

 Add animations and transitions for UX

 Deploy backend to cache sheet data for performance

👨‍💻 Author
Made with ❤️ by [Aryaman Singh](https://aryamansingh005.vercel.app)  
GitHub: [Aryaman006](https://github.com/Aryaman006)
