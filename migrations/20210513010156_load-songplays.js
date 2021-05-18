exports.up = function (knex) {
    return knex.schema
    .createTable("SongPlay", (table) => {
        table.increments("id").unique().notNullable();
        table.integer("playlist_id").references("id").inTable("Playlist").notNullable();
        table.integer("song_id").references("id").inTable("Song").notNullable();
        table.integer("order").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("SongPlay");
}
