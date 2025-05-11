import { useState } from "react";
import { useStore } from "../stores/useStore";
import { motion } from "framer-motion";

interface TaskInputHeaderProps {
  isSidebarOpen?: boolean;
}

export const TaskInputHeader = ({ isSidebarOpen = false }: TaskInputHeaderProps) => {
  const [title, setTitle] = useState("");
  const [column, setColumn] = useState<"To Do" | "In Progress" | "Done">("To Do");
  const { addTask } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, column);
      setTitle("");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`mb-4 mx-4 sm:mx-6 p-4 pt-12 sm:pt-4 bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 sm:ml-0 ${
        isSidebarOpen ? "ml-64" : "ml-0"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-gray-700 placeholder-gray-400"
          required
        />
        <div className="flex gap-3">
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value as "To Do" | "In Progress" | "Done")}
            className="w-full sm:w-auto p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.form>
  );
};