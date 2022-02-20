import { create } from "react-test-renderer";

import EmployeesListToolbar from "./EmployeesListToolbar";

describe("EmployeesListToolbar Component", () => {
  test("renders the EmployeesListToolbar Component", () => {
    const tree = create(
      <EmployeesListToolbar
        numSelected={10}
        filterName={"filterName"}
        handleMultipleUsersDelete={() => {}}
        onFilterName={(
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
