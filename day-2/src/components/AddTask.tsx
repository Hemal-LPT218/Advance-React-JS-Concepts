import React, { memo, useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { IAction } from "../types";
import { ACTION_TYPE } from "../constant";

interface AddTaskProps {
  dispatch: React.Dispatch<IAction>;
}

const AddTask: React.FC<AddTaskProps> = memo(({ dispatch }) => {
  const taskTextRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    taskTextRef.current?.focus();
  }, []);

  const handleAddTask = useCallback(() => {
    if (taskTextRef.current && taskTextRef.current.value.trim()) {
      dispatch({
        type: ACTION_TYPE.ADD_TASK,
        task: {
          id: uuidv4(),
          text: taskTextRef.current.value.trim(),
          completed: false,
        },
      });
      taskTextRef.current.value = "";
      taskTextRef.current.focus();
    }
  }, [dispatch]);

  return (
    <div className="flex justify-center gap-8 max-w-2xl w-full">
      <input
        type="text"
        ref={taskTextRef}
        placeholder="Add a new task"
        className="p-3 rounded-lg w-full focus-visible:outline-sky-700"
      />
      <button
        onClick={handleAddTask}
        className="bg-sky-600 text-white font-bold p-3 rounded-lg whitespace-nowrap"
      >
        Add Task
      </button>
    </div>
  );
});

export default AddTask;
