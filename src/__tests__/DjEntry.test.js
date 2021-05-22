import { render, screen, fireEvent, act, getByRole } from "@testing-library/react";
import DjEntry from "../components/DjEntry";
import fetchMock from "fetch-mock-jest";

const show = 
  [
    {
      id: 25,
      title: "Show #1",
      schedule: "D1T10:00/11:00",
      dj_name: "DJ #1"
    }
  ];

const newPlaylistReturn = {
   id: 1,
   show_id: 25,
   time_window: "D05212021T10:00/11:00" 
};


describe("DJ Entry tests", () => {
  const handler = jest.fn();

  beforeAll(() => {
    handler.mockReset();

    fetchMock.reset();
    fetchMock.get("/api/shows", () => show);
    fetchMock.put("/api/currentplaylist/1", () => true)
    fetchMock.put("/api/playlists/", () => newPlaylistReturn);
  });
  
  test("Selecting a show enables the new playlist button", async () => {
    render(<DjEntry />);
    await act(async () => {
      await fetchMock.flush(true);
    });

    const addPlaylistButton = screen.getByRole('button', {name: /New Playlist/i});
    // const addPlaylistButton = screen.getElementById("newPlaylistButton");

    // const addPlaylistButton = screen.queryByText("New Playlist");
    expect(addPlaylistButton).toBeDisabled();

    const selectButton = screen.queryByText("Select a Show");
    fireEvent.click(selectButton);

    const show1 = screen.queryByText("Show #1");
    fireEvent.click(show1);

    expect(addPlaylistButton).toBeEnabled();

  });

  // test("Creating a new playlist brings up the search bar", async () => {
  //   render(<DjEntry />);
  //   await act(async () => {
  //     await fetchMock.flush(true);
  //   });

  //   const selectButton = await screen.queryByText("Select a Show");
  //   fireEvent.click(selectButton);

  //   const show1 = await screen.queryByText("Show #1");
  //   fireEvent.click(show1);

  //   const addPlaylistButton = await screen.getByRole('button', {name: /New Playlist/i});
  //   fireEvent.click(addPlaylistButton);

  //   expect(addPlaylistButton).not.toBeInTheDocument();

  //   // const searchButton = screen.getByRole('button', {name: /Search/i});

  //   // expect(searchButton).toBeInTheDocument();
  //   // expect(searchButton).toBeDisabled();

  // });

  //   test("Adding a song via manual entry causes it to appear in the playlist", async () => {
  //       render(<DjEntry/>);
  //       await act(async () => {
  //           await fetchMock.flush(true);
  //       });
  //       const showSelector = await screen.findByText("Select a Show");
  //       fireEvent.click(showSelector);
  //       const show = await screen.findByText("Show #1");
  //       fireEvent.click(show);
  //       const newPlaylistButton = await screen.findByText("New Playlist");
  //       fireEvent.click(newPlaylistButton); 

  //       const manualEntryButton = await screen.findByText("Switch to Manual Entry");
  //       fireEvent.click(manualEntryButton);
  //       const titleInput = await screen.findByLabelText("Song title");
  //       const artistInput = await screen.findByLabelText("Artist name");
  //       const albumInput = await screen.findByLabelText("Album name");

  //       expect(titleInput).toBeInTheDocument();
    
  //       /*
  //       fireEvent.change(titleInput, { target: { value: song.title } });
  //       fireEvent.change(artistInput, { target: { value: song.artist } });
  //       fireEvent.change(albumInput, { target: { value: song.album } });
  //       */
        
  // })

});

    