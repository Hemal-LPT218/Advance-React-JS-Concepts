import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormikHelpers, useFormik } from "formik";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import _ from "lodash";
import { IAssignedBook } from "../types";
import { ACCOUNT_TYPE } from "../constants";
import InputField from "../components/InputField";
import HeadingText from "../components/HeadingText";
import SelectField from "../components/SelectField";
import ButtonComponent from "../components/ButtonComponent";
import TableComponent, { Column } from "../components/TableComponent";
import { AppDispatch, RootState } from "../store/store";
import {
  addAssignedBookWithBookUpdate,
  updateAssignedBookWithBookUpdate,
} from "../store/thunkForAssignedBooks";
import enJson from "../locales/en.json";
import ConfirmationDialog from "../components/ConfirmationDialog";

const initialValues: IAssignedBook = {
  id: "",
  studentId: "",
  bookId: "",
  issueDate: new Date().toISOString().split("T")[0],
  returnDate: "",
  isAssigned: true,
};

const validationSchema = Yup.object({
  studentId: Yup.string().required(enJson.studentRequired),
  bookId: Yup.string().required(enJson.bookRequired),
  issueDate: Yup.date().required(enJson.issueDateRequired),
  returnDate: Yup.date()
    .required(enJson.returnDateRequired)
    .test("is-after-today", enJson.returnDateGreater, (value) => {
      const returnDate = new Date(value);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return returnDate > today;
    }),
});

const AssignedBoolList: React.FC = () => {
  const assignedBooks = useSelector(
    (state: RootState) => state.assignedBook.assignedBooks
  );

  const users = useSelector((state: RootState) => state.user.users);

  const studentUser = useMemo(
    () =>
      users
        .filter((user) => user.role === ACCOUNT_TYPE.STUDENT)
        .map((user) => ({
          title: `${user.fullName} (${user.email})`,
          value: user.id,
        })),
    [users]
  );

  const books = useSelector((state: RootState) => state.book.books);

  const booksList = useMemo(
    () =>
      books
        .filter((book) => !!book.quantity)
        .map((book) => ({
          title: book.title,
          value: book.id,
        })),
    [books]
  );

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = useCallback(
    (
      values: IAssignedBook,
      { resetForm, setFieldError }: FormikHelpers<IAssignedBook>
    ) => {
      const alreadyAssigned = assignedBooks.find(
        (assignedBook) =>
          assignedBook.bookId === values.bookId &&
          assignedBook.studentId === values.studentId &&
          assignedBook.isAssigned
      );

      if (alreadyAssigned) {
        setFieldError("bookId", enJson.bookAlreadyAssigned);

        return;
      }

      dispatch(
        addAssignedBookWithBookUpdate({
          assignedBook: { ...values, id: uuidv4() },
          bookId: values.bookId,
        })
      );

      toast.success(enJson.bookAssignedSuccessfully);

      resetForm();
    },
    [assignedBooks, dispatch]
  );

  const handleBookReturn = useCallback(
    (id?: string, bookId?: string) => {
      dispatch(updateAssignedBookWithBookUpdate({ id, bookId }));

      toast.success(enJson.bookAssignedUpdated);
    },
    [dispatch]
  );

  const columns: Column<IAssignedBook>[] = useMemo(
    () => [
      {
        id: "studentId",
        label: enJson.student,
        minWidth: 170,
        format: (value) => (
          <>{studentUser.find((student) => student.value === value)?.title}</>
        ),
      },
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
        label: enJson.bookAssigned,
        minWidth: 170,
        format: (value, row) =>
          value ? (
            <ConfirmationDialog
              title={enJson.bookReturnConfirmation}
              description={enJson.areYouWantToReturnBook}
              onSuccess={() => handleBookReturn(row?.id, row?.bookId)}
              isDelete={false}
              tooltipTitle={enJson.bookReturned}
              buttonColor={
                value && new Date(row?.returnDate as string) < new Date()
                  ? "warning"
                  : "primary"
              }
            >
              <ReadMoreIcon />
            </ConfirmationDialog>
          ) : (
            <></>
          ),
      },
    ],
    [books, handleBookReturn, studentUser]
  );

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    handleBlur,
    touched,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="flex flex-col gap-8">
      <HeadingText>{enJson.assignedBookManagement}</HeadingText>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-3 items-start"
      >
        <SelectField
          id="studentId"
          name="studentId"
          label={enJson.student}
          value={values.studentId}
          onChange={handleChange}
          onBlur={handleBlur}
          menuList={studentUser}
          error={touched.studentId && !!errors.studentId}
          helperText={touched.studentId && errors.studentId}
        />

        <SelectField
          id="bookId"
          name="bookId"
          label={enJson.book}
          value={values.bookId}
          onChange={handleChange}
          onBlur={handleBlur}
          menuList={booksList}
          error={touched.bookId && !!errors.bookId}
          helperText={touched.bookId && errors.bookId}
        />

        <InputField
          id="issueDate"
          label={enJson.issueDate}
          type="date"
          name="issueDate"
          value={values.issueDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.issueDate && !!errors.issueDate}
          helperText={touched.issueDate && errors.issueDate}
          InputLabelProps={{
            shrink: true,
          }}
          disabled
        />

        <InputField
          id="returnDate"
          label={enJson.returnDate}
          type="date"
          name="returnDate"
          value={values.returnDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.returnDate && !!errors.returnDate}
          helperText={touched.returnDate && errors.returnDate}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div className="w-full flex gap-3 justify-end xl:col-start-5 md:col-start-3 col-start-1 xl:col-span-1 col-span-2">
          <ButtonComponent
            tooltipTitle={enJson.submit}
            type="submit"
            className="h-14 min-w-24"
          >
            <PlaylistAddIcon />
          </ButtonComponent>

          <ButtonComponent
            tooltipTitle={enJson.reset}
            type="button"
            onClick={() => resetForm()}
            variant="outlined"
            className="h-14 min-w-24"
          >
            <CancelPresentationIcon />
          </ButtonComponent>
        </div>
      </form>

      {/* Book List */}
      <TableComponent
        columns={columns}
        rows={_.orderBy(
          assignedBooks.filter((assignedBook) => assignedBook.isAssigned),
          ["returnDate"]
        )}
        noTableData={enJson.noAssignedBooksAvailable}
      />
    </div>
  );
};

export default memo(AssignedBoolList);
