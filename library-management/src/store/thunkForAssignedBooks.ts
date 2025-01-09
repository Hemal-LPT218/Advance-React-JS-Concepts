import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAssignedBook, IBook } from "../types";
import { addAssignBook, updateAssignBook } from "./assignedBookSlice";
import { editBook } from "./bookSlice";
import { RootState } from "./store";

// Thunk to add an assigned book and decrease book quantity
export const addAssignedBookWithBookUpdate = createAsyncThunk(
  "assignedBooks/addWithBookUpdate",
  async (
    { assignedBook, bookId }: { assignedBook: IAssignedBook; bookId: string },
    { dispatch, getState }
  ) => {
    const state = getState() as RootState;

    const book = state.book.books.find((b: IBook) => b.id === bookId);

    if (book && book.quantity > 0) {
      dispatch(addAssignBook(assignedBook));

      dispatch(editBook({ ...book, quantity: book.quantity - 1 }));
    }
  }
);

// Thunk to update an assigned book and adjust book quantity
export const updateAssignedBookWithBookUpdate = createAsyncThunk(
  "assignedBooks/updateWithBookUpdate",
  async (
    { id, bookId }: { id?: string; bookId?: string },
    { dispatch, getState }
  ) => {
    const state = getState() as RootState;

    const book = state.book.books.find((b: IBook) => b.id === bookId);

    if (book) {
      dispatch(updateAssignBook({ id }));

      dispatch(editBook({ ...book, quantity: book.quantity + 1 }));
    }
  }
);
