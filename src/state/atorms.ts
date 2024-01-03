import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface ITodo {
  id: number;
  text: string;
  boardId: string;
}

export interface IBoardListProps {
  [key: string]: ITodo[];
}

export const boardListState = atom<IBoardListProps>({
  key: "toDos",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
