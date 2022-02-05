import { ProfileCard } from "./ProfileCard";
import { render } from "../../../test-utils";

test("renders ProfileCard", () => {
  const props = {
    profileItem: {
      id: 4229922486747136,
      isPlus: true,
      lastLogin: "2022-02-04T06:29:41.308Z",
      name: "RandyHoward",
      onlineStatus: "DATE",
    },
  };
  const component = render(<ProfileCard {...props} />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
