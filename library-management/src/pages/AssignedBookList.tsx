import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { IAssignedBook } from "../types";
import enJson from "../locales/en.json";
import HeadingText from "../components/HeadingText";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import TableComponent, { Column } from "../components/TableComponent";
import SelectField from "../components/SelectField";
import { ACCOUNT_TYPE } from "../constants";
import { Switch } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import {
  addAssignedBookWithBookUpdate,
  updateAssignedBookWithBookUpdate,
} from "../store/thunkForAssignedBooks";
import { toast } from "react-toastify";

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

  const handleSwitchChange = useCallback(
    (checked: boolean, id?: string, bookId?: string) => {
      dispatch(updateAssignedBookWithBookUpdate({ id, checked, bookId }));

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
          <>{booksList.find((book) => book.value === value)?.title}</>
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
      },
      {
        id: "isAssigned",
        label: enJson.bookAssigned,
        minWidth: 170,
        format: (value, row) => (
          <Switch
            checked={value as boolean}
            onChange={(
              _: React.ChangeEvent<HTMLInputElement>,
              checked: boolean
            ) => handleSwitchChange(checked, row?.id, row?.bookId)}
          />
        ),
      },
    ],
    [booksList, handleSwitchChange, studentUser]
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
      <form onSubmit={handleSubmit} className="flex gap-3 items-start">
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
          className="w-full"
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
          className="w-full"
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
          className="w-full"
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
          className="w-full"
        />

        <ButtonComponent type="submit" className="!w-1/3">
          {enJson.submit}
        </ButtonComponent>
        <ButtonComponent
          type="button"
          onClick={() => resetForm()}
          variant="outlined"
          className="!w-1/3"
        >
          {enJson.reset}
        </ButtonComponent>
      </form>

      {/* Book List */}
      <TableComponent
        columns={columns}
        rows={assignedBooks}
        noTableData={enJson.noAssignedBooksAvailable}
      />
    </div>
  );
};

export default memo(AssignedBoolList);
