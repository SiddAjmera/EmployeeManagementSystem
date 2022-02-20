import { create } from "react-test-renderer";
import ThemeConfig from "./";

describe("ThemeConfig", () => {
  test("renders the ThemeConfig", () => {
    const tree = create(
      <ThemeConfig>
        <h1>Some Content</h1>
      </ThemeConfig>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
