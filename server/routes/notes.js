const notes = require("express").Router();
const { v4 } = require("uuid");
const fs = require("fs");
const path = require("path");

//reads db.json file and respondes with the parsed json object
notes.get("/", (req, res) => {
  //reads db.json
  let notes = fs.readFileSync(
    path.join(__dirname, "..", "..", "db", "db.json")
  );

  //responds with parsed note object
  res.json(JSON.parse(notes));
});

//posts new note to the db.json file
notes.post("/", (req, res) => {
  //reads db.json
  let notes = fs.readFileSync(
    path.join(__dirname, "..", "..", "db", "db.json"),
    { encoding: "utf-8" }
  );

  //parses note string
  notes = JSON.parse(notes);

  //add id to the note and pushes into the note array
  notes.push({ ...req.body, id: v4() });

  //rewrites file with new note
  fs.writeFileSync(
    path.join(__dirname, "..", "..", "db", "db.json"),
    JSON.stringify(notes, null, 2),
    {
      encoding: "utf-8",
    }
  );

  res.json({ success: "true" });
});

//deletes note from db.json using the unique id of that note
notes.delete("/:id", (req, res) => {
  //reads db.json file
  let notes = fs.readFileSync(
    path.join(__dirname, "..", "..", "db", "db.json"),
    { encoding: "utf-8" }
  );

  //parses note string
  notes = JSON.parse(notes);

  //finds index of id paramater
  let noteIndex = notes.findIndex((note) => note.id === req.params.id);

  //removes note of matching id
  if (noteIndex >= 0) {
    notes.splice(noteIndex, 1);

    fs.writeFileSync(
      path.join(__dirname, "..", "..", "db", "db.json"),
      JSON.stringify(notes, null, 2),
      {
        encoding: "utf-8",
      }
    );
    res.json({ delete: true });
  } else {
    res.json({ delete: false });
  }
});

module.exports = { notes };
