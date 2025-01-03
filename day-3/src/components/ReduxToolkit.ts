import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskWithDesc } from "../types";

const initialState: {
  tasks: TaskWithDesc[];
} = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    },
  },
});

export const { addTask, deleteTask, toggleTask } = todoSlice.actions;
export default todoSlice.reducer;
