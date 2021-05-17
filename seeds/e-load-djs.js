
const fs = require('fs');

exports.seed = function(knex, Promise) {

  const contents = fs.readFileSync('./data/userseed.json');
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  // Use batch insert to insert mulitple playlists at the same time
  return knex("Dj")
    .del()
    .then(() => knex.batchInsert("Dj", data, 100));
};
