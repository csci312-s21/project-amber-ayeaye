import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
)

/*

    playlist-table-utils.js

    This is a collection of utility functions to be called on the server backend.
    These functions interact directly with the database.

    Available functions:

    getPlaylists - reads all of the playlists out of the database and returns them
    getPlaylist(id) - reads the playlist with the specified id
    deletePlaylist(id) - deletes the playlist with the specified id
    addPlaylist(playlist) - adds the specified playlist to the database

*/

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
 * Read the playlist with the specified id
 * 
 * @param {number} id
 * @returns a Playlist object, or null if the playlist can't be found
 */
export async function getPlaylist(id) {
    const playlist = await knex("Playlist").select().where({id:id});
    return playlist[0] ? playlist[0] : null;
}

/**
 * Delete the playlist with the specified id
 * 
 * @param {number} id
 * @returns a Boolean indicating success
 */
export async function deletePlaylist(id) {
    const numDeleted = await knex("Playlist").where({id:id}).del();
    return numDeleted ? true : false;
}

/**
 * Add a new playlist to the database
 * 
 * @param {object} playlist 
 * @returns the playlist with a new id attached
 */
export async function addSong(playlist) {
    const newId = await knex("Playlist").insert(playlist);
    const newPlaylist = getPlaylist(newId[0]);
    return newPlaylist;
}