import React, { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import _ from "lodash";
import { IAdminDashboard } from "../types";
import { ACCOUNT_TYPE } from "../constants";
import HeadingText from "../components/HeadingText";
import TableComponent, { Column } from "../components/TableComponent";
import { deleteUserWithAssignedBookUpdate } from "../store/thunkForUsers";
import { AppDispatch, RootState } from "../store/store";
import enJson from "../locales/en.json";

const AdminHome: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const assignedBooks = useSelector(
    (state: RootState) => state.assignedBook.assignedBooks
  );

  const users = useSelector((state: RootState) => state.user.users);

  const books = useSelector((state: RootState) => state.book.books);

  const rowData: IAdminDashboard[] = useMemo(
    () =>
      users
        .filter((user) => user.role === ACCOUNT_TYPE.STUDENT)
        .map((user) => ({
          id: user.id,
          student: `${user.fullName} (${user.email})`,
          lastIssuedBook: _.orderBy(
            assignedBooks.filter(
              (assignedBook) => assignedBook.studentId === user.id
            ),
            ["issueDate"],
            ["desc"]
          )?.[0]?.bookId,
          totalIssuedBook: assignedBooks.filter(
            (assignedBook) => assignedBook.studentId === user.id
          ).length,
          pendingBook: assignedBooks.filter(
            (assignedBook) =>
              assignedBook.studentId === user.id && assignedBook.isAssigned
          ).length,
          returnDatePassed: assignedBooks.filter(
            (assignedBook) =>
              assignedBook.studentId === user.id &&
              assignedBook.isAssigned &&
              new Date(assignedBook.returnDate) < new Date()
          ).length,
        })),
    [assignedBooks, users]
  );

  const columns: Column<IAdminDashboard>[] = useMemo(
    () => [
      {
        id: "student",
        label: enJson.student,
        minWidth: 170,
      },
      {
        id: "lastIssuedBook",
        label: enJson.lastIssuedBook,
        minWidth: 170,
        format: (value) => (
          <>{value ? books.find((book) => book.id === value)?.title : "-"}</>
        ),
      },
      {
        id: "totalIssuedBook",
        label: enJson.totalIssuedBook,
        minWidth: 100,
      },
      {
        id: "pendingBook",
        label: enJson.pendingBook,
        minWidth: 100,
      },
      {
        id: "returnDatePassed",
        label: enJson.returnDatePassed,
        minWidth: 100,
        format: (value) => (
          <Typography color={value ? "warning" : ""} className="!text-sm">
            {value}
          </Typography>
        ),
      },
    ],
    [books]
  );

  const handleDelete = (id: string) => {
    const assignedBookExist = assignedBooks.filter(
      (assignedBook) => assignedBook.studentId === id && assignedBook.isAssigned
    ).length;

    if (assignedBookExist) {
      toast.error(enJson.studentHaveSomeBookAssigned);

      return;
    }

    dispatch(deleteUserWithAssignedBookUpdate({ userId: id }));

    toast.success(enJson.studentAccountDeleted);
  };

  return (
    <div className="flex flex-col gap-8">
      <HeadingText>{enJson.welcomeToAdmin}</HeadingText>

      <TableComponent
        columns={columns}
        rows={rowData}
        showAction
        hideEdit
        onDelete={(row) => handleDelete(row.id)}
        noTableData={enJson.noStudentAvailable}
        deleteDescription={enJson.areYouWantToDeleteStudent}
        tableMaxHeight={460}
      />
    </div>
  );
};

export default memo(AdminHome);
