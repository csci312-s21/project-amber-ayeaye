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
    })
    .createTable("Song", (table) => {
      table.increments("id").unique().notNullable();
      table.string("title").notNullable();
      table.string("artist").notNullable();
      table.string("album").notNullable();
      table.string("spotify_id").unique();
      table.string("artwork");
    })
    .createTable("Playlist", (table) => {
      table.increments("id").unique().notNullable();
      table.integer("show_id").references("id").inTable("Show").notNullable();
      table.string("time_window").notNullable();
    })
    .createTable("SongPlay", (table) => {
      table.increments("id").unique().notNullable();
      table
        .integer("playlist_id")
        .references("id")
        .inTable("Playlist")
        .onDelete("CASCADE")
        .notNullable();
      table.integer("song_id").references("id").inTable("Song").notNullable();
      table.integer("order").notNullable();
    })
    .createTable("accounts", (table) => {
      table.increments("id").primary();
      table.string("compound_id", 255).notNullable();
      table.integer("user_id").notNullable();
      table.string("provider_type", 255).notNullable();
      table.string("provider_id", 255).notNullable();
      table.string("provider_account_id", 255).notNullable();
      table.text("refresh_token");
      table.text("access_token");
      table.timestamp("access_token_expires");
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

      table.unique("compound_id");
      table.index("provider_account_id");
      table.index("provider_id");
      table.index("user_id");
    })
    .createTable("sessions", (table) => {
      table.increments("id").primary();
      table.integer("user_id").notNullable();
      table.timestamp("expires").notNullable();
      table.string("session_token", 255).notNullable();
      table.string("access_token", 255).notNullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

      table.unique("session_token");
      table.index("access_token");
    })
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name", 255);
      table.string("email", 255);
      table.timestamp("email_verified");
      table.string("image", 255);
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

      table.unique("email");
    })
    .createTable("verification_requests", (table) => {
      table.increments("id").primary();
      table.string("identifier", 255).notNullable();
      table.string("token", 255).notNullable();
      table.timestamp("expires").notNullable();
    })
    .createTable("CurrentPlaylist", (table) => {
      table.integer("id").unique().notNullable();
    });
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Show")
    .dropTableIfExists("Dj")
    .dropTableIfExists("Song")
    .dropTableIfExists("Playlist")
    .dropTableIfExists("SongPlay")
    .dropTableIfExists("accounts")
    .dropTableIfExists("sessions")
    .dropTableIfExists("users")
    .dropTableIfExists("verification_requests")
    .dropTableIfExists("CurrentPlaylist");
};
