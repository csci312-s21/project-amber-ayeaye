import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
)

/*

    show-table-utils.js

    This is a collection of utility functions to be called on the server backend.
    These functions interact directly with the database.

    Available functions:

    getShows - reads all of the shows out of the database and returns them
    getShow(id) - reads the show with the specified id
    deleteShow(id) - deletes the show with the specified id
    addShow(show) - adds the specified show to the database

*/

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
 * Read the show with the specified id
 * 
 * @param {number} id
 * @returns a Show object, or null if the show can't be found
 */
export async function getShow(id) {
    const show = await knex("Show").select().where({id:id});
    return show[0] ? show[0] : null;
}

/**
 * Delete the show with the specified id
 * 
 * @param {number} id
 * @returns a Boolean indicating success
 */
export async function deleteShow(id) {
    const numDeleted = await knex("Show").where({id:id}).del();
    return numDeleted ? true : false;
}

/**
 * Add a new show to the database
 * 
 * @param {object} show
 * @returns the show with a new id attached
 */
export async function addShow(show) {

    const newId = await knex("Show").insert(show);
    const newShow = getShow(newId[0]);
    return newShow;
}