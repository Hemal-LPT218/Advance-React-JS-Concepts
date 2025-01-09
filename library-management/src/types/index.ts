import { ACCOUNT_TYPE } from "../constants";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  role: ACCOUNT_TYPE;
}

export interface IUserState {
  user: IUser | null;
  users: IUser[];
}

export interface IBook {
  id: string;
  title: string;
  description: string;
  quantity: number;
  author: string;
  actualQuantity: number;
}

export interface IBookState {
  books: IBook[];
}

export interface IAssignedBook {
  id: string;
  studentId: string;
  bookId: string;
  issueDate: string;
  returnDate: string;
  isAssigned: boolean;
}

export interface IAssignedBookState {
  assignedBooks: IAssignedBook[];
}

export interface IAdminDashboard {
  id: string;
  student: string;
  lastIssuedBook: string;
  totalIssuedBook: number;
  pendingBook: number;
  returnDatePassed: number;
}
