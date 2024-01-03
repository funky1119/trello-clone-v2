import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IBoardListProps, boardListState } from "./state/atorms";
import Board from "./components/Board";
import { useForm } from "react-hook-form";

interface ICategory {
  cate: string;
}

function App() {
  const { register, handleSubmit } = useForm<ICategory>();
  const [boardList, setBoardList] = useRecoilState(boardListState);

  // destination 종료 위치 정보, source: 시작 위치 정보
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;

    setBoardList((board) => {
      if (source.droppableId === destination.droppableId) {
        const copyBoard = [...board[source.droppableId]];
        const moveTodo = copyBoard.splice(source.index, 1);

        copyBoard.splice(destination?.index, 0, ...moveTodo); // // 드롭한 위치에 정보 추가
        return { ...board, [source.droppableId]: copyBoard };
      }

      if (source.droppableId !== destination.droppableId) {
        const oldBoard = [...board[source.droppableId]];
        const targetBoard = [...board[destination.droppableId]];
        const moveTodo = oldBoard.splice(source.index, 1).map((item) => ({
          ...item,
          boardId: destination.droppableId,
        }));
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

  const handleAddCategory = ({ cate }: ICategory) => {
    const categoryCheck = Object.keys(boardList).filter(
      (item) => item === cate
    );
    if (categoryCheck.length > 0) return;

    setBoardList((prev) => ({
      ...prev,
      [cate]: [],
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <CategoryWrapper onSubmit={handleSubmit(handleAddCategory)}>
          <CategoryInput
            {...register("cate")}
            placeholder="카테고리를 입력하세요."
          />
          <CatgegoryButton>추가</CatgegoryButton>
        </CategoryWrapper>

        <Wrapper>
          <Boards>
            {Object.keys(boardList).map((boardId) => (
              <Board
                key={boardId}
                toDos={boardList[boardId]}
                boardId={boardId}
              />
            ))}
          </Boards>
        </Wrapper>
      </Container>
    </DragDropContext>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CategoryWrapper = styled.form`
  margin: 0 auto;
  margin: 150px 0 30px;
`;
const CategoryInput = styled.input`
  border-radius: 5px;
  border: 0;
  padding: 10px 20px;
  width: 250px;
`;

const CatgegoryButton = styled.button`
  border-radius: 5px;
  border: 0;
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #abf32f;
  &:hover {
    background-color: #bff267;
  }
  &:active {
    background-color: #a5f618;
  }
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
