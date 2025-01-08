# Library Management System
===========================
  => Phase 1
    1. Clone fresh new project with vite or cra(create-react-app)
    2. Implement routing
    3. Implement Redux toolkit ( Use redux-persist for preseve state on load page )

  => Phase 2
    1. Login Page (Email, Password)
    2. Register Page (Full Name, Email, Password, Confirm Password, DOB, Role => Admin, Student)
    3. After register redirect to login page

  => Phase 3
    1. We have 2 templates as per role
      1.1 Use @mui, tailwind or any UI library for making creative UI
      1.2 Admin => Header, Sidebar, Container
      1.3 Student => Header, Container
    2. After login redirect page as per login user's role

  => Phase 4
    1. Admin User
      1.1 Menus in sidebar => Dashboard, Book, Assigned Book
      1.2 Dashboard => For now just show message "Welcome To Library Management System" or you can show list of assigned student with issue and return date
      1.3 Book => CRUD Master
        1.3.1 Listing (If no any book then showing No books are available)
        1.3.2 Add Book (Title, Description, Quantity, Author)
        1.3.3 Edit Book
        1.3.4 Delete Book (Show alert message before delete)
      1.4 Assigned Book => Master
        1.4.1 Listing (Listing all books with assigned student name)
        1.4.2 Assigned Book Form (Student dropdown, Book Dropdown which has quantity greater than 0, Issue Date, Return Date)
        1.4.3 After assigned book manage book quantity accordingly
    2. Student user
      2.1 Show book list which is taken from library with issue date and return date.
