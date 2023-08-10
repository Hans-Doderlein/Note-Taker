const path = require("path");

//loads main page
function renderMain(req, res) {
  res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
}

//loads notes page
function renderNotes(req, res) {
  res.sendFile(path.join(__dirname, "..", "..", "public", "notes.html"));
}

module.exports = { renderMain, renderNotes };
