import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAssignBookInBulk } from "./assignedBookSlice";
import { deleteAccount } from "./userSlice";
import { RootState } from "./store";

// Thunk to delete an book and delete assigned book
export const deleteUserWithAssignedBookUpdate = createAsyncThunk(
  "users/deleteWithAssignedBookUpdate",
  async ({ userId }: { userId: string }, { dispatch, getState }) => {
    const state = getState() as RootState;

    const assignedBookIds = state.assignedBook.assignedBooks
      .filter((assignedBook) => assignedBook.studentId === userId)
      .map((assignedBook) => assignedBook.id);

    dispatch(deleteAccount(userId));

    dispatch(deleteAssignBookInBulk({ ids: assignedBookIds }));
  }
);
