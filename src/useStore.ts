import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Export Task type
export type Task = {
  id: string;
  title: string;
  column: "To Do" | "In Progress" | "Done";
};

// Export Project type
export type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

// Export Store type
export type Store = {
  projects: Project[];
  selectedProjectId: string | null;
  addProject: (name: string) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string) => void;
  addTask: (title: string, column: Task["column"]) => void;
  moveTask: (taskId: string, newColumn: "To Do" | "In Progress" | "Done", overId: string | null) => void;
  editTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      projects: [],
      selectedProjectId: null,
      addProject: (name) =>
        set((state) => ({
          projects: [
            ...state.projects,
            { id: Date.now().toString(), name, tasks: [] },
          ],
        })),
      deleteProject: (id: string) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          selectedProjectId:
            state.selectedProjectId === id ? null : state.selectedProjectId,
        })),
      moveTask: (taskId: string, newColumn: "To Do" | "In Progress" | "Done", overId: string | null) => {
        set((state) => ({
          projects: state.projects.map((project) => ({
            ...project,
            tasks: (() => {
              const taskToMove = project.tasks.find((task) => task.id === taskId);
              if (!taskToMove) return project.tasks;

              // Remove the task from its current position
              const filteredTasks = project.tasks.filter((task) => task.id !== taskId);

              // If moving to a different column
              if (taskToMove.column !== newColumn) {
                taskToMove.column = newColumn;
              }

              // Find the index of the task being dragged over
              const overIndex = filteredTasks.findIndex((task) => task.id === overId);

              // Insert the task at the correct position
              if (overIndex === -1) {
                // If no specific position, add to the end
                return [...filteredTasks, taskToMove];
              } else {
                // Insert at the specified position
                return [
                  ...filteredTasks.slice(0, overIndex),
                  taskToMove,
                  ...filteredTasks.slice(overIndex),
                ];
              }
            })(),
          })),
        }));
      },
      selectProject: (id) => set({ selectedProjectId: id }),
      addTask: (title, column) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === state.selectedProjectId
              ? {
                  ...p,
                  tasks: [
                    ...p.tasks,
                    { id: Date.now().toString(), title, column },
                  ],
                }
              : p
          ),
        })),
      editTask: (taskId: string, updates: Partial<Task>) =>
        set((state) => ({
          projects: state.projects.map((project) => ({
            ...project,
            tasks: project.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updates } : task
            ),
          })),
        })),
      deleteTask: (taskId: string) =>
        set((state) => ({
          projects: state.projects.map((project) => ({
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId),
          })),
        })),
    }),
    { name: "kanban-storage", storage: createJSONStorage(() => localStorage) } // Fixed getStorage to storage
  )
);