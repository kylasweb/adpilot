import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ConfiguratorState } from '../types'

interface ConfigStore {
  // State
  clientManager: ConfiguratorState
  invoiceCreator: ConfiguratorState
  projectManagement: ConfiguratorState
  proposalGenerator: ConfiguratorState
  timeTracking: ConfiguratorState
  isLoading: boolean
  error: string | null

  // Actions
  setConfig: (
    module: keyof ConfigStoreState,
    values: Record<string, any>
  ) => void
  resetConfig: (module: keyof ConfigStoreState) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

interface ConfigStoreState {
  clientManager: ConfiguratorState
  invoiceCreator: ConfiguratorState
  projectManagement: ConfiguratorState
  proposalGenerator: ConfiguratorState
  timeTracking: ConfiguratorState
}

const initialConfigState: ConfiguratorState = {
  values: {},
  errors: {},
  isDirty: false,
  isValid: true
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      // Initial state
      clientManager: { ...initialConfigState },
      invoiceCreator: { ...initialConfigState },
      projectManagement: { ...initialConfigState },
      proposalGenerator: { ...initialConfigState },
      timeTracking: { ...initialConfigState },
      isLoading: false,
      error: null,

      // Actions
      setConfig: (module, values) =>
        set((state) => ({
          [module]: {
            ...state[module],
            values,
            isDirty: true,
            isValid: true
          }
        })),

      resetConfig: (module) =>
        set((state) => ({
          [module]: { ...initialConfigState }
        })),

      setLoading: (loading) =>
        set(() => ({
          isLoading: loading
        })),

      setError: (error) =>
        set(() => ({
          error
        }))
    }),
    {
      name: 'freelancer-config-store',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration from version 0 to 1 logic here if needed
          return persistedState
        }
        return persistedState
      }
    }
  )
)