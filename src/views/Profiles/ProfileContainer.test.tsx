import { ProfileContainer } from "./ProfileContainer";
import { render } from "../../../test-utils";

test("renders ProfileContainer", () => {
  const component = render(<ProfileContainer />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
