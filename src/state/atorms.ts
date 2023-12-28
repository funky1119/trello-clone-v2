import { atom, selector } from "recoil";

export const toDosState = atom({
  key: "toDos",
  default: ["a", "b", "c", "d", "e"],
});
