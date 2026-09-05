import { EmployeeStatus } from "./EmployeeTypes";
import { EmploymentType } from "./PayrollTypes";

interface Employee {
  id: string;

  employeeCode: string;

  firstName: string;
  lastName?: string;

  email?: string;
  phone?: string;

  dateOfBirth?: string;

  joiningDate: string;

  departmentId?: string;
  designationId?: string;

  employmentType: EmploymentType;

  status: EmployeeStatus;

  userId?: string;

  createdAt: string;
  updatedAt: string;
}