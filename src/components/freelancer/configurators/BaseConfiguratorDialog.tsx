import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConfiguratorProps } from './types';
import { ConfiguratorProvider, useConfigurator } from './ConfiguratorContext';

const ConfiguratorContent = () => {
  const { state, sections, setValue, submitForm, resetForm } = useConfigurator();

  const handleValueChange = (key: string, value: any) => {
    setValue(key, value);
  };

  const renderOption = (sectionId: string, option: any) => {
    const key = `${sectionId}.${option.id}`;
    const value = state.values[key] ?? option.value;

    switch (option.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => handleValueChange(key, e.target.value)}
            placeholder={option.description}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleValueChange(key, parseFloat(e.target.value))}
            placeholder={option.description}
          />
        );
      case 'boolean':
        return (
          <Switch
            checked={value}
            onCheckedChange={(checked) => handleValueChange(key, checked)}
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleValueChange(key, val)}>
            <SelectTrigger>
              <SelectValue placeholder={option.description} />
            </SelectTrigger>
            <SelectContent>
              {option.options?.map((opt: { value: string | number; label: string }) => (
                <SelectItem key={opt.value?.toString()} value={opt.value?.toString()}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ScrollArea className="max-h-[600px] pr-4">
        {sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
            {section.description && (
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
            )}
            <div className="space-y-4">
              {section.options.map((option) => (
                <div key={option.id} className="grid gap-2">
                  <Label>
                    {option.label}
                    {option.description && (
                      <span className="text-sm text-muted-foreground ml-2">
                        ({option.description})
                      </span>
                    )}
                  </Label>
                  {renderOption(section.id, option)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={resetForm}>
          Reset
        </Button>
        <Button onClick={submitForm}>Save Changes</Button>
      </DialogFooter>
    </>
  );
};

export function BaseConfiguratorDialog({
  title,
  description,
  open,
  onOpenChange,
  ...configuratorProps
}: {
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & ConfiguratorProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <ConfiguratorProvider {...configuratorProps}>
          <ConfiguratorContent />
        </ConfiguratorProvider>
      </DialogContent>
    </Dialog>
  );
}