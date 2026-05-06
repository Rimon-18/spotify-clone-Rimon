const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable directory listing
const serveIndex = require("serve-index");

app.use(express.static(path.join(__dirname)));
app.use("/songs", express.static(path.join(__dirname, "songs")));
app.use("/songs", serveIndex(path.join(__dirname, "songs"), {"icons": true}));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});