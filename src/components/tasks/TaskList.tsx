
import React, { useState } from "react";
import { useTask } from "@/context/TaskContext";
import TaskItem from "./TaskItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TaskList: React.FC = () => {
  const { tasks, isLoading } = useTask();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter(task => {
    // Apply search filter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesFilter = filter === "all" ||
                         (filter === "active" && !task.completed) ||
                         (filter === "completed" && task.completed);
    
    return matchesSearch && matchesFilter;
  });

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4">
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Select
          value={filter}
          onValueChange={setFilter}
        >
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Filter tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="active">Active Tasks</SelectItem>
            <SelectItem value="completed">Completed Tasks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-2">
              {searchQuery || filter !== "all"
                ? "No tasks match your filters"
                : "You have no tasks yet"}
            </p>
            {searchQuery || filter !== "all" ? (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFilter("all");
                }}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
