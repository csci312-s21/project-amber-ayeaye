exports.up = function (knex, Promise) {
    return knex.schema
    .createTable('Show', (table) => {
        table.increments('id').unique().notNullable();
        table.string('description', 10000);
        table.string('schedule').notNullable();
        table.string('dj_name').notNullable();
        table.string('title').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Show');
}