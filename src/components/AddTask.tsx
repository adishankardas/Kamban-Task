import { useState } from "react";
import { useStore } from "../stores/useStore";
import { motion } from "framer-motion";

export const AddTask = () => {
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
      className="mb-6 mx-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <select
          value={column}
          onChange={(e) => setColumn(e.target.value as any)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          type="submit"
          className="px-6 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add
        </button>
      </div>
    </motion.form>
  );
};