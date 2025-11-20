import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Loader2, Plus } from "lucide-react";
import { Task } from './types';

interface TaskBoardProps {
    tasks: Task[];
    loading: boolean;
    onCreateTask: () => void;
    onTaskClick: (task: Task) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
    tasks,
    loading,
    onCreateTask,
    onTaskClick
}) => {
    const columns = [
        { id: 'PENDING', title: 'To Do', color: 'border-gray-300' },
        { id: 'IN_PROGRESS', title: 'In Progress', color: 'border-blue-300' },
        { id: 'COMPLETED', title: 'Done', color: 'border-green-300' }
    ];

    const getPriorityBadge = (priority: string) => {
        const variants: Record<string, string> = {
            HIGH: 'bg-red-100 text-red-800',
            MEDIUM: 'bg-yellow-100 text-yellow-800',
            LOW: 'bg-green-100 text-green-800'
        };
        return <Badge className={`text-xs ${variants[priority]}`}>{priority}</Badge>;
    };

    const getTasksByStatus = (status: string) => {
        return tasks.filter(task => task.status === status);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-adsilo-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Task Board</h3>
                <Button onClick={onCreateTask} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {columns.map((column) => {
                    const columnTasks = getTasksByStatus(column.id);

                    return (
                        <div key={column.id} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium">{column.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                    {columnTasks.length}
                                </Badge>
                            </div>

                            <div className="space-y-3 min-h-[400px]">
                                {columnTasks.length === 0 ? (
                                    <Card className={`border-2 border-dashed ${column.color} bg-gray-50`}>
                                        <CardContent className="py-8">
                                            <div className="text-center text-sm text-adsilo-text-muted">
                                                No tasks
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    columnTasks.map((task) => (
                                        <Card
                                            key={task.id}
                                            className={`border-l-4 ${column.color} hover:shadow-md transition-shadow cursor-pointer`}
                                            onClick={() => onTaskClick(task)}
                                        >
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between gap-2">
                                                    <CardTitle className="text-sm font-medium line-clamp-2">
                                                        {task.title}
                                                    </CardTitle>
                                                    {getPriorityBadge(task.priority)}
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                {task.description && (
                                                    <p className="text-xs text-adsilo-text-muted line-clamp-2 mb-3">
                                                        {task.description}
                                                    </p>
                                                )}

                                                <div className="space-y-2">
                                                    {task.assignee && (
                                                        <div className="flex items-center gap-2 text-xs text-adsilo-text-muted">
                                                            <User className="h-3 w-3" />
                                                            <span className="truncate">{task.assignee.name}</span>
                                                        </div>
                                                    )}

                                                    {task.dueDate && (
                                                        <div className="flex items-center gap-2 text-xs text-adsilo-text-muted">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskBoard;
