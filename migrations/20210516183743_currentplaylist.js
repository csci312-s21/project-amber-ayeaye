exports.up = function (knex) {
  return knex.schema.createTable("CurrentPlaylist", (table) => {
    table.integer("id").unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("CurrentPlaylist");
};
