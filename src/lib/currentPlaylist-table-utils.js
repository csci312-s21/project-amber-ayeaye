import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

/*

    currentPlaylist-table-utils.js

    This is a collection of utility functions to be called on the server backend.
    These functions interact directly with the database.

    Available functions:

    makeCurrentPlaylist(id) - makes the provided id into the current playlist id
        - updates whatever the current id is in the table

    getCurrentPlaylistId() - returns the current playlist id as a number 
*/

/**
 * makes the provided playlist id into the current one
 *
 * @param {number} id
 *
 * @returns a message indicating whether a record was updated or whether a record was inserted
 */
export async function makeCurrentPlaylist(id) {
  const currentExists = await knex("CurrentPlaylist").groupBy("id").select("id").count();

  const count = currentExists[0]["count(*)"];

  // check to see if we have a current entry in the database
  if (count > 0) {
    const updated = await knex("CurrentPlaylist").update({ id: id });
    if (updated) {
      // have any records have been updated? if so, return true
      return "records updated";
    }
    // if none have been updated, return false
    return "no records updated";
  } else {
    const inserted = await knex("CurrentPlaylist").insert({ id: id });
    if (inserted) {
      return "inserted";
    }
    return "not inserted";
  }
}

/**
 * Read the current playlist id from the database
 *
 * @returns the current playlist id
 */
export async function getCurrentPlaylistId() {
  const rows = await knex("CurrentPlaylist").select();
  return rows[0].id;
}
