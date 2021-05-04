
import { render, screen, fireEvent } from "@testing-library/react";
import ManualEntry from "./ManualEntry";

describe("ManualEntry tests", () => {
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

  test("Add button is enabled only when all fields have text", () => {
    const { container } = render(<ManualEntry addSong={handler} switchMode={handler}/>);

    const titleInput = container.querySelector("input[id=titleInput");
    expect(titleInput).toHaveValue("");

    const artistInput = container.querySelector("input[id=artistInput");
    expect(artistInput).toHaveValue("");

    const albumInput = container.querySelector("input[id=albumInput");
    expect(albumInput).toHaveValue("");

    const addButton = screen.getByRole("button", { name: "Save" });
    expect(addButton).toBeDisabled();

    fireEvent.change(titleInput, { target: { value: song.title } });
    expect(titleInput).toHaveValue(song.title);
    expect(addButton).toBeDisabled();

    fireEvent.change(artistInput, { target: { value: song.artist } });
    expect(artistInput).toHaveValue(song.artist);
    expect(addButton).toBeDisabled();

    fireEvent.change(albumInput, { target: { value: song.album } });
    expect(albumInput).toHaveValue(song.album);
    expect(addButton).toBeEnabled();
  });

  test("Clicking add button clears all the form fields", () => {

    const {container} = render(<ManualEntry addSong={handler} switchMode={handler}/>);

    const titleInput = container.querySelector("input[id=titleInput");
    const artistInput = container.querySelector("input[id=artistInput");
    const albumInput = container.querySelector("input[id=albumInput");
    const addButton = screen.getByRole("button", { name: "Save" });

    fireEvent.change(titleInput, { target: { value: song.title } });
    fireEvent.change(artistInput, { target: { value: song.artist } });
    fireEvent.change(albumInput, { target: { value: song.album } });

    fireEvent.click(addButton);

    expect(titleInput).toHaveValue("");
    expect(artistInput).toHaveValue("");
    expect(albumInput).toHaveValue("");

    
  });

  test("ManualEntry returns new song", () => {
    const { container } = render(<ManualEntry addSong={handler} switchMode={handler} />);
    const titleInput = container.querySelector("input[id=titleInput");
    const artistInput = container.querySelector("input[id=artistInput");
    const albumInput = container.querySelector("input[id=albumInput");

    const addButton = screen.getByRole("button", { name: "Save" });

    fireEvent.change(titleInput, { target: { value: song.title } });
    fireEvent.change(artistInput, { target: { value: song.artist } });
    fireEvent.change(albumInput, { target: { value: song.album } });
    
    fireEvent.click(addButton);

    //todo is it a problem that switchMode could also be handler (not just addSong)
    expect(handler).toHaveBeenCalled(); 

    const newSong = handler.mock.calls[0][0]; // value the handler was called with

    expect(newSong.title).toEqual(song.title);
    expect(newSong.artist).toEqual(song.artist);
    expect(newSong.album).toEqual(song.album);
  });

});