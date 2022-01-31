import { render } from "../../../../../../test-utils";
import { FirmwareCard } from "./FirmwareCard";

test("renders FirmwareCard Details", () => {
  const component = render(<FirmwareCard />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
