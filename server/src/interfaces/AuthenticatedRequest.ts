import { Request } from "express";
import { Employee } from "./employee";

export interface AuthenticatedRequest extends Request {
  employee: Employee;
}
