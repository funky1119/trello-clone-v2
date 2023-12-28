import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

interface IDragabbleCardProps {
  todo: string;
  index: number;
}

function DragabbleCard({ todo, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={todo} index={index}>
      {(drag) => (
        <Card
          ref={drag.innerRef}
          {...drag.draggableProps}
          {...drag.dragHandleProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);

const Card = styled.div`
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
