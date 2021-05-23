import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchBar from "./SearchBar";
import fetchMock from "fetch-mock-jest";
import seedSongs from "../../data/songseed.json";

describe("SearchBar tests", () => {
  const localSongs = seedSongs;
  const song = localSongs[0];
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();

    fetchMock.reset();
    fetchMock.get("/api/spotifyauth", () => ({ token: "mocked_access_token" }));
    fetchMock.get(/api.spotify.com/, () => localSongs);
  });

  test("Search button is disabled when input is blank", async () => {
    const { container } = render(
      <SearchBar addSongToPlaylist={handler} switchMode={handler} />
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
});
