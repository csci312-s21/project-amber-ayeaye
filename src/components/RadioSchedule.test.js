import { render, fireEvent } from "@testing-library/react";
import RadioSchedule from "./RadioSchedule";

describe("RadioSchedule tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
  });

  test("Radio schedule for the day displays shows when clicked", () => {
    const { getByTestId } = render(<RadioSchedule />);
    const mondaySection = getByTestId("mondaySection");
    const isNotOpen = getByTestId("isNotExpanded");

    expect(mondaySection).toBeInTheDocument();
    expect(isNotOpen).toBeInTheDocument();

    fireEvent.click(mondaySection);
    const isOpen = getByTestId("isExpanded");
    expect(isOpen).toBeInTheDocument();
  });
});
