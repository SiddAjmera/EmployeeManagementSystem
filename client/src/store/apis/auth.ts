import axios from "./axios";
import { Employee } from "../../models/employee";

export async function login(email: string, password: string) {
  try {
    const loginResponse = await axios.post("auth/login", {
      email,
      password,
    });
    const response = await loginResponse.data;
    if (response.token) {
      axios.defaults.headers.common["Authorization"] = response.token;
    }
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function register(employee: Employee) {
  try {
    const registerResponse = await axios.post("auth/register", employee);
    const response = await registerResponse.data;
    if (response.token) {
      axios.defaults.headers.common["Authorization"] = response.token;
    }
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function loggedInUser(token: string) {
  try {
    const loggedInUserResponse = await axios.get("auth/employee");
    const response = await loggedInUserResponse.data;
    return { employee: response, token };
  } catch (error: any) {
    return error.response.data;
  }
}
