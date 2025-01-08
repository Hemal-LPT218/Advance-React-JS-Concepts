import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook, IBookState } from "../types";

const initialState: IBookState = {
  books: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<IBook>) => {
      state.books.push(action.payload);
    },

    editBook: (state, action: PayloadAction<IBook>) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );

      state.books[index] = action.payload;
    },

    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export const { addBook, editBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;
