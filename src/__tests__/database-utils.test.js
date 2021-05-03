import seedSongs from "../../data/songseed.json";
import {
    knex,
    getSongsFromPlaylist
} from "../lib/database-utils";

describe("Test of the database utility functions", () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });

    describe("getSongsFromPlaylist", () => {
        
        test("getSongsFromPlaylist returns expected list of Song objects", async () => {
            const playlist_id1 = 1;
            const returnedSongs1 = await getSongsFromPlaylist(playlist_id1);
            const expectedSongs1 = seedSongs.filter( (song) => song.id === 1);
            expect(returnedSongs1).toEqual(expectedSongs1);

            const playlist_id2 = 2;
            const returnedSongs2 = await getSongsFromPlaylist(playlist_id2);
            const expectedSongs2 = seedSongs.filter( (song) => song.id === 2 || song.id === 4 );
            expect(returnedSongs2).toEqual(expectedSongs2);
        })

        test("getSongsFromPlaylist returns empty array on invalid playlist_id", async () => {
            const playlist_id = -1;
            const returnedSongs = await getSongsFromPlaylist(playlist_id);
            const expectedSongs = [];
            expect(returnedSongs).toEqual(expectedSongs);
        })

    });

});