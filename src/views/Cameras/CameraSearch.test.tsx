import { render } from "../../../test-utils";
import { ConnectionStatus } from "./CameraContainer";
import { CameraSearch } from "./CameraSearch";

test("renders statusCard Details", () => {
  const props = {
    variables: {
      connectionStatus: ConnectionStatus.OFFLINE,
      searchText: null,
    },
    setVariables: jest.fn(),
  };
  const component = render(<CameraSearch {...props} />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
