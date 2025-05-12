import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
import { useStore } from '../stores/useStore';
import { Task } from '../stores/useStore'; // Import Task type

// Define TaskCardProps interface
interface TaskCardProps {
  id: string;
  title: string;
  column: Task["column"];
}

export const TaskCard = ({ id, title, column }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const { deleteTask, editTask } = useStore();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: { column },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 'auto',
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this task?')) {
      deleteTask(id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      editTask(id, { title: editedTitle });
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(!isEditing ? attributes : {})}
      {...(!isEditing ? listeners : {})}
      className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all relative ${
        isDragging ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      {isEditing ? (
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-800">{title}</h4>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700 text-sm"
              aria-label="Edit task"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 text-sm"
              aria-label="Delete task"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};