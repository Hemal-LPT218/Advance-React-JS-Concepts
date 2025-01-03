import { memo, useMemo, useReducer } from "react";
import AddTask from "./AddTask";
import { IAction, IState } from "../types";
import TaskList from "./TaskList";
import { ACTION_TYPE } from "../constant";

const initialState: IState = {
  tasks: [],
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TASK:
      return { tasks: [...state.tasks, action.task] };
    case ACTION_TYPE.DELETE_TASK:
      return { tasks: state.tasks.filter((task) => task.id !== action.taskId) };
    case ACTION_TYPE.TOGGLE_TASK:
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.taskId
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
};

const TodoApp = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalTodoCount = useMemo(
    () => (
      <h1 className="text-2xl font-bold text-sky-600">
        Total Task : {state.tasks.length}
      </h1>
    ),
    [state.tasks.length]
  );

  const totalPendingTodoCount = useMemo(
    () => (
      <h1 className="text-2xl font-bold text-orange-700">
        Total Pending Task :{" "}
        {state.tasks.filter((task) => !task.completed).length}
      </h1>
    ),
    [state.tasks]
  );

  return (
    <div className="flex flex-col items-center gap-10 p-10 min-h-screen bg-lime-100">
      <h1 className="text-4xl font-bold text-sky-600">To-Do List</h1>
      <div className="flex gap-10">
        {totalTodoCount}
        {totalPendingTodoCount}
      </div>
      <AddTask dispatch={dispatch} />
      <TaskList tasks={state.tasks} dispatch={dispatch} />
    </div>
  );
});

export default TodoApp;
