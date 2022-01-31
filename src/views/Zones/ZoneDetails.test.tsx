import { render } from "../../../test-utils";
import { ZoneDetails } from "./ZoneDetails";

test("renders Zone Details", () => {
  const component = render(<ZoneDetails />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
