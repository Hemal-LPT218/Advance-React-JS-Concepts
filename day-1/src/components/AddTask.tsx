import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types";

interface AddTaskProps {
  handleAddTask: (newTask: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ handleAddTask }) => {
  const [taskText, setTaskText] = useState<string>("");

  const handleAddNewTask = () => {
    if (taskText.trim()) {
      handleAddTask({
        id: uuidv4(),
        text: taskText.trim(),
        completed: false,
      });
      setTaskText("");
    }
  };

  return (
    <div className="flex justify-center gap-8 max-w-2xl w-full">
      <input
        type="text"
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
        placeholder="Add a new task"
        className="p-3 rounded-lg w-full focus-visible:outline-sky-700"
      />
      <button
        onClick={handleAddNewTask}
        className="bg-sky-600 text-white font-bold p-3 rounded-lg whitespace-nowrap"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
