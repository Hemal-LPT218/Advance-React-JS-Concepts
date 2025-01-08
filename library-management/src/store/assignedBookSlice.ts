import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAssignedBook, IAssignedBookState } from "../types";

const initialState: IAssignedBookState = {
  assignedBooks: [],
};

const assignedBookSlice = createSlice({
  name: "assignedBook",
  initialState,
  reducers: {
    addAssignBook: (state, action: PayloadAction<IAssignedBook>) => {
      state.assignedBooks.push(action.payload);
    },

    updateAssignBook: (
      state,
      action: PayloadAction<{ id?: string; checked: boolean }>
    ) => {
      const newAssignedBooks = state.assignedBooks.findIndex(
        (assignedBook) => assignedBook.id === action.payload.id
      );

      state.assignedBooks[newAssignedBooks].isAssigned = action.payload.checked;
    },

    deleteAssignBookInBulk: (
      state,
      action: PayloadAction<{ ids: string[] }>
    ) => {
      const newAssignedBooks = state.assignedBooks.filter(
        (assignedBook) => !action.payload.ids.includes(assignedBook.id)
      );

      state.assignedBooks = newAssignedBooks;
    },
  },
});

export const { addAssignBook, updateAssignBook, deleteAssignBookInBulk } =
  assignedBookSlice.actions;
export default assignedBookSlice.reducer;
