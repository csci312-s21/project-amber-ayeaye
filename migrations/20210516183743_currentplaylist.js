exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('CurrentPlaylist', (table) => {
    table.integer('id').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('CurrentPlaylist');
};

