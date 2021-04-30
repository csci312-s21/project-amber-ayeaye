exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('Song', (table) => {
        table.increments('id').unique().notNullable();
        table.string('title').notNullable();
        table.string('artist').notNullable();
        table.string('album').notNullable();
        table.string('spotify_id').unique();
        table.string('artwork');
    })
    .createTable('Show', (table) => {
        table.increments('id').unique().notNullable();
        table.string('description');
        table.string('schedule').notNullable();
        table.string('dj_name').notNullable();
    })

    .createTable('Playlist', (table) => {
        table.increments('id').unique().notNullable();
        table.integer('show_id').references('id').inTable('Show').notNullable();
        table.string('time_window').unique().notNullable();
    })

    .createTable('SongPlay', (table) => {
        table.increments('id').unique().notNullable();
        table.integer('playlist_id').references('id').inTable('Playlist').notNullable();
        table.integer('song_id').references('id').inTable('Song').notNullable();
        table.integer('order').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('Song')
        .dropTableIfExists('Show')
        .dropTableIfExists('Playlist')
        .dropTableIfExists('SongPlay');
};