import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IBoardListProps {
  [key: string]: ITodo[];
}

export const boardListState = atom<IBoardListProps>({
  key: "toDos",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
