import knexConfig from "../../knexfile";
import knexInitializer from "knex";

import { getShow } from "./show-table-utils";

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
    createPlaylist(playlist) - creates a new playlist in the database

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
 * Create a new playlist entry in the database
 * 
 * @param {number} show_id 
 * @returns the playlist entry in the database with an ID
 */
export async function createPlaylist(show_id) {

    // Construct the date string for the database
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const dateString = mm + dd + yyyy;

    // Get the show's time window from the database
    const show = getShow(show_id);
    const showTimeWindow = show.schedule.split("T").pop();

    // Combine the date and time window strings
    const playlistTimeWindow = "D" + dateString + "T" + showTimeWindow;

    // Construct the new Playlist object
    const playlist = {
        show_id: show_id,
        time_window: playlistTimeWindow
    };

    // Add the playlist to the Playlist table
    const playlistId = await knex("Playlist").insert(playlist);
    const newPlaylist = await getPlaylist(playlistId);

    // Return the playlist entry
    return newPlaylist; 
}