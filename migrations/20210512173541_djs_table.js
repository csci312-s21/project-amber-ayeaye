exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("djs", table=>{
      table.increments("id").unique().notNullable();
      table.string("email").notNullable().unique();
      table.string("username");
    });
};
exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('djs')
};
