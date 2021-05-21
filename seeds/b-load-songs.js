const fs = require("fs");

exports.seed = function (knex) {
  const contents = fs.readFileSync("./data/songseed.json");
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  // Use batch insert to insert mulitple songs at the same time
  return knex("Song")
    .del()
    .then(() => knex.batchInsert("Song", data, 100));
};
