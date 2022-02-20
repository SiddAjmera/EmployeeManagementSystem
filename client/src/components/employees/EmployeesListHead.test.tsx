import { create } from "react-test-renderer";

import EmployeesListHead, { Order } from "./EmployeesListHead";

describe("EmployeesListHead Component", () => {
  test("renders the EmployeesListHead Component", () => {
    const tree = create(
      <EmployeesListHead
        order={Order.asc}
        orderBy="name"
        rowCount={5}
        headLabel={[]}
        numSelected={10}
        onRequestSort={(event: any, property: string) => {}}
        onSelectAllClick={(
          event: React.ChangeEvent<HTMLInputElement>,
          checked: boolean
        ) => {}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
