import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { RootState } from "../store/store";
import { IAssignedBook } from "../types";
import TableComponent, { Column } from "../components/TableComponent";
import HeadingText from "../components/HeadingText";
import enJson from "../locales/en.json";

const StudentHome: React.FC = () => {
  const assignedBooks = useSelector(
    (state: RootState) => state.assignedBook.assignedBooks
  );

  const user = useSelector((state: RootState) => state.user.user);

  const books = useSelector((state: RootState) => state.book.books);

  const columns: Column<IAssignedBook>[] = useMemo(
    () => [
      {
        id: "bookId",
        label: enJson.book,
        minWidth: 170,
        format: (value) => (
          <>{books.find((book) => book.id === value)?.title}</>
        ),
      },
      {
        id: "issueDate",
        label: enJson.issueDate,
        minWidth: 170,
      },
      {
        id: "returnDate",
        label: enJson.returnDate,
        minWidth: 170,
        format: (value, row) => (
          <Typography
            color={
              new Date(value as string) < new Date() && row?.isAssigned
                ? "warning"
                : ""
            }
            className="!text-sm"
          >
            {value}
          </Typography>
        ),
      },
      {
        id: "isAssigned",
        label: enJson.bookReturned,
        minWidth: 170,
        format: (value, row) => (
          <Typography
            color={
              value && new Date(row?.returnDate as string) < new Date()
                ? "warning"
                : ""
            }
            className="!text-sm"
          >
            {!value ? enJson.yes : enJson.no}
          </Typography>
        ),
      },
    ],
    [books]
  );

  return (
    <div className="flex flex-col gap-8 p-10">
      <HeadingText>{enJson.welcomeToAdmin}</HeadingText>

      <TableComponent
        columns={columns}
        rows={assignedBooks.filter(
          (assignedBook) => assignedBook.studentId === user?.id
        )}
        noTableData={enJson.noAssignedBooksAvailable}
        tableMaxHeight={400}
      />
    </div>
  );
};

export default memo(StudentHome);
