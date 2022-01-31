import { render } from "../../../../../test-utils";
import { ZoneCameraTab } from "./ZoneCameraTab";

test("renders Zone Details", () => {
  const component = render(<ZoneCameraTab />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
