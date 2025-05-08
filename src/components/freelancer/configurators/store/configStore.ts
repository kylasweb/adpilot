import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ConfigModule, ConfigStore, ConfigStoreState } from '../types';

// Extended actions interface
interface ConfigStoreActions {
  setConfig: (module: ConfigModule, values: Record<string, any>) => void;
  resetConfig: (module: ConfigModule) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  validateConfig: (module: ConfigModule) => boolean;
  saveConfig: (module: ConfigModule) => Promise<boolean>;
  loadConfig: (module: ConfigModule) => Promise<boolean>;
  migrateConfig: (module: ConfigModule, version: number) => void;
}

const initialState: ConfigStoreState = {
  clientManager: {
    values: {},
    errors: {},
    isDirty: false,
    isValid: true
  },
  invoiceCreator: {
    values: {},
    errors: {},
    isDirty: false,
    isValid: true
  },
  projectManagement: {
    values: {},
    errors: {},
    isDirty: false,
    isValid: true
  },
  proposalGenerator: {
    values: {},
    errors: {},
    isDirty: false,
    isValid: true
  },
  timeTracking: {
    values: {},
    errors: {},
    isDirty: false,
    isValid: true
  }
};

export const useConfigStore = create<ConfigStore & ConfigStoreActions>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,
      isLoading: false,
      error: null,

      // Actions
      setConfig: (module: ConfigModule, values: Record<string, any>) => {
        set((state) => ({
          [module]: {
            ...state[module],
            values: {
              ...state[module].values,
              ...values
            },
            isDirty: true
          }
        }));
      },

      resetConfig: (module: ConfigModule) => {
        set((state) => ({
          [module]: {
            ...initialState[module],
            isDirty: false
          }
        }));
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      validateConfig: (module: ConfigModule) => {
        const state = get();
        const values = state[module].values;
        const errors: Record<string, string> = {};

        // Implement validation logic here
        // Example validation:
        if (module === 'invoiceCreator') {
          if (!values.defaultCurrency) {
            errors.defaultCurrency = 'Default currency is required';
          }
        }

        set((state) => ({
          [module]: {
            ...state[module],
            errors,
            isValid: Object.keys(errors).length === 0
          }
        }));

        return Object.keys(errors).length === 0;
      },

      saveConfig: async (module: ConfigModule) => {
        const state = get();
        const isValid = state.validateConfig(module);

        if (!isValid) {
          return false;
        }

        try {
          state.setLoading(true);
          // TODO: Implement API call to save configuration
          // await api.saveConfig(module, state[module].values);

          set((state) => ({
            [module]: {
              ...state[module],
              isDirty: false
            }
          }));

          return true;
        } catch (error) {
          state.setError(error instanceof Error ? error.message : 'Failed to save configuration');
          return false;
        } finally {
          state.setLoading(false);
        }
      },

      loadConfig: async (module: ConfigModule) => {
        const state = get();

        try {
          state.setLoading(true);
          // TODO: Implement API call to load configuration
          // const config = await api.loadConfig(module);
          // state.setConfig(module, config);

          return true;
        } catch (error) {
          state.setError(error instanceof Error ? error.message : 'Failed to load configuration');
          return false;
        } finally {
          state.setLoading(false);
        }
      },

      migrateConfig: (module: ConfigModule, version: number) => {
        const state = get();
        const currentValues = state[module].values;

        // Implement migration logic here
        // Example migration:
        if (version === 1) {
          // Migrate from version 0 to 1
          const migratedValues = {
            ...currentValues,
            // Add new fields or transform existing ones
          };

          set((state) => ({
            [module]: {
              ...state[module],
              values: migratedValues
            }
          }));
        }
      }
    }),
    {
      name: 'freelancer-config-store',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        const state = persistedState as ConfigStore & ConfigStoreActions;
        
        Object.keys(state).forEach((key) => {
          if (key in initialState) {
            state.migrateConfig(key as ConfigModule, version);
          }
        });

        return state;
      }
    }
  )
);

// Selector hooks for specific modules
export const useClientConfig = () => useConfigStore((state) => state.clientManager);
export const useInvoiceConfig = () => useConfigStore((state) => state.invoiceCreator);
export const useProjectConfig = () => useConfigStore((state) => state.projectManagement);
export const useProposalConfig = () => useConfigStore((state) => state.proposalGenerator);
export const useTimeTrackingConfig = () => useConfigStore((state) => state.timeTracking);