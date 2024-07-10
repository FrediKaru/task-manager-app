import { render, fireEvent, screen } from "@testing-library/react";
import BoardList from "./BoardList";

test("loads items eventually", async () => {
  render(<BoardList />);

  // Click button
  fireEvent.click(screen.getByText("Load"));

  // Wait for page to update with query text
  const items = await screen.findAllByText(/Item #[0-9]: /);
  expect(items).toHaveLength(10);
});
