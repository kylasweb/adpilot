import { useCallback } from 'react'
import { useConfigStore as useStore } from '../store/configStore'

export type ConfigModule = 
  | 'clientManager'
  | 'invoiceCreator'
  | 'projectManagement'
  | 'proposalGenerator'
  | 'timeTracking'

export const useConfigStore = (module: ConfigModule) => {
  const store = useStore()
  
  const getConfig = useCallback(() => {
    return store[module]
  }, [module])

  const updateConfig = useCallback((values: Record<string, any>) => {
    store.setConfig(module, values)
  }, [module])

  const resetConfig = useCallback(() => {
    store.resetConfig(module)
  }, [module])

  const validateConfig = useCallback((values: Record<string, any>) => {
    // Add validation logic here
    return true
  }, [])

  return {
    config: getConfig(),
    isLoading: store.isLoading,
    error: store.error,
    updateConfig,
    resetConfig,
    validateConfig,
    setLoading: store.setLoading,
    setError: store.setError
  }
}