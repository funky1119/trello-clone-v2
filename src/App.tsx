import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, boardListState } from "./state/atorms";
import Board from "./components/Board";

function App() {
  const [boardList, setBoardList] = useRecoilState(boardListState);

  // destination 종료 위치 정보, source: 시작 위치 정보
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;

    if (!destination) return;

    setBoardList((board) => {
      if (source.droppableId === destination.droppableId) {
        const copyBoard = [...board[source.droppableId]];
        const moveTodo = copyBoard.splice(source.index, 1); // 드롭할 정보의 Index 삭제

        copyBoard.splice(destination?.index, 0, ...moveTodo); // // 드롭한 위치에 정보 추가
        return { ...board, [source.droppableId]: copyBoard };
      }

      if (source.droppableId !== destination.droppableId) {
        const oldBoard = [...board[source.droppableId]];
        const targetBoard = [...board[destination.droppableId]];
        const moveTodo = oldBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, ...moveTodo);
        return {
          ...board,
          [source.droppableId]: oldBoard,
          [destination.droppableId]: targetBoard,
        };
      }
      return board;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(boardList).map((boardId) => (
            <Board key={boardId} toDos={boardList[boardId]} boardId={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
