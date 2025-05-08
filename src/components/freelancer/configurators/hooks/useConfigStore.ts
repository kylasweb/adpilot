import { useCallback } from 'react';
import { useConfigStore as useStore } from '../store/configStore';
import { ConfigModule } from '../types';

export function useConfigStore(module: ConfigModule) {
  const store = useStore();
  
  const setValues = useCallback((values: Record<string, any>) => {
    store.setConfig(module, values);
  }, [module, store]);

  const resetValues = useCallback(() => {
    store.resetConfig(module);
  }, [module, store]);

  const saveValues = useCallback(async () => {
    return store.saveConfig(module);
  }, [module, store]);

  const loadValues = useCallback(async () => {
    return store.loadConfig(module);
  }, [module, store]);

  const validate = useCallback(() => {
    return store.validateConfig(module);
  }, [module, store]);

  return {
    // State
    values: store[module].values,
    errors: store[module].errors,
    isDirty: store[module].isDirty,
    isValid: store[module].isValid,
    isLoading: store.isLoading,
    error: store.error,

    // Actions
    setValues,
    resetValues,
    saveValues,
    loadValues,
    validate,
    setError: store.setError
  };
}

// Type-safe hooks for specific modules
export const useClientSettings = () => useConfigStore('clientManager');
export const useInvoiceSettings = () => useConfigStore('invoiceCreator');
export const useProjectSettings = () => useConfigStore('projectManagement');
export const useProposalSettings = () => useConfigStore('proposalGenerator');
export const useTimeTrackingSettings = () => useConfigStore('timeTracking');

// Helper hook for managing form state
export function useConfiguratorForm(module: ConfigModule) {
  const {
    values,
    errors,
    isDirty,
    isValid,
    isLoading,
    error,
    setValues,
    resetValues,
    saveValues,
    validate,
    setError
  } = useConfigStore(module);

  const handleSubmit = async () => {
    if (!validate()) {
      return false;
    }

    try {
      return await saveValues();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Form submission failed');
      return false;
    }
  };

  const handleChange = (field: string, value: any) => {
    setValues({ [field]: value });
  };

  const handleReset = () => {
    resetValues();
    setError(null);
  };

  return {
    // Form state
    values,
    errors,
    isDirty,
    isValid,
    isLoading,
    error,

    // Form handlers
    handleSubmit,
    handleChange,
    handleReset,

    // Additional actions
    setValues,
    validate,
    setError
  };
}