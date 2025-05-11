import { useDroppable } from '@dnd-kit/core';
import { SortableTaskCard } from './SortableTaskCard';
import { motion } from 'framer-motion';

type ColumnProps = {
  title: "To Do" | "In Progress" | "Done";
  tasks: Array<{ id: string; title: string; column: "To Do" | "In Progress" | "Done" }>;
};

const columnThemes = {
  "To Do": {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    icon: "🛠️"
  },
  "In Progress": {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-600",
    icon: "⏳"
  },
  "Done": {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    icon: "✅"
  }
};

export const Column = ({ title, tasks }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: title });

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      ref={setNodeRef}
      className={`w-full sm:flex-1 ${columnThemes[title].bg} border ${columnThemes[title].border} rounded-xl p-4 sm:min-w-72 shadow-sm transition-all duration-300 ${
        isOver ? 'ring-2 ring-indigo-400 scale-[1.02]' : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg sm:text-xl">{columnThemes[title].icon}</span>
        <h3 className={`text-base sm:text-lg font-semibold ${columnThemes[title].text}`}>
          {title}
        </h3>
        <span className="ml-auto px-2 py-1 text-xs font-medium rounded-full bg-white shadow">
          {tasks.length} tasks
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <SortableTaskCard key={task.id} {...task} />
        ))}
      </div>
    </motion.div>
  );
};