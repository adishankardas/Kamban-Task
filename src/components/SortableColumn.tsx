import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTaskCard } from './SortableTaskCard';

export const SortableColumn = ({ title, tasks }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
    data: { column: title },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 bg-gray-200 p-4 rounded min-w-60 ${
        isOver ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <h3 className="font-bold mb-4">{title}</h3>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} id={task.id} title={task.title} column={task.column} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};