const fs = require('fs');

exports.seed = function (knex, Promise) {
  const contents = fs.readFileSync('./data/songseed.json');
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  // Use batch insert because we have too many articles for simple insert
  return knex('Song')
    .del()
    .then(() => knex.batchInsert('Song', data, 100));
};