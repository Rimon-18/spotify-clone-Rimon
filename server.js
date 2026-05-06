const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Serve all static files
app.use(express.static(path.join(__dirname)));

// Serve songs folder
app.use("/songs", express.static(path.join(__dirname, "songs")));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});