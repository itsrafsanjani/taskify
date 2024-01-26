import React from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

const List = ({ list, cards }) => {
  return (
    <div className="bg-gray-100 p-4 rounded w-64">
      <h2 className="font-bold mb-2">{list.title}</h2>
      <Droppable droppableId={list.id} type="CARD">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[100px] space-y-2"
          >
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
