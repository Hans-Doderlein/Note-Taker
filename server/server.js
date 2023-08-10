const express = require("express");
const path = require("path");
const { renderMain, renderNotes } = require("./routes/pages");
const { notes } = require("./routes/notes");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api/notes", notes);

//routes for loading pages
app.get("/", renderMain);
app.get("/notes", renderNotes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
