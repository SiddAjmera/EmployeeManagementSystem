import { create } from "react-test-renderer";

import ThemeConfig from "../../theme";
import MHidden, { Width } from "./MHidden";

describe("MHidden Component", () => {
  test("renders the MHidden Component", () => {
    const tree = create(
      <ThemeConfig>
        <MHidden width={Width.lgDown}>
          <h1>Some Content</h1>
        </MHidden>
      </ThemeConfig>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
