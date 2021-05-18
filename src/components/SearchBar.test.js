import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchBar from "./SearchBar";
import fetchMock from "fetch-mock-jest";
import seedSongs from "../../data/songseed.json";
// import { act } from "react-dom/test-utils";

describe("SearchBar tests", () => {
  const localSongs = seedSongs;
  const song = localSongs[0];
  const spotifyQuery = "example search";
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();

    fetchMock.reset();
    fetchMock.get("/api/spotifyauth", () => ({ token: "mocked_access_token" }));
    fetchMock.get(
      `https://api.spotify.com/v1/search?q=${spotifyQuery}&type=track&limit=10`,
      () => localSongs
    );
  });

  test.only("Search button is disabled when input is blank", async () => {
    const { container } = render(
      <SearchBar addSong={handler} switchMode={handler} />
    );

    await act(async () => {
      await fetchMock.flush(true);
    });

    const searchText = container.querySelector("input[id=keywordSearch");
    expect(searchText).toHaveValue("");

    const searchButton = screen.getByRole("button", { name: "Search" });
    expect(searchButton).toBeDisabled();

    fireEvent.change(searchText, { target: { value: song.title } });
    expect(searchText).toHaveValue(song.title);
    expect(searchButton).toBeEnabled();

    fireEvent.change(searchText, { target: { value: "" } });
    expect(searchText).toHaveValue("");
    expect(searchButton).toBeDisabled();
  });

  //   test.only("Clicking search button displays search results", async () => {
  //     const { container } = render(<SearchBar addSong={handler} switchMode={handler}/>);

  //     const searchText = container.querySelector("input[id=keywordSearch");
  //     const searchButton = screen.getByRole("button", { name: "Search" }) ;

  //     fireEvent.change(searchText, { target: { value: song.title } });
  //     fireEvent.click(searchButton)

  //     const searchResultsHeader = await screen.findByText("Search Results");

  //     expect(searchResultsHeader).toBeVisible();

  //   });
});
