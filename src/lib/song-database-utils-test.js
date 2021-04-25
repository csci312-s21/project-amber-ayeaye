import sampleSongs from "../../data/song-database-test-data.json";
import {
    knex,
    getSongs,
    getSong,
    deleteSong,
    addSong
} from "./song-database-utils";

describe("Tests of the Song database utility function", () => {

    // Testing only the functionality - overwrites database
    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });

    describe("get songs", () => {

        test("getSongs gets all songs", async () => {
            const songs = await getSongs();
            sampleSongs.sort( (a, b) -> a.title.localeCompare(b.title));
            songs.sort( (a, b) -> a.title.localeCompare(b.title)); 
            expect(songs).toEqual(sampleSongs);
        });

        test("getSong gets a single song", async () => {
            const sampleSong = sampleSongs[Math.floor(sampleSongs.lengh / 2)];
            const song = await getSong(sampleSong.id);
            expect(song).toEqual(sampleSong);
        });

        test("getSong returns null if no song matching the id is found", async () => {
            const result = await getSong(-1);
            expect(result).toBeNull();
        });

    });

    describe("add songs", () => {

        test("addSong returns a song with the new id", async () => {
            const sample = {
                title: "new song",
                artist: "new artist",
                album: "new album",
                artwork: "new artwork"
            };

            const newSong = await addSong(sample);
            expect(newSong.title).toBe(sample.title);
            expect(newSong.artist).toBe(sample.artist);
            expect(newSong.album).toBe(sample.album);
            expect(newSong.artwork).toBe(sample.artwork);
            expect(newSong.id).toBeGreaterThanOrEqual(0);
        });

        test("addSong should reject a song with no title", async () => {
            expect.assertions(1);
            const sample = {
                artist: "new artist",
                album: "new album",
                artwork: "new artwork"
            };

            try {
                await addSong(sample);
            } catch (e) {
                expect(e.toString()).toContain("Error");
            }
        });

        test("addSong should reject a song with no artist", async () => {
            expect.assertions(1);
            const sample = {
                title: "new title",
                album: "new album",
                artwork: "new artwork"
            };

            try {
                await addSong(sample);
            } catch (e) {
                expect(e.toString()).toContain("Error");
            }
        });

        test("addSong should create a default artwork", async () => {
            const sample = {
                title: "new title",
                artist: "new artist",
                album: "new album"
            };
            
            const newSong = await addSong(sample);
            expect(newSong.title).toBe(sample.title);
            expect(newSong.artist).toBe(sample.artist);
            expect(newSong.album).toBe(sample.album);
            expect(newSong).artwork.not.toBeNull();
        })
        

    });

    describe("delete songs", () => {

        test("deleteSong deletes song", async () => {
            const sample = sampleSong[0];
            const success = await deleteSong(sample.id);
            expect(success).toBeTruthy();

            const rows = await knex("Song").where({id: sample.id }).select();
            expect(rows).toHaveLength(0);
        });

        test("deleteSong on missing song returns 0", async () => {
            const success = await deleteSong(-1);
            expect(success).toBeFalsy();
        });
    });

})