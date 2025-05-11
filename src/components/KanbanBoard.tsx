import { Column } from "./Column";
import { useStore } from "../stores/useStore";
import { TaskInputHeader } from "./TaskInputHeader";
import { motion } from "framer-motion";

export const KanbanBoard = () => {
  const { selectedProjectId, projects } = useStore();
  const project = projects.find(p => p.id === selectedProjectId);

  if (!project) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex items-center justify-center p-4 sm:p-8 text-gray-500"
    >
      <div className="text-center">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        <p className="mt-4 text-base sm:text-lg font-medium">Select a project to begin</p>
      </div>
    </motion.div>
  );

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
      <TaskInputHeader />
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 min-h-[calc(100vh-150px)]">
        {["To Do", "In Progress", "Done"].map((column) => (
          <Column 
            key={column} 
            title={column as "To Do" | "In Progress" | "Done"}
            tasks={project.tasks.filter(t => t.column === column)}
          />
        ))}
      </div>
    </div>
  );
};