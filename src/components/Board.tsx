import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { ITodo, boardListState } from "../state/atorms";
import { useSetRecoilState } from "recoil";

interface BoardProps {
  toDos: ITodo[];
  boardId: string;
}
interface AraaProps {
  $isDraggingOver: boolean;
  $draggingFromThisWith: boolean;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: BoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setBoardList = useSetRecoilState(boardListState);

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
      boardId,
    };

    setBoardList((prev) => ({
      ...prev,
      [boardId]: [newToDo, ...prev[boardId]],
    }));

    setValue("toDo", "");
  };

  const handleDeleteBoard = () => {
    setBoardList((prev): any => {
      const keys = Object.keys(prev).filter((item) => item !== boardId);

      const newBoardList: Record<string, ITodo[]> = {};
      keys.forEach((item) => (newBoardList[item] = prev[item]));

      return newBoardList;
    });
  };

  return (
    <Wrapper>
      <TitleWrap>
        <div />
        <Title>{boardId}</Title>
        <DeleteBtn onClick={handleDeleteBoard}>X</DeleteBtn>
      </TitleWrap>
      <Form onSubmit={handleSubmit(onValid)}>
        <AddTodo
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provider, snapshot) => (
          <Area
            $draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            $isDraggingOver={snapshot.isDraggingOver}
            ref={provider.innerRef}
            {...provider.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                boardId={toDo.boardId}
                index={index}
              />
            ))}
            {provider.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;

const Wrapper = styled.div`
  padding: 10px 0px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 5px;
  margin-bottom: 10px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;
const DeleteBtn = styled.button`
  border: 0;
  &:hover {
    opacity: 0.5;
  }
`;
const Area = styled.div<AraaProps>`
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#dfe6e9"
      : props.$draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px 10px;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 10px;
`;
const AddTodo = styled.input`
  width: 100%;
  display: block;
  padding: 5px 10px;
  border-radius: 5px;
  border: 0;
`;
