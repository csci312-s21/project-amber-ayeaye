const fs = require("fs");

exports.seed = function(knex) {

  const contents = fs.readFileSync("./data/songplayseed.json");
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  // Use batch insert to insert mulitple playlists at the same time
  return knex("SongPlay")
    .del()
    .then(() => knex.batchInsert("SongPlay", data, 100));
};
