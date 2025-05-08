export interface ConfiguratorOption {
  id: string;
  label: string;
  value: string | number | boolean | string[];
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: { label: string; value: string | number }[];
  description?: string;
  min?: number;
  max?: number;
  multiple?: boolean;
}

export interface ConfiguratorSection {
  id: string;
  title: string;
  description?: string;
  options: ConfiguratorOption[];
}

export interface ConfiguratorState {
  values: Record<string, any>;
  errors: Record<string, string>;
  isDirty: boolean;
  isValid: boolean;
}

export interface ConfiguratorProps {
  sections: ConfiguratorSection[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onCancel: () => void;
}

// New store-related types
export type ConfigModule = 
  | 'clientManager'
  | 'invoiceCreator'
  | 'projectManagement'
  | 'proposalGenerator'
  | 'timeTracking';

export type ConfigStoreState = Record<ConfigModule, ConfiguratorState>;

export interface ConfigStoreActions {
  setConfig: (module: ConfigModule, values: Record<string, any>) => void;
  resetConfig: (module: ConfigModule) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface ConfigStore extends ConfigStoreState {
  isLoading: boolean;
  error: string | null;
}

export type ConfigStoreMigration = {
  version: number;
  migrate: (state: any) => any;
}