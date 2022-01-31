import { render } from "../../../../../../test-utils";
import { StatusCard } from "./StatusCard";

test("renders statusCard Details", () => {
  const component = render(<StatusCard />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
