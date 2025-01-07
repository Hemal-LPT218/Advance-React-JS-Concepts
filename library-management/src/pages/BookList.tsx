import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addBook, editBook } from "../store/bookSlice";
import { v4 as uuidv4 } from "uuid";
import { FormikErrors, FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { IBook } from "../types";
import enJson from "../locales/en.json";
import HeadingText from "../components/HeadingText";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import TableComponent, { Column } from "../components/TableComponent";
import { toast } from "react-toastify";
import { deleteBookWithAssignedBookUpdate } from "../store/thunkForBooks";

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

  const handleDelete = (id: string) => {
    if (window.confirm(enJson.areYouWantToDeleteBook)) {
      const assignedBookExist = assignedBooks.find(
        (assignedBook) => assignedBook.bookId === id && assignedBook.isAssigned
      );

      if (assignedBookExist) {
        toast.error(enJson.bookAssignedSomeone);
        return;
      }

      dispatch(deleteBookWithAssignedBookUpdate({ bookId: id }));

      toast.success(enJson.bookDeleted);
    }
  };

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
      <form onSubmit={handleSubmit} className="flex gap-3 items-start">
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

        <ButtonComponent type="submit">{enJson.submit}</ButtonComponent>
        <ButtonComponent
          type="button"
          onClick={() => resetForm()}
          variant="outlined"
        >
          {enJson.reset}
        </ButtonComponent>
      </form>

      {/* Book List */}
      <TableComponent
        columns={columns}
        rows={books}
        showAction
        onEdit={(row) => handleEdit(row, setValues)}
        onDelete={(row) => handleDelete(row.id)}
        noTableData={enJson.noBooksAvailable}
      />
    </div>
  );
};

export default memo(BookList);
