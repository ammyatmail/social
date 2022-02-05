import { render } from "../../../test-utils";
import { Dashboard } from "./Dashboard";

test("renders Dashboard", () => {
  const component = render(<Dashboard />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
