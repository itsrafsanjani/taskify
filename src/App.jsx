import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";
import { initialData } from "./initialData"; // Assuming you store initialData in a separate file

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startList = data.lists.find((list) => list.id === source.droppableId);
    const finishList = data.lists.find(
      (list) => list.id === destination.droppableId
    );

    // Moving within the same list
    if (startList === finishList) {
      const newList = Array.from(startList.cardIds);
      newList.splice(source.index, 1);
      newList.splice(destination.index, 0, draggableId);

      const updatedList = {
        ...startList,
        cardIds: newList,
      };

      const newState = {
        ...data,
        lists: data.lists.map((list) =>
          list.id === updatedList.id ? updatedList : list
        ),
      };

      setData(newState);
      return;
    }

    // Moving from one list to another
    const startCardIds = Array.from(startList.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...startList,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finishList.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishList,
      cardIds: finishCardIds,
    };

    const newState = {
      ...data,
      lists: data.lists.map((list) => {
        if (list.id === newStart.id) {
          return newStart;
        } else if (list.id === newFinish.id) {
          return newFinish;
        } else {
          return list;
        }
      }),
    };

    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto p-4 space-x-4">
        {data.lists.map((list) => (
          <Droppable droppableId={list.id} key={list.id}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <List
                  list={list}
                  cards={data.cards.filter((card) =>
                    list.cardIds.includes(card.id)
                  )}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;
