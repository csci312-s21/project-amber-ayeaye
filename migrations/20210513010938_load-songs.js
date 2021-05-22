exports.up = function (knex) {
  return knex.schema.createTable("Song", (table) => {
    table.increments("id").unique().notNullable();
    table.string("title").notNullable();
    table.string("artist").notNullable();
    table.string("album").notNullable();
    table.string("spotify_id").unique();
    table.string("artwork");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Song");
};
