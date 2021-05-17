import { render, screen , fireEvent, act } from "@testing-library/react";
import path from "path";
import fetchMock from "fetch-mock-jest";
import {
  startApp,
  stopApp,
  nextBuild,
  nextServer,
} from "../test-utils/next-test-utils"
import PlaylistExplorer from "../components/PlaylistExplorer";

const appDir = path.join(__dirname, "../../");
jest.setTimeout(120 * 1000);

const shows = [
    {
        id: 1,
        title: "Show #1",
        schedule: "D1T10:00/11:00",
        dj_name: "DJ #1"
    },
    {
        id: 2,
        title: "Show #2",
        schedule: "D2T13:00/14:00",
        dj_name: "DJ #2"
    },
    {
        id: 3,
        title: "Show #3",
        schedule: "D3T15:00/16:00",
        dj_name: "DJ #3"
    }
];

const playlists = [
    {
        id: 1,
        show_id: 1,
        time_window: "D01012021T10:00/11:00"
    },
    {
        id: 2,
        show_id: 2,
        time_window: "D12122021T13:00/14:00"
    },
    {
        id: 3,
        show_id: 2,
        time_window: "D10102021T13:00/14:00"
    }
];

const songs = [
    {
        id: 1,
        title: "Piano Man",
        artist: "Billy Joel",
        album: "Piano Man",
        artwork: "https://i.scdn.co/image/ab67616d00001e02db9c8abe838bbfb28ed5cc06",
        spotify_id: "a"
    },
    {
        id: 2,
        title: "House Of The Rising Sun",
        artist: "The Animals",
        album: "Power Company",
        artwork: "https://i.scdn.co/image/ab67616d00001e023c534611bd3658006378a2d7",
        spotify_id: "b"
    }
];

const songPlays = [
    {
        id: 1,
        playlist_id: 1,
        song_id: 1,
        order: 1
    },
    {
        id: 2,
        playlist_id: 2,
        song_id: 1,
        order: 1
    },
    {
       id: 3,
       playlist_id: 2,
       song_id: 2,
       order: 2 
    }
];

describe("PlaylistExplorer tests", () => {

    let server;
    let localShows;
    let localPlaylists;
    let localSongs;
    let localSongPlays;

    beforeAll( async () => {

        // Start the server
        await nextBuild(appDir);
        const app = nextServer({
            dir: appDir,
            dev: false,
            quiet: true,
        });
        
        server = await startApp(app);

        // Establish local version of data
        localShows = shows.map((s) => ({ ...s}));
        localPlaylists = playlists.map((p) => ({...p}));
        localSongs = songs.map((s) => ({...s}));
        localSongPlays = songPlays.map((sp) => ({...sp}));

        // Mock fetch calls for the component
        fetchMock.get("/api/shows", () => localShows);

        fetchMock.get("/api/showplaylists/1", () => [ localPlaylists[0] ]);
        fetchMock.get("/api/showplaylists/2", () => [ localPlaylists[1], localPlaylists[2] ]);
        fetchMock.get("/api/showplaylists/3", () => []);

        fetchMock.get("/api/playlistsongs/1", () => [ localSongs[0] ]);
        fetchMock.get("/api/playlistsongs/2", () => [localSongs]);
        fetchMock.get("/api/playlistsongs/3", () => []);

    });
    
    /**
    * Shut down the server
    */
    afterAll(async () => {
        await stopApp(server)
    });

    test("PlaylistExplorer renders", async () => {
        render(<PlaylistExplorer/>);
        expect(await screen.findByText("Click to Select a Show")).toBeInTheDocument();
    });

    test("Shows Appear in Dropdown", async () => {
        render(<PlaylistExplorer/>);
        const showMenu = await screen.findByText("Click to Select a Show");
        fireEvent.click(showMenu);
        const show1Label = await screen.findByText("Show #1");
        expect(show1Label).toBeInTheDocument();
        const show2Label = await screen.findByText("Show #2");
        expect(show2Label).toBeInTheDocument();
        const show3Label = await screen.findByText("Show #3");
        expect(show3Label).toBeInTheDocument();
    });

    test("Selecting a Show Causes The Date Menu to Appear", async () => {
        render(<PlaylistExplorer/>);
        const showMenu = await screen.findByText("Click to Select a Show");
        fireEvent.click(showMenu);
        const show1Label = await screen.findByText("Show #1");
        fireEvent.click(show1Label);
        const dateMenu = await screen.findByText("Click to choose date of show");
        expect(dateMenu).toBeInTheDocument();
    });

    test("Playlist Dates Appear in Dropdown", async () => {
        render(<PlaylistExplorer/>);
        const showMenu = await screen.findByText("Click to Select a Show");
        fireEvent.click(showMenu);
        const show1Label = await screen.findByText("Show #1");
        fireEvent.click(show1Label);
        const dateMenu = await screen.findByText("Click to choose date of show");
        fireEvent.click(dateMenu);
        const playlist1Label = await screen.findByText("01-01-2021");
        expect(playlist1Label).toBeInTheDocument();
    });

    test("Selecting a Show without Playlists Displays a Message", async () => {
        render(<PlaylistExplorer/>);
        const showMenu = await screen.findByText("Click to Select a Show");
        fireEvent.click(showMenu);
        const show3Label = await screen.findByText("Show #3");
        fireEvent.click(show3Label);
        const dateMenu = await screen.findByText("Click to choose date of show");
        fireEvent.click(dateMenu);
        const noPlaylistLabel = await screen.findByText("This show has no playlists.");
        expect(noPlaylistLabel).toBeInTheDocument();
    });

    test("Selecting a Playlist Displays the Songs", async () => {
        render(<PlaylistExplorer/>);
        const showMenu = await screen.findByText("Click to Select a Show");
        fireEvent.click(showMenu);
        const show1Label = await screen.findByText("Show #1");
        fireEvent.click(show1Label);
        const dateMenu = await screen.findByText("Click to choose date of show");
        fireEvent.click(dateMenu);
        const playlist1Label = await screen.findByText("01-01-2021");
        fireEvent.click(playlist1Label);
        const song = await screen.findByText("Piano Man");
        expect(song).toBeInTheDocument();
    });

    test("Selecting an Empty Playlist Displays a Message", async () => {
        render(<PlaylistExplorer/>);
        const showMenu = await screen.findByText("Click to Select a Show");
        fireEvent.click(showMenu);
        const show2Label = await screen.findByText("Show #2");
        fireEvent.click(show2Label);
        const dateMenu = await screen.findByText("Click to choose date of show");
        fireEvent.click(dateMenu);
        const playlist1Label = await screen.findByText("10-10-2021");
        fireEvent.click(playlist1Label);
        const message = await screen.findByText("This playlist is empty.");
        expect(message).toBeInTheDocument()
    });

});