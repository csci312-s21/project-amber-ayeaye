import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

/*

    song-table-utils.js

    This is a collection of utility functions to be called on the server backend.
    These functions interact directly with the database.

    Available functions:

    getSong(id) - reads the song with the specified id
    getSongBySpotifyID(spotify_id) - reads the song with the specified spotify ID
    addSong(song) - adds the specified song to the database

*/

/**
 * Read the song with the specified id
 *
 * @param {number} id
 * @returns a Song object, or null if the song can't be found
 */
export async function getSong(id) {
  const song = await knex("Song").select().where({ id: id });
  return song[0] ? song[0] : null;
}

/**
 * Finds a song with the specified Spotify ID
 *
 * @param {number} spotify_id
 * @returns -1 if the song is not in the database, databse id otherwise
 */

// getSongBySpotifyID
export async function getSongBySpotifyId(spotify_id) {
  const song = await knex("Song").select().where({ spotify_id: spotify_id });

  return song[0] ? song[0] : null;
}

/**
 * Add a new song to the database
 *
 * @param {object} song
 * @returns the song with a new id attached
 */
export async function addSong(song) {
  // First, check if the song is already in the database
  const songInDatabase = await getSongBySpotifyId(song.spotify_id);

  if (songInDatabase) {
    // Return the entry if the song is already in the database
    return songInDatabase;
  } else {
    // If not, add the song and return the entry with the new ID attached
    const newId = await knex("Song").insert(song);
    const newSong = await getSong(newId[0]);
    return newSong;
  }
}
