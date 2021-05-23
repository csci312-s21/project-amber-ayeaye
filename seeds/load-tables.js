const fs = require("fs");

exports.seed = function(knex) {

  const showsContent = fs.readFileSync("./data/showseed.json");
  const showsData = JSON.parse(showsContent);

  const djContent = fs.readFileSync("./data/userseed.json");
  const djData = JSON.parse(djContent);

  const songsContent = fs.readFileSync("./data/songseed.json");
  const songsData = JSON.parse(songsContent);

  const playlistContent = fs.readFileSync("./data/playlistseed.json");
  const playlistData = JSON.parse(playlistContent);

  const songPlayContent = fs.readFileSync("./data/songplayseed.json");
  const songPlayData = JSON.parse(songPlayContent);

  // Deletes ALL existing entries
   // Use batch insert to insert mulitple shows at the same time
  return 
  knex("Show")
    .del()
    .then(() => knex.batchInsert("Show", showsData, 100));
  knex("Dj")
    .del()
    .then(()=> knex.batchInsert("Dj", djData, 100));
  knex("Song")
    .del()
    .then(()=> knex.batchInsert("Song", songsData, 100));
  knex ("playlist")
    .del()
    .then(()=> knex.batchInsert("playlist", playlistData, 100));
  knex("songPlay")
    .del()
    .then(()=> knex.batchInsert("songPlay", songPlayData, 100))
};
