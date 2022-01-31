import { render } from "../../../../../../test-utils";
import { CameraDetailsCard } from "./CameraDetailsCard";

test("renders FirmwareCard Details", () => {
  const props = {
    camera: {
      accountId: "27099",
      cameraId: "1841837",
      deviceTypeId: "10009",
      ethMacAddress: "00-1C-27-15-61-D0",
      name: "Entrance",
      zoneId: "785542",
    },
    zones: [],
    devices: [],
  };
  const component = render(<CameraDetailsCard {...props} />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
