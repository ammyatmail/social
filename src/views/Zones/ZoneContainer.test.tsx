import { ZoneContainer } from "./ZoneContainer";
import { render } from "../../../test-utils";

test("renders ZoneContainer", () => {
  const component = render(<ZoneContainer />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
