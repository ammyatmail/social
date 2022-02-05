import { render } from "../../../../../test-utils";
import { News } from "./News";

test("renders Dashboard", () => {
  const component = render(<News />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
