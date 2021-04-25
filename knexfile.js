module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
        filename: './songs.sqlite3'
        }
    },

    test: {
        client: 'sqlite3',
        connection: ":memory:",
        useNullAsDefault: true,
        seeds: {
            directory: './seeds/test',
        },
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        ssl: true,
    },

};
