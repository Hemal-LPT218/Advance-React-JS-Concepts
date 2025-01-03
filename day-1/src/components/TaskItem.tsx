import React from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  handleToggleTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  handleToggleTask,
  handleDeleteTask,
}) => {
  return (
    <li
      className={`max-w-2xl w-full flex justify-between items-center gap-5 p-3 rounded-lg border-2 ${
        task.completed
          ? "bg-green-200 border-green-700"
          : "bg-orange-200 border-orange-700"
      }`}
    >
      <span
        onClick={() => handleToggleTask(task.id)}
        className={`text-xl font-bold text-indigo-800 cursor-pointer min-w-60 text-left`}
      >
        {task.text}
      </span>
      <button
        className="bg-red-700 text-white font-semibold p-2 rounded-lg"
        onClick={() => handleDeleteTask(task.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
