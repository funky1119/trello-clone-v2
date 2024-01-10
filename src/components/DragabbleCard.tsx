import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import { boardListState } from "../state/atorms";
import { useSetRecoilState } from "recoil";

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  boardId: string;
  index: number;
}

interface ICardProps {
  $isDragging: boolean;
}

function DragabbleCard({
  toDoId,
  toDoText,
  boardId,
  index,
}: IDragabbleCardProps) {
  const setBoardList = useSetRecoilState(boardListState);

  const handleDelete = () => {
    setBoardList((prev): any => {
      return {
        ...prev,
        [boardId]: prev[boardId].filter((board) => board.id !== toDoId),
      };
    });
  };

  return (
    <Draggable draggableId={`${toDoId}`} index={index}>
      {(provider, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          ref={provider.innerRef}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
        >
          {toDoText}
          <DeleteButton onClick={handleDelete}>
            <DeleteIcon>🗑️</DeleteIcon>
          </DeleteButton>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);

const Card = styled.div<ICardProps>`
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.$isDragging ? props.theme.bgColor : props.theme.cardColor};
  color: ${(props) => (props.$isDragging ? "#FFF" : "none")};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 5px rgba(0, 0, 0 , 0.5)" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    button {
      display: block;
    }
  }
`;

const DeleteButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  display: none;
`;

const DeleteIcon = styled.span`
  margin: 0 auto;
  margin-right: 0;
  font-size: 9px;

  &:active {
    background-color: #9b2727;
  }
`;
