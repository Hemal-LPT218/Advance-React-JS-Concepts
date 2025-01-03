import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  handleToggleTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  handleToggleTask,
  handleDeleteTask,
}) => {
  return (
    <ul className="flex flex-col items-center gap-5 w-full">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          handleToggleTask={handleToggleTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
