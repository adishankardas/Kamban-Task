import { useState } from "react";
import { useStore } from "../stores/useStore";

export const ProjectSidebar = () => {
  const {
    projects,
    selectedProjectId,
    addProject,
    deleteProject,
    selectProject,
  } = useStore();

  const [newProjectName, setNewProjectName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      addProject(newProjectName);
      setNewProjectName("");
    }
  };

  return (
    <>
      <button
        className="sm:hidden fixed top-2 left-2 z-50 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all flex items-center gap-2"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>{isSidebarOpen ? "Close" : "Menu"}</span>
      </button>
      <div
        className={`fixed sm:static inset-y-0 left-0 w-64 sm:w-72 bg-white/70 backdrop-blur-md border-r p-6 overflow-y-auto shadow-xl rounded-tr-3xl rounded-br-3xl transition-transform duration-300 transform sm:transform-none z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-extrabold mb-6 text-gray-800 tracking-wide">
          📁 Projects
        </h2>
        <div className="mb-6">
          <div className="flex flex-col gap-3">
            <input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm bg-white placeholder-gray-400"
              onKeyDown={(e) => e.key === "Enter" && handleAddProject()}
            />
            <button
              onClick={handleAddProject}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-md"
            >
              + Add
            </button>
          </div>
        </div>
        <ul className="space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
          {projects.map((project) => (
            <li key={project.id} className="flex items-center group">
              <button
                onClick={() => selectProject(project.id)}
                className={`flex-1 text-left p-2.5 rounded-lg text-sm font-medium transition-all border ${
                  selectedProjectId === project.id
                    ? "bg-blue-100 text-blue-800 border-blue-300"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {project.name}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete project "${project.name}"?`)) {
                    deleteProject(project.id);
                  }
                }}
                className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-transform transform hover:scale-110"
                aria-label={`Delete ${project.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};