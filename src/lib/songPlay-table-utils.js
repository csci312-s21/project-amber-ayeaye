import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

/*

    songPlay-test-utils.js

    This is a collection of utility functions to be called on the server backend.
    These functions interact directly with the database.

    Available functions:

    getSongPlay(id) - gets the songPlay element with the specified id

    getAllSongPlays() - gets all songPlay objects from the database

*/

/**
 * Read the songPlay with the specified id
 *
 * @param {number} id
 * @returns a SongPlay object, or null if the SongPlay can't be found
 */
export async function getSongPlay(id) {
  const songPlay = await knex("SongPlay").select().where({ id: id });
  return songPlay[0] ? songPlay[0] : null;
}

/**
 * Read all songPlays from the database
 *
 * @returns array of songPlay objects
 */
export async function getAllSongPlays() {
  const rows = await knex("SongPlay").select();
  return rows;
}
