import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import Page from "./Page";

describe("Page Component", () => {
  test("renders the Page Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <Page open={true} navConfig={[]} />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
