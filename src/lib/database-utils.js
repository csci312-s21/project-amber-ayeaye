/**
 * DJ side:
 *     addSongToPlaylist
 *     deleteSongFromPlaylist
 *     changePlaylistOrder
 * 
 * Listener side:
 *     getSongsFromPlaylist
 *     getAllShows
 * 
 */

import knexConfig from "../../knexfile";
import knexInitializer from "knex";

import { getPlaylist } from "./playlist-table-utils";
import { addSongPlay } from "./songPlay-table-utils";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
)

/*

    database-utils.js

    This is a collection of utility functions to be called on the server backend.
    These functions interact directly with the database.

    Available functions:

    addSongToPlaylist(song, playlist_id) - adds the provided song to the playlist, adding to the Song database if first play
        - Creates a new entry in SongPlay
        - Creates a new entry in Song if first play

    deleteSongFromPlaylist(song_id, playlist_id) - deletes a song from the playlist
        - Removes an entry in SongPlay only

        changePlaylistOrder(playlist_id, new_order) - changes the order of songs in the playlist
            - Need to figure out how this will work

    getSongsFromPlaylist(playlist_id) - retrieves all songs corresponding to the specified playlist

    getAllShows - retrieves all shows for presentation in the calendar
*/

/**
 * Adds the provided song to the playlist, adding to the Song database if first play
 * 
 * @param {object} song
 * @param {number} playlist_id
 * 
 * @returns new song object with a new id
 */
export async function addSongToPlaylist(song, playlist_id) {

    // Check that the playlist exists
    const playlist = await getPlaylist(playlist_id);
    if(!playlist) {
        return "Error: Playlist not found"; // Make this an actual Error
    }

    // Get the song's ID in the Song database, whether it's being added or not
    const find_song_id = await findSong(song.spotify_id);
    const song_id = (find_song_id === -1) ? await addSong(song).id : find_song_id;

    // Get the new Song object
    const newSong = await getSong(song_id);

    // Add the SongPlay to the database
    const result = await addSongPlay(newSong.id, playlist_id);

    // Return the new Song object
    return newSong;

}
