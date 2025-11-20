import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project, ProjectFormData } from './types';

interface ProjectFormProps {
    open: boolean;
    mode: 'create' | 'edit';
    project?: Project | null;
    formData: ProjectFormData;
    onFormDataChange: (data: ProjectFormData) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
    open,
    mode,
    project,
    formData,
    onFormDataChange,
    onSubmit,
    onClose
}) => {
    const updateField = (field: keyof ProjectFormData, value: string) => {
        onFormDataChange({ ...formData, [field]: value });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Create New Project' : 'Edit Project'}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === 'create'
                            ? 'Set up a new project for your team'
                            : 'Update project information'
                        }
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Project Name *</Label>
                            <Input
                                id="name"
                                placeholder="Enter project name"
                                value={formData.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your project..."
                                value={formData.description}
                                onChange={(e) => updateField('description', e.target.value)}
                                rows={4}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => updateField('status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="COMPLETED">Completed</SelectItem>
                                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="startDate">Start Date *</Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => updateField('startDate', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="endDate">End Date (Optional)</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => updateField('endDate', e.target.value)}
                                min={formData.startDate}
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {mode === 'create' ? 'Create Project' : 'Update Project'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectForm;
