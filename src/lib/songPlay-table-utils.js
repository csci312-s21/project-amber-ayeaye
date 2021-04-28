import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
)

/*

    songPlay-test-utils.js

    This is a collection of utility functions to be called on the server backend.
    These functions interact directly with the database.

    Available functions:

    addSongPlay(song, playlist_id) - adds a songPlay element when a song is played

    deleteSongPlay(id) - delete the songPlay element corresponding to the provided id

    changeOrder(id_list) - reorders songPlay elements for a given playlist based on the provided list of id's

*/

/**
 * Read all songs from the database
 * 
 * @returns array of Song objects
 */
export async function getSongs() {
    const rows = await knex("Song").select();
    return rows;
}

/**
 * Read the song with the specified id
 * 
 * @param {number} id
 * @returns a Song object, or null if the song can't be found
 */
export async function getSong(id) {
    const song = await knex("Song").select().where({id:id});
    return song[0] ? song[0] : null;
}

/**
 * Delete the song with the specified id
 * 
 * @param {number} id
 * @returns a Boolean indicating success
 */
export async function deleteSong(id) {
    const numDeleted = await knex("Song").where({id:id}).del();
    return numDeleted ? true : false;
}

/**
 * Add a new song to the database
 * 
 * @param {object} song
 * @returns the song with a new id attached
 */
export async function addSong(song) {
    if (!song.artwork) {
        song.artwork = "default";
    }
    const newId = await knex("Song").insert(song);
    const newSong = getSong(newId[0]);
    return newSong;
}