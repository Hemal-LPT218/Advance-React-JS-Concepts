import React, { memo } from "react";
import { IAction, Task } from "../types";
import { ACTION_TYPE } from "../constant";

interface TaskItemProps {
  task: Task;
  dispatch: React.Dispatch<IAction>;
}

const TaskItem: React.FC<TaskItemProps> = memo(({ task, dispatch }) => {
  return (
    <li
      className={`max-w-2xl w-full flex justify-between items-center gap-5 p-3 rounded-lg border-2 ${
        task.completed
          ? "bg-green-200 border-green-700"
          : "bg-orange-200 border-orange-700"
      }`}
    >
      <span
        onClick={() =>
          dispatch({ type: ACTION_TYPE.TOGGLE_TASK, taskId: task.id })
        }
        className={`text-xl font-bold text-indigo-800 cursor-pointer min-w-60 text-left`}
      >
        {task.text}
      </span>
      <button
        className="bg-red-700 text-white font-semibold p-2 rounded-lg"
        onClick={() =>
          dispatch({ type: ACTION_TYPE.DELETE_TASK, taskId: task.id })
        }
      >
        Delete
      </button>
    </li>
  );
});

export default TaskItem;
