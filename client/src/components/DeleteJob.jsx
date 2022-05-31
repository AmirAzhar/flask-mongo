// Lib
import { Droppable } from "react-beautiful-dnd";

function DeleteJob() {
  return (
    <Droppable droppableId={"DELETE"}>
      {(provided, snapshot) => (
        <div
          className={`absolute bottom-0 left-0 m-5 p-2 w-80 h-20 border-2 flex items-center justify-center ${
            snapshot.isDraggingOver
              ? "border-red-700 border-solid"
              : "border-gray-300 border-dotted"
          }`}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
          {...provided.droppableProps}
        >
          <div className=" text-gray-300 text-center">Delete</div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DeleteJob;
