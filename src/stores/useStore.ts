import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Task = {
  id: string;
  title: string;
  column: "To Do" | "In Progress" | "Done";
  createdAt: Date;
  description?: string;
};

type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

type Store = {
  projects: Project[];
  selectedProjectId: string | null;
  
  // Project actions
  addProject: (name: string) => void;
  renameProject: (id: string, newName: string) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string) => void;
  
  // Task actions
  addTask: (title: string, column: Task["column"], description?: string) => void;
  editTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
moveTask: (taskId: string, newColumn: "To Do" | "In Progress" | "Done") => void;
  
  // Utility
  getCurrentProject: () => Project | undefined;

  
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      projects: [],
      selectedProjectId: null,
      
      // Project methods
      addProject: (name) => set((state) => ({
        projects: [
          ...state.projects,
          { 
            id: Date.now().toString(), 
            name, 
            tasks: [] 
          },
        ],
      })),
      
      renameProject: (id, newName) => set((state) => ({
        projects: state.projects.map(project =>
          project.id === id ? { ...project, name: newName } : project
        ),
      })),
      
  deleteProject: (id: string) => {
  console.log('Deleting project:', id);
  set((state) => ({
    projects: state.projects.filter(project => project.id !== id),
    selectedProjectId: 
      state.selectedProjectId === id ? null : state.selectedProjectId
  }));
},  
deleteTask: (taskId: string) => {
  console.log('Attempting to delete task:', taskId);
  set((state) => {
    const updatedProjects = state.projects.map(project => ({
      ...project,
      tasks: project.tasks.filter(task => {
        console.log(`Checking task ${task.id} vs ${taskId}`);
        return task.id !== taskId;
      })
    }));
    console.log('Updated projects:', updatedProjects);
    return { projects: updatedProjects };
  });
},
      selectProject: (id) => set({ selectedProjectId: id }),
      
      // Task methods
      addTask: (title, column, description) => set((state) => ({
        projects: state.projects.map(project =>
          project.id === state.selectedProjectId
            ? {
                ...project,
                tasks: [
                  ...project.tasks,
                  {
                    id: Date.now().toString(),
                    title,
                    column,
                    description,
                    createdAt: new Date(),
                  },
                ],
              }
            : project
        ),
      })),
      
      editTask: (taskId, updates) => set((state) => ({
        projects: state.projects.map(project => ({
          ...project,
          tasks: project.tasks.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),
      })),
      
      
     // Add to your store implementation:
moveTask: (taskId: string, newColumn: "To Do" | "In Progress" | "Done") => {
  set((state) => ({
    projects: state.projects.map(project => ({
      ...project,
      tasks: project.tasks.map(task => 
        task.id === taskId ? { ...task, column: newColumn } : task
      )
    }))
  }));
},
      
      // Utility method
      getCurrentProject: () => {
        const { projects, selectedProjectId } = get();
        return projects.find(project => project.id === selectedProjectId);
      },
    }),
    {
      name: "kanban-storage",
      partialize: (state) => ({ 
        projects: state.projects,
        selectedProjectId: state.selectedProjectId 
      }),
    }
  )
);