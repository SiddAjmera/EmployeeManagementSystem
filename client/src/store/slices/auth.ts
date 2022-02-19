import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../apis/axios";
import { RootState, AppThunk } from "../../store";
import { AsyncStatus } from "../common";
import { Employee } from "../../models/employee";
import { getEmployeesAsync } from "./employee";
import { loggedInUser, login, register } from "../apis/auth";

export interface AuthState {
  token?: string;
  rememberMe?: boolean;
  employee?: Employee;
  status: AsyncStatus;
  error?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  address: string;
  title: string;
  password: string;
}

const initialState: AuthState = {
  status: AsyncStatus.IDLE,
  token: localStorage.getItem("token") as string,
  rememberMe: true,
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (employee: LoginFormValues): Promise<AuthResponse> => {
    const { email, password } = employee;
    const response = await login(email, password);
    return response;
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (employee: RegisterFormValues) => {
    const response = await register(employee);
    return response;
  }
);

export const getLoggedInUserAsync = createAsyncThunk(
  "auth/loggedInUser",
  async () => {
    const response = await loggedInUser();
    return response;
  }
);

export interface AuthResponse {
  token: string;
  employee: Employee;
  msg?: string;
}

function postAuthSuccess(
  state: AuthState,
  { payload: { token, employee, msg } }: PayloadAction<AuthResponse>
) {
  state.status = AsyncStatus.IDLE;
  state.employee = employee;
  state.error = msg;
  if (token) {
    state.token = token;
    axios.defaults.headers.common["Authorization"] = token;
  } else if (!state.token) {
    state.token = undefined;
    localStorage.removeItem("token");
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleRememberMe: (state: AuthState) => {
      state.rememberMe = !state.rememberMe;
    },
    logout: (state: AuthState) => {
      state.token = undefined;
      localStorage.removeItem("token");
      state.employee = undefined;
      state.error = undefined;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUserAsync.pending, (state: AuthState) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(getLoggedInUserAsync.fulfilled, postAuthSuccess)

      .addCase(loginAsync.pending, (state: AuthState) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(loginAsync.fulfilled, postAuthSuccess)

      .addCase(registerAsync.pending, (state: AuthState) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(registerAsync.fulfilled, postAuthSuccess);
  },
});

// Actions
export const { logout, toggleRememberMe } = authSlice.actions;

// Selectors
export const selectEmployee = (state: RootState) => state.auth.employee;
export const selectRememberMe = (state: RootState) => state.auth.rememberMe;
export const selectToken = (state: RootState) => state.auth.token;
export const selectError = (state: RootState) => state.auth.error;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const initDataIfAuthenticated = (): AppThunk => (dispatch, getState) => {
  const token = selectToken(getState()) || localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    dispatch(getLoggedInUserAsync());
    dispatch(getEmployeesAsync());
  }
};

export default authSlice.reducer;
