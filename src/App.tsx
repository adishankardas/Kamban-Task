import { ProjectSidebar } from "./components/ProjectSidebar";
import { KanbanBoard } from "./components/KanbanBoard";
import { DndProvider } from './components/DndProvider';

function App() {
  return (
     <DndProvider>

    <div className="flex h-screen bg-gray-50">
      <ProjectSidebar />
      <div className="flex-1 overflow-auto">
        <KanbanBoard />
      </div>
      
    </div>
     </DndProvider>
    
  );
}

export default App;