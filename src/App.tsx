import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDosState } from "./state/atorms";
import DragabbleCard from "./components/DragabbleCard";

function App() {
  const [toDos, setTodos] = useRecoilState(toDosState);

  // destination 종료 위치 정보, source: 시작 위치 정보
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;

    setTodos((oldToDos) => {
      const copyToDos = [...oldToDos];

      // 드롭할 정보의 Index 삭제
      copyToDos.splice(source.index, 1);
      // 드롭한 위치에 정보 추가
      copyToDos.splice(destination?.index, 0, draggableId);

      return copyToDos;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(drop) => (
              <Board ref={drop.innerRef} {...drop.droppableProps}>
                {toDos.map((todo, index) => (
                  <DragabbleCard key={todo} todo={todo} index={index} />
                ))}
                {drop.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
