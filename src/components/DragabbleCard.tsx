import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

interface ICardProps {
  isDragging: boolean;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={`${toDoId}`} index={index}>
      {(provider, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provider.innerRef}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
        >
          {toDoText}
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
    props.isDragging ? props.theme.bgColor : props.theme.cardColor};
  color: ${(props) => (props.isDragging ? "#FFF" : "none")};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0 , 0.5)" : "none"};
`;
