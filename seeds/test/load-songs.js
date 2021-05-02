const fs = require("fs");

exports.seed = async function(knex) {
  const contents = fs.readFileSync("./data/song-database-test-data.json");
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  await knex("Song").del();
  // load in the sample articles
  await knex.batchInsert("Song", data, 100);
}