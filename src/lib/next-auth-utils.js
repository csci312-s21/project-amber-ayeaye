import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
)

// export async function signIn(user) {
//   return verify_dj(user)
// }
 /*
  * add new dj to the database
  * @param obj:{id, username, email} user
  */
export async function add_dj(user){
await knex("Dj").insert(user);

const newDJ = await knex("Dj")
  .select()
  .where("email", "=", user.email);
 return newDJ[0];
}
/*
* verify whether the person who logged in is a dj
* @returns the email, username, and id if they are registered as dj in our database or
* null if they are registered as dj in the database
* @param {string} user's email
*/
export async function verify_dj(user){
 
const dj = await knex("Dj")
  .select()
  .where("email", "=", user);
return dj[0] ? dj[0] : null;
}

/* 
*@returns all the dj's as an array of object
*/
export async function get_djs(){
  const rows = await knex("Dj")
    .select();
  return rows;
}
/*
* @returns the dj object containing {id, username, email}
* @param {number} id specifies the dj's id
*/
export async function get_dj(id){
  const rows = await knex ("Dj")
    .select()
    .where({id:id})
    
  return rows[0]
}
/*
* removes a dj from the database
*@param {number} id of the dj to be removed
*@returns status message ok and an error if the element is not found
*/
export async function delete_dj(id){
  const deleted = await knex("Dj")
    .where({id})
    .del()
  if (deleted){
    return true
  }
  else{
    return false
  }
  
}