import React, { memo } from "react";
import TaskItem from "./TaskItem";
import { IAction, Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  dispatch: React.Dispatch<IAction>;
}

const TaskList: React.FC<TaskListProps> = memo(({ tasks, dispatch }) => {
  return (
    <ul className="flex flex-col items-center gap-5 w-full">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} dispatch={dispatch} />
      ))}
    </ul>
  );
});

export default TaskList;
