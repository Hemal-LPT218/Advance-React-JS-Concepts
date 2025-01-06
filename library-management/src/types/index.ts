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
