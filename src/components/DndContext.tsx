import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useStore } from '../stores/useStore';

export const DndProvider = ({ children }: { children: React.ReactNode }) => {
  const { moveTask } = useStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveTask(
        active.id.toString(), 
        over.id as "To Do" | "In Progress" | "Done"
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
};