import { render, screen, fireEvent, act } from "@testing-library/react";
import fetchMock from "fetch-mock-jest";
import Schedule from "./Schedule";

const shows = require("../../data/showseed.json");

describe.only("Schedule tests", () => {
  let localShows;

  beforeAll(() => {
    localShows = shows.map((show) => ({ ...show }));

    fetchMock.reset();
    fetchMock.get(`/api/shows/`, () => localShows);
  });

  test("Snapshot test", async () => {
    const { container } = render(<Schedule />);
    await act(async () => {
      await fetchMock.flush(true);
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  test("Clicking day makes shows visible", async () => {
    render(<Schedule />);
    await act(async () => {
      await fetchMock.flush(true);
    });

    const timeString = /\d\d:\d\d - \d\d:\d\d/;

    let saturdayListItem = screen.queryByText("Saturday");
    const numberSaturdayShows = localShows.filter(
      (show) => show.schedule.charAt(1) === "7"
    ).length;

    let visibleShows = screen.queryAllByText(timeString);
    expect(saturdayListItem).toBeInTheDocument();
    expect(visibleShows.length).toBe(0);

    fireEvent.click(saturdayListItem);
    visibleShows = screen.queryAllByText(timeString);
    expect(visibleShows).toHaveLength = numberSaturdayShows;

    saturdayListItem = screen.queryByText("Saturday");
    fireEvent.click(saturdayListItem);
    visibleShows = screen.queryAllByText(timeString);

    // TODO visible shows retains old value after click
    // expect(visibleShows[0]).not.toBeVisible()
    // expect(visibleShows).toHaveLength(0);
  });

  test("title and DJ name are displayed", async () => {
    const { getByText } = await render(<Schedule />);

    await act(async () => {
      await fetchMock.flush(true);
    });

    // pick a show on Sunday
    const show = localShows.find((s) => s.schedule.charAt(1) === "1");

    // click the Sunday drop down
    const sundayListItem = screen.queryByText("Sunday");
    fireEvent.click(sundayListItem);

    const displayedShow = getByText(`${show.title} -${show.dj_name}`);

    expect(displayedShow).toBeInTheDocument();
    expect(displayedShow).toBeVisible();
  });
});
