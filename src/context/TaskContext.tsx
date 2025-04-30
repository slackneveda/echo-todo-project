
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "@/components/ui/sonner";

// Define types
export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string | null;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  createTask: (taskData: Omit<Task, "id">) => Promise<void>;
  updateTask: (id: number, taskData: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTaskCompletion: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial fetch of tasks when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Mock API functions - would be replaced with real API calls
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockTasks: Task[] = [
        {
          id: 1,
          title: "Complete React tutorial",
          description: "Finish the React fundamentals tutorial",
          due_date: "2025-05-10",
          completed: false
        },
        {
          id: 2,
          title: "Setup Django API",
          description: "Configure Django REST framework and create initial models",
          due_date: "2025-05-15",
          completed: false
        },
        {
          id: 3,
          title: "Design database schema",
          description: "Create ERD for to-do application",
          due_date: "2025-05-05",
          completed: true
        }
      ];
      
      setTasks(mockTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, "id">) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new task with a mock ID
      const newTask: Task = {
        ...taskData,
        id: Date.now() // Use timestamp as mock ID
      };
      
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task created successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: number, taskData: Partial<Task>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, ...taskData } : task
        )
      );
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTaskCompletion = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
