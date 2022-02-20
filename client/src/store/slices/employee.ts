import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { AsyncStatus } from "../common";
import { Employee, EmployeesResponse } from "../../models/employee";
import {
  getEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
  deleteEmployees,
} from "../apis/employee";

export interface EmployeeState {
  employees: Array<Employee>;
  employee?: Employee;
  status: AsyncStatus;
  error?: string;
}

const initialState: EmployeeState = {
  status: AsyncStatus.IDLE,
  employees: [],
};

export const getEmployeesAsync = createAsyncThunk(
  "employee/getEmployees",
  async (): Promise<EmployeesResponse> => {
    const response = await getEmployees();
    return response;
  }
);
export const getEmployeeAsync = createAsyncThunk(
  "employee/getEmployee",
  async (employeeId: string): Promise<EmployeesResponse> => {
    const response = await getEmployee(employeeId);
    return response;
  }
);
export const addEmployeeAsync = createAsyncThunk(
  "employee/addEmployee",
  async (employee: Employee): Promise<EmployeesResponse> => {
    const response = await addEmployee(employee);
    return response;
  }
);
export const editEmployeeAsync = createAsyncThunk(
  "employee/editEmployee",
  async (employee: Employee): Promise<EmployeesResponse> => {
    const response = await editEmployee(employee);
    return response;
  }
);
export const deleteEmployeeAsync = createAsyncThunk(
  "employee/deleteEmployee",
  async (employeeId: string): Promise<EmployeesResponse> => {
    const response = await deleteEmployee(employeeId);
    return response;
  }
);
export const deleteEmployeesAsync = createAsyncThunk(
  "employee/deleteEmployees",
  async (employeeIds: Array<string>): Promise<EmployeesResponse> => {
    const response = await deleteEmployees(employeeIds);
    return response;
  }
);

interface SetEmployeePayload {
  employee?: Employee;
}

export const authSlice = createSlice({
  name: "employee",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setEmployeeInQuestion: (
      state,
      { payload: { employee } }: PayloadAction<SetEmployeePayload>
    ) => {
      state.employee = employee;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeesAsync.pending, (state: EmployeeState) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(
        getEmployeesAsync.fulfilled,
        (
          state: EmployeeState,
          { payload: { employees, msg } }: PayloadAction<EmployeesResponse>
        ) => {
          state.status = AsyncStatus.IDLE;
          state.employees = employees ? (employees as Array<Employee>) : [];
          state.error = msg;
        }
      )
      .addCase(getEmployeeAsync.pending, (state: EmployeeState) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(
        getEmployeeAsync.fulfilled,
        (
          state: EmployeeState,
          { payload: { employee, msg } }: PayloadAction<EmployeesResponse>
        ) => {
          state.status = AsyncStatus.IDLE;
          state.employee = employee;
          state.error = msg;
        }
      )
      .addCase(addEmployeeAsync.pending, (state: EmployeeState) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(
        addEmployeeAsync.fulfilled,
        (
          state: EmployeeState,
          { payload: { employee, msg } }: PayloadAction<EmployeesResponse>
        ) => {
          state.status = AsyncStatus.IDLE;
          state.employees?.push(employee as Employee);
          state.employee = undefined;
          state.error = msg;
        }
      )
      .addCase(editEmployeeAsync.pending, (state: EmployeeState) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(
        editEmployeeAsync.fulfilled,
        (
          state: EmployeeState,
          { payload: { employee, msg } }: PayloadAction<EmployeesResponse>
        ) => {
          state.status = AsyncStatus.IDLE;
          const employeeIndex = state.employees?.findIndex(
            ({ _id }) => _id === employee?._id
          );
          if (state.employees) {
            state.employees[employeeIndex as number] = employee as Employee;
          }
          state.error = msg;
        }
      )
      .addCase(deleteEmployeeAsync.pending, (state: EmployeeState) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(
        deleteEmployeeAsync.fulfilled,
        (
          state: EmployeeState,
          { payload: { employee, msg } }: PayloadAction<EmployeesResponse>
        ) => {
          state.status = AsyncStatus.IDLE;
          state.employees = state.employees?.filter(
            ({ _id }) => _id !== employee?._id
          );
          state.error = msg;
        }
      )
      .addCase(deleteEmployeesAsync.pending, (state: EmployeeState) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(
        deleteEmployeesAsync.fulfilled,
        (
          state: EmployeeState,
          { payload: { employees, msg } }: PayloadAction<EmployeesResponse>
        ) => {
          state.status = AsyncStatus.IDLE;
          state.employees = state.employees?.filter(
            ({ _id }) => !(employees as Array<string>)?.includes(_id as string)
          );
          state.error = msg;
        }
      );
  },
});

// Actions
export const { setEmployeeInQuestion } = authSlice.actions;

// Selectors
export const selectEmployees = (state: RootState) => state.employee.employees;
export const selectEmployee = (state: RootState) => state.employee.employee;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
