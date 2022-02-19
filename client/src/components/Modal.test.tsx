import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import Modal from "./Modal";

xdescribe("Modal Component", () => {
  test("renders the Modal Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <Modal open={true} actions={[]}>
            <h1>Modal Title</h1>
            <p>Modal Content</p>
          </Modal>
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
