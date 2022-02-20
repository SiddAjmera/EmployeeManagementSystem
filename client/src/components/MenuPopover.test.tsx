import { create } from "react-test-renderer";

import MenuPopover from "./MenuPopover";

describe("MenuPopover Component", () => {
  test("renders the MenuPopover Component", () => {
    const tree = create(<MenuPopover open={false} />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
