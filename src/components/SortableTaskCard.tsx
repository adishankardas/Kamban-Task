import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';
import { Task } from '../stores/useStore'; // Import Task type

// Define SortableTaskCardProps interface
interface SortableTaskCardProps {
  id: string;
  title: string;
  column: Task["column"];
}

export const SortableTaskCard = ({ id, title, column }: SortableTaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard id={id} title={title} column={column} />
    </div>
  );
};