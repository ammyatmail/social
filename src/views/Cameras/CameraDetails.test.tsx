import { render } from "../../../test-utils";
import { CameraDetails } from "./CameraDetails";

test("renders statusCard Details", () => {
  const component = render(<CameraDetails />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
