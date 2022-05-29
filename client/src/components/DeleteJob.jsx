// Lib
import { Droppable } from "react-beautiful-dnd";

function DeleteJob() {
  return (
    <Droppable droppableId={"DELETE"}>
      {(provided, snapshot) => (
        <div
          className={`absolute bottom-0 left-0 m-5 p-2  border-dotted border-2 ${
            snapshot.isDraggingOver ? "border-red-700" : "border-gray-300"
          } `}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
          {...provided.droppableProps}
        >
          <div className="w-80 h-20 flex items-center justify-center text-gray-300">
            Delete
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DeleteJob;
