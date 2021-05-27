import knexConfig from "../../knexfile";
import knexInitializer from "knex";

import { getPlaylist } from "./playlist-table-utils";
import { addSong } from "./song-table-utils";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

/*

    database-utils.js

    This is a collection of utility functions to be called on the server backend.
    These functions interact directly with the database.

    Available functions:

    addSongToPlaylist(song, playlist_id) - adds the provided song to the playlist, adding to the Song database if first play
        - Creates a new entry in SongPlay
        - Creates a new entry in Song if first play

    deleteSongFromPlaylist(songPlay_id) - deletes a song from the playlist
        - Removes an entry in SongPlay only

    getSongsFromPlaylist(playlist_id) - retrieves all songs corresponding to the specified playlist

    getShows() - retrieves all shows for presentation in the calendar

    getPlaylists() - retrieves all playlists

    getShowPlaylists(show_id) - retrieves the playlists associated with a given show id
*/

/**
 * Adds the provided song to the playlist, adding to the Song database if first play
 *
 * @param {object} song
 * @param {number} playlist_id
 *
 * @returns new Song object with songId and songPlayId attached
 */
export async function addSongToPlaylist(song, playlist_id, order) {
  // Check that the playlist exists
  const playlist = await getPlaylist(playlist_id);
  if (!playlist) {
    return "Error: Playlist not found"; // Make this an actual Error
  }

  // Attempt to add the new song to the Song table
  // Note: if song already in database, its entry is returned
  const newSong = await addSong(song);

  // Add the SongPlay to the database
  const songPlay = {
    playlist_id: +playlist_id,
    song_id: +newSong.id,
    order: +order,
  };
  const [songplay_id] = await knex("SongPlay").insert(songPlay, ["id"]);
  const real_id = songplay_id.id ? songplay_id.id : songplay_id;

  // Attach the songPlayID to the Song object
  const songWithBothIds = { ...newSong, real_id };

  // Return the new Song object with both IDs
  return songWithBothIds;
}

/**
 * Deletes a SongPlay entry from the SongPlay table
 *
 * @param {number} songPlay_id
 *
 * @returns boolean indicating success of deletion
 */
export async function deleteSongFromPlaylist(songplay_id) {
  const numDeleted = await knex("SongPlay")
    .where({ id: +songplay_id })
    .del();
  return numDeleted ? true : false;
}

/**
 * Gets all songs for a specified playlist
 *
 * @param {number} playlist_id
 *
 * @returns array of Song objects with IDs
 */
export async function getSongsFromPlaylist(playlist_id) {

    const songs = await knex("Playlist")
        .join("SongPlay", "SongPlay.playlist_id", "Playlist.id")
        .join("Song", "Song.id", "SongPlay.song_id")
        .select(
            "Song.id",
            "Song.title",
            "Song.artist",
            "Song.album",
            "Song.artwork",
            "Song.spotify_id",
            "SongPlay.id as songplay_id",
            "SongPlay.order as order"
        )
        .where("Playlist.id", "=", playlist_id)
        .orderBy("order", "desc");
    return songs;
}

/**
 * Read all shows from the database
 *
 * @returns array of Show objects
 */
export async function getShows() {
  const rows = await knex("Show").select();
  return rows;
}

/**
 * Read all playlists from the database
 *
 * @returns array of Playlist objects
 */
export async function getPlaylists() {
  const rows = await knex("Playlist").select();
  return rows;
}

/**
 * Gets all playlists from a specified show
 *
 * @param {number} show_id
 *
 * @returns array of Playlist objects or an empty array if no playlists exist
 */
export async function getShowPlaylists(show_id) {
    const playlists = await knex("Playlist").select().where({show_id:show_id})
    .orderBy("time_window");
    return playlists;
}
