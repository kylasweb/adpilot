import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, Calendar, Users, MoreVertical, Loader2 } from "lucide-react";
import { Project } from './types';

interface ProjectListProps {
    projects: Project[];
    loading: boolean;
    onSelectProject: (project: Project) => void;
    onEditProject: (project: Project) => void;
    onDeleteProject: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
    projects,
    loading,
    onSelectProject,
    onEditProject,
    onDeleteProject
}) => {
    const getStatusBadge = (status: string) => {
        const variants: Record<string, string> = {
            ACTIVE: 'bg-green-100 text-green-800',
            COMPLETED: 'bg-blue-100 text-blue-800',
            ARCHIVED: 'bg-gray-100 text-gray-800'
        };
        return <Badge className={variants[status]}>{status}</Badge>;
    };

    const getProgressPercentage = (project: Project) => {
        // This would ideally come from task completion stats
        // For now, return a placeholder
        return Math.floor(Math.random() * 100);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-adsilo-primary" />
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-12">
                <Layers className="h-12 w-12 mx-auto mb-3 text-adsilo-text-muted opacity-50" />
                <div className="text-adsilo-text-muted">No projects found</div>
                <p className="text-sm text-adsilo-text-muted mt-1">Create your first project to get started</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
                const progress = getProgressPercentage(project);

                return (
                    <Card
                        key={project.id}
                        className="border-adsilo-border hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => onSelectProject(project)}
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
                                    <CardDescription className="line-clamp-2 mt-1">
                                        {project.description || 'No description'}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusBadge(project.status)}
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEditProject(project);
                                        }}
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Progress Bar */}
                                <div>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-adsilo-text-muted">Progress</span>
                                        <span className="font-medium">{progress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-adsilo-primary rounded-full transition-all"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Project Stats */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-adsilo-border">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-lg bg-blue-100">
                                            <Layers className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-adsilo-text-muted">Tasks</div>
                                            <div className="text-sm font-semibold">{project._count?.tasks || 0}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-lg bg-purple-100">
                                            <Users className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-adsilo-text-muted">Members</div>
                                            <div className="text-sm font-semibold">{project._count?.members || 0}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="flex items-center gap-2 text-xs text-adsilo-text-muted pt-2 border-t border-adsilo-border">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                        {new Date(project.startDate).toLocaleDateString()}
                                        {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default ProjectList;
