const fs = require('fs');

exports.seed = function(knex, Promise) {

  const contents = fs.readFileSync('./data/playlistseed.json');
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  // Use batch insert to insert mulitple playlists at the same time
  return knex('Playlist')
    .del()
    .then(() => knex.batchInsert('Playlist', data, 100));
};
