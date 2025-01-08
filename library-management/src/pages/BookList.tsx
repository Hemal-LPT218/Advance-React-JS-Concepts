import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormikErrors, FormikHelpers, useFormik } from "formik";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { IBook } from "../types";
import TableComponent, { Column } from "../components/TableComponent";
import ButtonComponent from "../components/ButtonComponent";
import HeadingText from "../components/HeadingText";
import InputField from "../components/InputField";
import { addBook, editBook } from "../store/bookSlice";
import { AppDispatch, RootState } from "../store/store";
import { deleteBookWithAssignedBookUpdate } from "../store/thunkForBooks";
import enJson from "../locales/en.json";

const initialValues: IBook = {
  id: "",
  title: "",
  description: "",
  quantity: 0,
  author: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required(enJson.titleRequired),
  description: Yup.string().required(enJson.descriptionRequired),
  quantity: Yup.number()
    .required(enJson.quantityRequired)
    .min(1, enJson.quantityMust),
  author: Yup.string().required(enJson.authorRequired),
});

const columns: Column<IBook>[] = [
  { id: "title", label: enJson.title, minWidth: 170 },
  { id: "description", label: enJson.description, minWidth: 170 },
  {
    id: "quantity",
    label: enJson.quantity,
    minWidth: 100,
    format: (value) => (
      <Typography color={!value ? "warning" : ""} className="!text-sm">
        {value}
      </Typography>
    ),
  },
  {
    id: "author",
    label: enJson.author,
    minWidth: 170,
  },
];

const BookList: React.FC = () => {
  const books = useSelector((state: RootState) => state.book.books);

  const assignedBooks = useSelector(
    (state: RootState) => state.assignedBook.assignedBooks
  );

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = useCallback(
    (values: IBook, { resetForm }: FormikHelpers<IBook>) => {
      if (values.id) {
        dispatch(editBook(values));

        toast.success(enJson.bookCreated);
      } else {
        dispatch(addBook({ ...values, id: uuidv4() }));

        toast.success(enJson.bookUpdated);
      }
      resetForm();
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (
      book: IBook,
      setValues: (
        values: React.SetStateAction<IBook>,
        shouldValidate?: boolean
      ) => Promise<void> | Promise<FormikErrors<IBook>>
    ) => {
      setValues(book);
    },
    []
  );

  const handleDelete = useCallback(
    (id: string) => {
      const assignedBookExist = assignedBooks.find(
        (assignedBook) => assignedBook.bookId === id && assignedBook.isAssigned
      );

      if (assignedBookExist) {
        toast.error(enJson.bookAssignedSomeone);

        return;
      }

      dispatch(deleteBookWithAssignedBookUpdate({ bookId: id }));

      toast.success(enJson.bookDeleted);
    },
    [assignedBooks, dispatch]
  );

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    handleBlur,
    touched,
    resetForm,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="flex flex-col gap-8">
      <HeadingText>{enJson.bookManagement}</HeadingText>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-3 items-start"
      >
        <InputField
          id="title"
          label={enJson.title}
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && !!errors.title}
          helperText={touched.title && errors.title}
        />

        <InputField
          id="description"
          label={enJson.description}
          type="text"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && !!errors.description}
          helperText={touched.description && errors.description}
        />

        <InputField
          id="quantity"
          label={enJson.quantity}
          type="number"
          name="quantity"
          value={values.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.quantity && !!errors.quantity}
          helperText={touched.quantity && errors.quantity}
        />

        <InputField
          id="author"
          label={enJson.author}
          type="text"
          name="author"
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.author && !!errors.author}
          helperText={touched.author && errors.author}
        />

        <div className="w-full flex gap-3 justify-end xl:col-start-5 md:col-start-3 col-start-1 xl:col-span-1 col-span-2">
          <ButtonComponent type="submit" className="h-14 min-w-24">
            {values.id ? enJson.update : enJson.submit}
          </ButtonComponent>

          <ButtonComponent
            type="button"
            onClick={() => resetForm()}
            variant="outlined"
            className="h-14 min-w-24"
          >
            {enJson.reset}
          </ButtonComponent>
        </div>
      </form>

      {/* Book List */}
      <TableComponent
        columns={columns}
        rows={books}
        showAction
        onEdit={(row) => handleEdit(row, setValues)}
        onDelete={(row) => handleDelete(row.id)}
        noTableData={enJson.noBooksAvailable}
        deleteDescription={enJson.areYouWantToDeleteBook}
      />
    </div>
  );
};

export default memo(BookList);
