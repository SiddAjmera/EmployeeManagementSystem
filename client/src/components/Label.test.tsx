import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import Label from "./Label";

describe("Label Component", () => {
  test("renders the Label Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <Label />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});