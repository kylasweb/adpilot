import React, { useEffect } from 'react';
import { useConfiguratorForm } from '../hooks/useConfigStore';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export function ConfiguratorExample() {
  const {
    values,
    errors,
    isDirty,
    isValid,
    isLoading,
    error,
    handleSubmit,
    handleChange,
    handleReset,
    setError
  } = useConfiguratorForm('projectManagement');

  // Load initial configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Example of loading initial values
        handleChange('projectPrefix', 'PRJ-');
        handleChange('defaultVisibility', 'private');
        handleChange('requireApproval', true);
      } catch (error) {
        setError('Failed to load configuration');
      }
    };

    loadConfig();
  }, [handleChange, setError]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await handleSubmit()) {
      console.log('Configuration saved successfully');
    }
  };

  if (isLoading) {
    return <div>Loading configuration...</div>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Text input example */}
        <div className="space-y-2">
          <label htmlFor="projectPrefix" className="text-sm font-medium">
            Project Prefix
          </label>
          <Input
            id="projectPrefix"
            value={values.projectPrefix || ''}
            onChange={(e) => handleChange('projectPrefix', e.target.value)}
            placeholder="Enter project prefix"
          />
          {errors.projectPrefix && (
            <p className="text-sm text-red-500">{errors.projectPrefix}</p>
          )}
        </div>

        {/* Select input example */}
        <div className="space-y-2">
          <label htmlFor="defaultVisibility" className="text-sm font-medium">
            Default Visibility
          </label>
          <Select
            value={values.defaultVisibility || ''}
            onValueChange={(value) => handleChange('defaultVisibility', value)}
          >
            <SelectTrigger id="defaultVisibility">
              <SelectValue placeholder="Select visibility..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </Select>
          {errors.defaultVisibility && (
            <p className="text-sm text-red-500">{errors.defaultVisibility}</p>
          )}
        </div>

        {/* Switch input example */}
        <div className="flex items-center justify-between">
          <label htmlFor="requireApproval" className="text-sm font-medium">
            Require Approval
          </label>
          <Switch
            id="requireApproval"
            checked={values.requireApproval || false}
            onCheckedChange={(checked) => handleChange('requireApproval', checked)}
          />
        </div>
      </div>

      {/* Error display */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          {error}
        </Alert>
      )}

      {/* Form actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isLoading || !isDirty}
        >
          Reset
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !isDirty || !isValid}
        >
          Save Changes
        </Button>
      </div>

      {/* Debug information */}
      {process.env.NODE_ENV === 'development' && (
        <pre className="mt-8 p-4 bg-gray-100 rounded-md text-sm">
          {JSON.stringify({ values, errors, isDirty, isValid }, null, 2)}
        </pre>
      )}
    </form>
  );
}