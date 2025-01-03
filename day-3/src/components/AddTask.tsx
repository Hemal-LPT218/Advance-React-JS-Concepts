import { memo, useCallback, useState } from "react";
import { addTask } from "./ReduxToolkit";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const AddTask = memo(() => {
  const [taskText, setTaskText] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const dispatch = useDispatch();

  const handleTextChange = useCallback((value: string) => {
    setTaskText(value);
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setTaskDescription(value);
  }, []);

  const handleAddTask = useCallback(() => {
    dispatch(
      addTask({
        id: uuidv4(),
        title: taskText.trim(),
        description: taskDescription.trim(),
        completed: false,
      })
    );
    setTaskText("");
    setTaskDescription("");
  }, [dispatch, taskDescription, taskText]);

  return (
    <div className="flex flex-col justify-center gap-5 max-w-2xl w-full">
      <input
        type="text"
        value={taskText}
        onChange={(event) => handleTextChange(event.target.value)}
        placeholder="Add a new task"
        className="p-3 rounded-lg w-full focus-visible:outline-sky-700"
      />
      <textarea
        value={taskDescription}
        onChange={(event) => handleDescriptionChange(event.target.value)}
        placeholder="Add a task description..."
        className="p-3 rounded-lg w-full focus-visible:outline-sky-700"
      />
      <button
        onClick={handleAddTask}
        className="bg-sky-600 disabled:bg-gray-200 text-white disabled:text-neutral-800 font-bold p-3 rounded-lg whitespace-nowrap"
        disabled={!taskText || !taskDescription}
      >
        Add Task
      </button>
    </div>
  );
});

export default AddTask;
