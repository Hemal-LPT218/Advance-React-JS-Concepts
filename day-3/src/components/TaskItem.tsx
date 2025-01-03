import React, { memo } from "react";
import { TaskWithDesc } from "../types";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "./ReduxToolkit";

interface TaskItemProps {
  task: TaskWithDesc;
}

const TaskItem: React.FC<TaskItemProps> = memo(({ task }) => {
  const dispatch = useDispatch();

  return (
    <li
      className={`max-w-2xl w-full flex justify-between items-center gap-5 p-3 rounded-lg border-2 ${
        task.completed
          ? "bg-green-200 border-green-700"
          : "bg-orange-200 border-orange-700"
      }`}
    >
      <div
        className="flex flex-col gap-2 cursor-pointer min-w-60"
        onClick={() => dispatch(toggleTask(task.id))}
      >
        <span className={`text-xl font-bold text-indigo-800`}>
          {task.title}
        </span>
        <span className={`text-base font-normal text-indigo-800`}>
          {task.description}
        </span>
      </div>
      <button
        className="bg-red-700 text-white font-semibold p-2 rounded-lg"
        onClick={() => dispatch(deleteTask(task.id))}
      >
        Delete
      </button>
    </li>
  );
});

export default TaskItem;
