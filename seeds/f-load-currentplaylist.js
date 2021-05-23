const fs = require("fs");

exports.seed = function (knex) {
  const contents = fs.readFileSync("./data/currentplaylistseed.json");
  const data = JSON.parse(contents);
  return knex("CurrentPlaylist")
    .del()
    .then(() => knex.batchInsert("CurrentPlaylist", data, 100));
};
