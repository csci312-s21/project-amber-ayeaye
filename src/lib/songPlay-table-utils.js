import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
)

import { addSong } from "./song-table-utils";

/*

    songPlay-test-utils.js

    This is a collection of utility functions to be called on the server backend.
    These functions interact directly with the database.

    Available functions:

    getSongPlay(id) - gets the songPlay element with the specified id

    deleteSongPlay(id) - delete the songPlay element corresponding to the provided id

    changeOrder(id_list) - reorders songPlay elements for a given playlist based on the provided list of id's

*/

/**
 * Read the songPlay with the specified id
 * 
 * @param {number} id
 * @returns a SongPlay object, or null if the SongPlay can't be found
 */
export async function getSongPlay(id) {
    const songPlay = await knex("SongPlay").select().where({id:id});
    return songPlay[0] ? songPlay[0] : null;
}

/**
 * Add a SongPlay entry to the database
 * 
 * @param {object} song
 * @param {number} playlist_id
 * 
 * @returns the SongPlay entry with its new ID
 */
export async function addSongPlay(song, playlist_id) {
    const rows = await knex("Song").select();
    return rows;
}