'use client'

import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Activity, Layers, Plus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import ProjectList from "@/components/project-management/ProjectList";
import ProjectForm from "@/components/project-management/ProjectForm";
import TaskBoard from "@/components/project-management/TaskBoard";
import { Project, Task, ProjectFormData } from "@/components/project-management/types";

const ProjectDevelopmentPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectFormData, setProjectFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    status: 'ACTIVE',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchTasks = async (projectId: string) => {
    setLoadingTasks(true);
    try {
      const response = await fetch(`/api/projects/${projectId}/tasks`);
      const data = await response.json();
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject.id);
    }
  }, [selectedProject]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projectFormData,
          startDate: new Date(projectFormData.startDate),
          endDate: projectFormData.endDate ? new Date(projectFormData.endDate) : null
        })
      });

      if (!response.ok) throw new Error('Failed to create project');

      toast.success('Project created successfully');
      setShowProjectForm(false);
      setProjectFormData({
        name: '',
        description: '',
        status: 'ACTIVE',
        startDate: new Date().toISOString().split('T')[0],
        endDate: ''
      });
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projectFormData,
          startDate: new Date(projectFormData.startDate),
          endDate: projectFormData.endDate ? new Date(projectFormData.endDate) : null
        })
      });

      if (!response.ok) throw new Error('Failed to update project');

      toast.success('Project updated successfully');
      setShowProjectForm(false);
      setEditingProject(null);
      fetchProjects();
      if (selectedProject?.id === editingProject.id) {
        setSelectedProject(null);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? All tasks will be deleted.')) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete project');

      toast.success('Project deleted successfully');
      fetchProjects();
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const openCreateDialog = () => {
    setFormMode('create');
    setEditingProject(null);
    setProjectFormData({
      name: '',
      description: '',
      status: 'ACTIVE',
      startDate: new Date().toISOString().split('T')[0],
      endDate: ''
    });
    setShowProjectForm(true);
  };

  const openEditDialog = (project: Project) => {
    setFormMode('edit');
    setEditingProject(project);
    setProjectFormData({
      name: project.name,
      description: project.description || '',
      status: project.status,
      startDate: new Date(project.startDate).toISOString().split('T')[0],
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : ''
    });
    setShowProjectForm(true);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setTasks([]);
  };

  const handleCreateTask = () => {
    toast.info('Task creation functionality coming soon!');
  };

  const handleTaskClick = (task: Task) => {
    toast.info('Task details view coming soon!');
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {selectedProject && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleBackToProjects}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div>
                <h1 className="text-3xl font-bold">
                  {selectedProject ? selectedProject.name : 'Project Development'}
                </h1>
                <p className="text-adsilo-text-secondary mt-1">
                  {selectedProject
                    ? selectedProject.description || 'Manage tasks and track progress'
                    : 'Manage your project development lifecycle'
                  }
                </p>
              </div>
            </div>
            {!selectedProject && (
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6"
      >
        {!selectedProject ? (
          <Card className="border-adsilo-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Projects
              </CardTitle>
              <CardDescription>View and manage all your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectList
                projects={projects}
                loading={loadingProjects}
                onSelectProject={handleSelectProject}
                onEditProject={openEditDialog}
                onDeleteProject={handleDeleteProject}
              />
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="tasks" className="space-y-6">
            <TabsList>
              <TabsTrigger value="tasks">
                <Activity className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="overview">
                <Layers className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tasks">
              <Card className="border-adsilo-border">
                <CardContent className="pt-6">
                  <TaskBoard
                    tasks={tasks}
                    loading={loadingTasks}
                    onCreateTask={handleCreateTask}
                    onTaskClick={handleTaskClick}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-adsilo-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-adsilo-text-muted">
                      Total Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{tasks.length}</div>
                  </CardContent>
                </Card>

                <Card className="border-adsilo-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-adsilo-text-muted">
                      In Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {tasks.filter(t => t.status === 'IN_PROGRESS').length}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-adsilo-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-adsilo-text-muted">
                      Completed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {tasks.filter(t => t.status === 'COMPLETED').length}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </motion.div>

      <ProjectForm
        open={showProjectForm}
        mode={formMode}
        project={editingProject}
        formData={projectFormData}
        onFormDataChange={setProjectFormData}
        onSubmit={formMode === 'create' ? handleCreateProject : handleUpdateProject}
        onClose={() => setShowProjectForm(false)}
      />
    </AppLayout>
  );
};

export default ProjectDevelopmentPage;