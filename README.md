# 🎵 Spotify Clone

A fully functional Spotify-inspired music player built with HTML, CSS, and JavaScript. Browse popular albums, play songs, and enjoy a smooth music experience — all from your browser!

---

## 🌐 Live Demo

👉 [Click here to visit the live site](https://spotify-clone-rimon.onrender.com)

---

## ✨ Features

- 🎧 Play, pause, and skip songs
- 📚 Dynamic song library loaded from server
- 🖱️ Hover effects on album cards
- ⏱️ Live seek bar with song timer
- 📱 Fully responsive on mobile and desktop
- 🍔 Hamburger menu for mobile sidebar

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure and layout |
| CSS3 | Styling and animations |
| JavaScript | Music player logic |
| Node.js + Express | Backend server |
| Render.com | Hosting and deployment |

---
## 🧠 Challenges I Faced & How I Fixed Them

| # | Challenge | How I Fixed It |
|---|-----------|----------------|
| 1 | **Loading songs dynamically from server** instead of hardcoding them | Built a Node.js + Express backend server that serves song files as JSON, then fetched them using JavaScript `fetch()` API on the frontend |
| 2 | **Audio not playing automatically** after clicking a song card | Used the HTML5 `Audio()` object with `.play()` method and managed play/pause state with a boolean flag in JavaScript |
| 3 | **Seekbar not syncing** with actual song progress in real time | Used the `timeupdate` event listener on the audio object to continuously update the seekbar width as percentage of `currentTime / duration` |
| 4 | **Mobile sidebar not toggling** correctly on hamburger click | Added a click event listener on the hamburger SVG that toggles a CSS class to show/hide the sidebar with a smooth `transform: translateX` transition |
| 5 | **Songs not resetting** when switching between albums | Cleared the current audio source and reset the seekbar to 0 before loading the new song list to avoid overlap and state bugs |
| 6 | **Deployment issues on Render.com** — site not loading songs | Fixed by configuring the Express server to correctly serve static files using `express.static()` with the right folder path |

> 💡 Building this project taught me how frontend and backend work together — especially how JavaScript fetches data from a Node.js server to create a dynamic user experience.

## 👨‍💻 Author

**Rimon**
- GitHub: [@Rimon-18](https://github.com/Rimon-18)
