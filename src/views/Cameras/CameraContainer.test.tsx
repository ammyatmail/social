import { render } from "../../../test-utils";
import { CameraContainer } from "./CameraContainer";

test("renders statusCard Details", () => {
  const component = render(<CameraContainer />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
