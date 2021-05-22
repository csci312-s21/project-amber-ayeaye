exports.up = function (knex) {
    return knex.schema
    .createTable('Playlist', (table) => {
        table.increments('id').unique().notNullable();
        table.integer('show_id').references('id').inTable('Show').notNullable();
        table.string('time_window').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Playlist");
};
