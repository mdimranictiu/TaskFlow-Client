import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = [
  { _id: "1", title: "Task 1", category: "todo" },
  { _id: "2", title: "Task 2", category: "inProgress" },
  { _id: "3", title: "Task 3", category: "done" },
];

const reorder = (tasks, startIndex, endIndex) => {
  const result = [...tasks];
  const [movedTask] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, movedTask);
  return result;
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const draggedTask = tasks.find((task) => task._id === draggableId);
    if (!draggedTask) return;

    if (source.droppableId === destination.droppableId) {
      const updatedCategoryTasks = reorder(
        tasks.filter((task) => task.category === draggedTask.category),
        source.index,
        destination.index
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          updatedCategoryTasks.find((t) => t._id === task._id) || task
        )
      );
    } else {
      draggedTask.category = destination.droppableId.replace("Droppable", "");
      const updatedTasks = tasks.filter((task) => task._id !== draggableId);
      updatedTasks.splice(destination.index, 0, draggedTask);
      setTasks([...updatedTasks]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {[
          { id: "todoDroppable", title: "To Do", category: "todo" },
          { id: "inProgressDroppable", title: "In Progress", category: "inProgress" },
          { id: "doneDroppable", title: "Done", category: "done" },
        ].map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  padding: "10px",
                  width: "250px",
                  minHeight: "300px",
                  background: "#f4f4f4",
                  borderRadius: "5px",
                }}
              >
                <h3>{section.title}</h3>
                {tasks
                  .filter((task) => task.category === section.category)
                  .map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: "8px",
                            marginBottom: "8px",
                            background: "white",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {task.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
