import axios from "./axios";
import { Employee, EmployeesResponse } from "../../models/employee";

export async function getEmployees(): Promise<EmployeesResponse> {
  try {
    const getEmployeesResponse = await axios.get<EmployeesResponse>(
      "employees/"
    );
    const response = await getEmployeesResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getEmployee(
  employeeId: string
): Promise<EmployeesResponse> {
  try {
    const getEmployeeResponse = await axios.get<EmployeesResponse>(
      `employees/${employeeId}`
    );
    const response = await getEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function addEmployee(
  employee: Employee
): Promise<EmployeesResponse> {
  try {
    const addEmployeeResponse = await axios.post<EmployeesResponse>(
      "employees/",
      employee
    );
    const response = await addEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function editEmployee(
  employee: Employee
): Promise<EmployeesResponse> {
  try {
    const editEmployeeResponse = await axios.put<EmployeesResponse>(
      `employees/${employee._id}`,
      employee
    );
    const response = await editEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function deleteEmployee(
  employeeId: string
): Promise<EmployeesResponse> {
  try {
    const deleteEmployeeResponse = await axios.delete<EmployeesResponse>(
      `employees/${employeeId}`
    );
    const response = await deleteEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function deleteEmployees(
  ids: Array<string>
): Promise<EmployeesResponse> {
  try {
    const deleteEmployeesResponse = await axios.post<EmployeesResponse>(
      `employees/deleteSome`,
      {
        ids,
      }
    );
    const response = await deleteEmployeesResponse.data;
    if (response.success) {
      return { employees: ids };
    }
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}
