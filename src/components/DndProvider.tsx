import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useStore, Store } from '../stores/useStore';

// Explicitly type the useStore hook
const useTypedStore = useStore as () => Store;

export const DndProvider = ({ children }: { children: React.ReactNode }) => {
  const { moveTask } = useTypedStore();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Require 5px movement before dragging starts
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // If no drop target, do nothing

    const activeId = active.id.toString();
    const overId = over.id ? over.id.toString() : null; // Handle null overId
    const newColumn = over.data.current?.column || overId; // Determine the new column

    // Debugging: Log the drag-and-drop details
    console.log("Active ID:", activeId);
    console.log("Over ID:", overId);
    console.log("New Column:", newColumn);

    moveTask(
      activeId,
      newColumn as "To Do" | "In Progress" | "Done",
      overId
    );
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
};