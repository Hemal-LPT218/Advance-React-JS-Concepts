import { useState } from "react";
import AddTask from "./AddTask";
import { Task } from "../types";
import TaskList from "./TaskList";

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const totalTodoCount = () => (
    <h1 className="text-2xl font-bold text-sky-600">
      Total Task : {tasks.length}
    </h1>
  );

  const totalPendingTodoCount = () => (
    <h1 className="text-2xl font-bold text-orange-700">
      Total Pending Task : {tasks.filter((task) => !task.completed).length}
    </h1>
  );

  return (
    <div className="flex flex-col items-center gap-10 p-10 min-h-screen bg-lime-100">
      <h1 className="text-4xl font-bold text-sky-600">To-Do List</h1>
      <div className="flex gap-10">
        {totalTodoCount()}
        {totalPendingTodoCount()}
      </div>
      <AddTask handleAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleToggleTask={handleToggleTask}
      />
    </div>
  );
};

export default TodoApp;
