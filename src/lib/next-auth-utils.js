import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
)

export async function signIn(user) {
  return verify_dj(user)
}
 /*
  * add new dj to the database
  * @param {user} obj {id, username, email}
  */
export async function add_dj(user){
  const newID = await knex("djs").insert(user); 
  const newDj = get_dj(newID);

  return newDJ
}
/*
* verify whether the person who logged in is a dj
* @returns the email, username, and id if they are registered as dj in our database or
* null if they are registered as dj in the database
*/
export async function verify_dj(user){
 
const dj = await knex("djs")
  .select()
  .where({email:user.email});
return dj[0] ? dj[0] : null;
}

/* 
*@returns all the dj's as an array of object
*/
export async function get_djs(){
  const rows = await knex("djs").select();
  return rows;
}
/*
* @returns the dj object containing {id, username, email}
* @param {id} specifies the dj's id
*/
export async function get_dj(id){
  const rows = await knex ("djs")
    .select()
    .where({id})
    return rows[0]
}