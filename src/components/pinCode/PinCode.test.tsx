import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PinCode from "./PinCode";

describe("PinCode", () => {
  const mockFetch = jest.fn();
  let onSubmit: () => {};
  let attemptCount: number;

  beforeEach(() => {
    // Replace the global fetch with the mock implementation
    global.fetch = mockFetch;
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ auth: "Failed" }),
    });

    // Arrange
    onSubmit = jest.fn();
    attemptCount = 3;
  });

  it("should render the component's elements", async () => {
    // Act
    render(<PinCode onSubmit={onSubmit} attemptCount={attemptCount} />);

    // Assert
    expect(screen.getByTestId("PinPattern")).toBeTruthy();
    expect(screen.getByTestId("KeyPad")).toBeTruthy();
    expect(screen.queryByTestId("PinCodeError")).toBeFalsy();
    expect(screen.queryByTestId("LockError")).toBeFalsy();
  });

  // Does not submit the form when the pin code is too short.
  it("should not submit the form when the pin code is too short", () => {
    render(<PinCode onSubmit={onSubmit} attemptCount={attemptCount} />);

    // Act
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));

    // Assert
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // Submits the form when the pin code is long enough.
  it("should submit the form when the pin code is long enough", async () => {
    const mockResponse = { auth: "Failed" };
    global.fetch = jest.fn().mockImplementation(() => mockResponse);

    render(<PinCode onSubmit={onSubmit} attemptCount={attemptCount} />);

    // Act
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("4"));

    // Assert
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveReturnedWith(mockResponse);
  });

  // Displays an error message when the pin code is incorrect.
  it("should display an error message when the pin code is incorrect", async () => {
    render(<PinCode onSubmit={onSubmit} attemptCount={attemptCount} />);

    // Act
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("5"));

    // Assert
    await waitFor(() => {
      return screen.getByTestId("PinCodeError");
    });

    expect(screen.getByTestId("PinCodeError")).toBeTruthy();
  });

  // Displays a lock error message when the maximum number of attempts is reached.
  it("should display a lock error message when the maximum number of attempts is reached", async () => {
    // Arrange
    attemptCount = 1;

    render(<PinCode onSubmit={onSubmit} attemptCount={attemptCount} />);

    // Act
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("1"));

    // Assert
    await waitFor(() => {
      expect(screen.getByText("You are locked for 30 seconds.")).toBeTruthy();
    });
  });
});
