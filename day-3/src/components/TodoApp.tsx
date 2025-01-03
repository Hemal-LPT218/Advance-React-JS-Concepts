import { memo, useMemo } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";
import { StateType } from "../store";

const TodoApp = memo(() => {
  const tasks = useSelector((state: StateType) => state.todos.tasks);

  const totalTodoCount = useMemo(() => {
    return (
      <h1 className="text-2xl font-bold text-sky-600">
        Total Task : {tasks.length}
      </h1>
    );
  }, [tasks.length]);

  const totalPendingTodoCount = useMemo(() => {
    return (
      <h1 className="text-2xl font-bold text-orange-700">
        Total Pending Task : {tasks.filter((task) => !task.completed).length}
      </h1>
    );
  }, [tasks]);

  return (
    <div className="flex flex-col items-center gap-10 p-10 min-h-screen bg-lime-100">
      <h1 className="text-4xl font-bold text-sky-600">To-Do List</h1>
      <div className="flex gap-10">
        {totalTodoCount}
        {totalPendingTodoCount}
      </div>
      <AddTask />
      <TaskList />
    </div>
  );
});

export default TodoApp;
