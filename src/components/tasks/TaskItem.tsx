
import React, { useState } from "react";
import { useTask, Task } from "@/context/TaskContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Trash, Edit, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, updateTask, deleteTask } = useTask();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [date, setDate] = React.useState<Date | undefined>(
    task.due_date ? new Date(task.due_date) : undefined
  );

  const handleCheckboxChange = async () => {
    await toggleTaskCompletion(task.id);
  };

  const handleEditSubmit = async () => {
    await updateTask(task.id, { 
      ...editedTask,
      due_date: date ? format(date, "yyyy-MM-dd") : null
    });
    setIsEditDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    await deleteTask(task.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className={cn("mb-4 overflow-hidden transition-all", 
        task.completed ? "opacity-60 bg-muted" : "")}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Checkbox 
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={handleCheckboxChange}
              className="mt-1"
            />
            <div className="flex-1">
              <h3 className={cn("text-lg font-medium", 
                task.completed && "line-through text-muted-foreground")}>{task.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              {task.due_date && (
                <p className="text-xs flex items-center mt-2 text-muted-foreground">
                  <CalendarIcon size={12} className="mr-1" />
                  Due: {format(new Date(task.due_date), "PPP")}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-2 px-3 bg-muted/50 flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash size={16} />
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>No due date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="completed"
                checked={editedTask.completed}
                onCheckedChange={(checked) => 
                  setEditedTask({ ...editedTask, completed: !!checked })
                }
              />
              <Label htmlFor="completed">Mark as completed</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>
              <Check size={16} className="mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete "{task.title}"?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              <Trash size={16} className="mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskItem;
