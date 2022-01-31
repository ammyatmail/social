import { render } from "../../../../../test-utils";
import { ZoneDashboardTab } from "./ZoneDashboardTab";

test("renders Zone Details", () => {
  const props = {
    zone: {
      accountId: 27099,
      address: {
        streetAddress: "",
        city: "",
        region: "",
        postalCode: "",
        country: "NL",
      },
      cameraIds: [1869610],
      cameras: [],
      name: "HQ EMEA - Manufacturing",
      phone: [],
      status: "CUSTOM",
      zoneId: "871371",
    },
  };
  const component = render(<ZoneDashboardTab {...props} />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
