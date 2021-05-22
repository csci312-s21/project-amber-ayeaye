exports.up = function (knex) {
  return knex.schema
    .createTable("Show", (table) => {
      table.increments("id").unique().notNullable();
      table.string("description", 10000);
      table.string("schedule").notNullable();
      table.string("dj_name").notNullable();
      table.string("title").notNullable();
    })
    .createTable("Dj", (table) => {
      table.increments("id").unique().notNullable();
      table.string("email").notNullable().unique();
      table.string("username");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Show").dropTableIfExists("Dj");
};
