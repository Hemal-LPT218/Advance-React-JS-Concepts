export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Student";
}

export interface UserState {
  user: User | null;
}
