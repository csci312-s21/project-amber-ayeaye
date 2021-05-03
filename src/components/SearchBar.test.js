
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar tests", () => {
  let song;
  const handler = jest.fn();

  beforeEach(() => {
    song = {
      title: "Sample title",
      artist: "Sample artist",
      album: "Sample album",
    };

    handler.mockReset();
  });

  test.only("Search button is disabled when input is blank", () => {
    const { container } = render(<SearchBar addSong={handler} switchMode={handler}/>);

    const searchText = container.querySelector("input[id=keywordSearch");
    expect(searchText).toHaveValue("");

    const searchButton = screen.getByRole("button", { name: "Search" });
    expect(searchButton).toBeDisabled();

    fireEvent.change(searchText, { target: { value: song.title } });
    expect(searchText).toHaveValue(song.title);
    expect(searchButton).toBeEnabled();

    fireEvent.change(searchText, { target: { value: ""} });
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
