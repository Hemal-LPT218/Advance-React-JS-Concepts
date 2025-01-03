import { memo } from "react";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";
import { StateType } from "../store";

const TaskList = memo(() => {
  const tasks = useSelector((state: StateType) => state.todos.tasks);

  return (
    <ul className="flex flex-col items-center gap-5 w-full">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
});

export default TaskList;
