import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormikErrors, FormikHelpers, useFormik } from "formik";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import EditNoteIcon from "@mui/icons-material/EditNote";
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
import _ from "lodash";

interface IFormData extends IBook {
  quantityDiff: number;
}

const initialValues: IFormData = {
  id: "",
  title: "",
  description: "",
  quantity: 0,
  author: "",
  actualQuantity: 0,
  quantityDiff: 0,
};

const validationSchema = Yup.object({
  title: Yup.string().required(enJson.titleRequired),
  description: Yup.string().required(enJson.descriptionRequired),
  quantity: Yup.number()
    .required(enJson.quantityRequired)
    .min(1, enJson.quantityMust),
  author: Yup.string().required(enJson.authorRequired),
});

const columns: Column<IFormData>[] = [
  { id: "title", label: enJson.title, minWidth: 170 },
  { id: "description", label: enJson.description, minWidth: 170 },
  {
    id: "actualQuantity",
    label: enJson.quantity,
    minWidth: 100,
  },
  {
    id: "quantity",
    label: enJson.currentQuantity,
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

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = useCallback(
    (
      values: IFormData,
      { resetForm, setFieldError }: FormikHelpers<IFormData>
    ) => {
      if (values.id) {
        if (!(values.actualQuantity - values.quantityDiff)) {
          setFieldError("actualQuantity", enJson.assignedMoreThanQuantity);
          return;
        }

        const valuesWithoutQuantityDiff = _.omit(values, ["quantityDiff"]);
        
        dispatch(
          editBook({
            ...valuesWithoutQuantityDiff,
            quantity: values.actualQuantity - values.quantityDiff,
          })
        );

        toast.success(enJson.bookUpdated);
      } else {
        const valuesWithoutQuantityDiff = _.omit(values, ["quantityDiff"]);

        dispatch(
          addBook({
            ...valuesWithoutQuantityDiff,
            id: uuidv4(),
            quantity: values.actualQuantity,
          })
        );

        toast.success(enJson.bookCreated);
      }
      resetForm();
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (
      book: IFormData,
      setValues: (
        values: React.SetStateAction<IFormData>,
        shouldValidate?: boolean
      ) => Promise<void> | Promise<FormikErrors<IFormData>>
    ) => {
      setValues(book);
    },
    []
  );

  const handleDelete = useCallback(
    (selectedBook: IFormData) => {
      if (selectedBook.actualQuantity !== selectedBook.quantity) {
        toast.error(enJson.bookAssignedSomeone);

        return;
      }

      dispatch(deleteBookWithAssignedBookUpdate({ bookId: selectedBook.id }));

      toast.success(enJson.bookDeleted);
    },
    [dispatch]
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
          id="actualQuantity"
          label={enJson.quantity}
          type="number"
          name="actualQuantity"
          value={values.actualQuantity}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.actualQuantity && !!errors.actualQuantity}
          helperText={touched.actualQuantity && errors.actualQuantity}
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
          <ButtonComponent
            tooltipTitle={values.id ? enJson.update : enJson.submit}
            type="submit"
            className="h-14 min-w-24"
          >
            {values.id ? <EditNoteIcon /> : <PlaylistAddIcon />}
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
        rows={books.map((book) => ({
          ...book,
          quantityDiff: book.actualQuantity - book.quantity,
        }))}
        showAction
        onEdit={(row) => handleEdit(row, setValues)}
        onDelete={(row) => handleDelete(row)}
        noTableData={enJson.noBooksAvailable}
        deleteDescription={enJson.areYouWantToDeleteBook}
      />
    </div>
  );
};

export default memo(BookList);
