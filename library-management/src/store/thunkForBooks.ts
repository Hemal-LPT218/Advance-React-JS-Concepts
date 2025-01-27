import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAssignBookInBulk } from "./assignedBookSlice";
import { deleteBook } from "./bookSlice";
import { RootState } from "./store";

// Thunk to delete an book and delete assigned book
export const deleteBookWithAssignedBookUpdate = createAsyncThunk(
  "books/deleteWithAssignedBookUpdate",
  async ({ bookId }: { bookId: string }, { dispatch, getState }) => {
    const state = getState() as RootState;

    const assignedBookIds = state.assignedBook.assignedBooks
      .filter((assignedBook) => assignedBook.bookId === bookId)
      .map((assignedBook) => assignedBook.id);

    dispatch(deleteBook(bookId));

    dispatch(deleteAssignBookInBulk({ ids: assignedBookIds }));
  }
);
