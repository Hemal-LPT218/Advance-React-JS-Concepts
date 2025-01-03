import { ACTION_TYPE } from "../constant";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface IState {
  tasks: Task[];
}

export type IAction =
  | { type: ACTION_TYPE.ADD_TASK; task: Task }
  | { type: ACTION_TYPE.DELETE_TASK; taskId: string }
  | { type: ACTION_TYPE.TOGGLE_TASK; taskId: string };
