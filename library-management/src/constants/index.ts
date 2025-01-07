export enum PAGE_ROUTES_NAME {
  ADMIN_HOME = "admin",
  BOOK_LIST = "book-list",
  ASSIGNED_BOOK_LIST = "assigned-book-list",
  STUDENT_HOME = "student",
}

export enum ROUTES_URL {
  HOME = "/",
  ADMIN_HOME = `/${PAGE_ROUTES_NAME.ADMIN_HOME}`,
  BOOK_LIST = `/${PAGE_ROUTES_NAME.BOOK_LIST}`,
  ASSIGNED_BOOK_LIST = `/${PAGE_ROUTES_NAME.ASSIGNED_BOOK_LIST}`,
  STUDENT_HOME = `/${PAGE_ROUTES_NAME.STUDENT_HOME}`,
  OTHER = "*",
  LOGIN = "/login",
  REGISTER = "/register",
}

export enum ACCOUNT_TYPE {
  ADMIN = "Admin",
  STUDENT = "Student",
}
