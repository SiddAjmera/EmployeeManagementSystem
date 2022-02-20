import { create } from "react-test-renderer";

import EmployeesMoreMenu from "./EmployeesMoreMenu";

describe("EmployeesMoreMenu Component", () => {
  test("renders the EmployeesMoreMenu Component", () => {
    const tree = create(
      <EmployeesMoreMenu handleEdit={() => {}} handleDelete={() => {}} />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
