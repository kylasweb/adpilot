import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { ConfiguratorState, ConfiguratorSection } from './types';

interface ConfiguratorContextType {
  state: ConfiguratorState;
  sections: ConfiguratorSection[];
  setValue: (key: string, value: any) => void;
  setError: (key: string, error: string) => void;
  clearError: (key: string) => void;
  resetForm: () => void;
  submitForm: () => void;
}

interface ConfiguratorProviderProps {
  children: React.ReactNode;
  sections: ConfiguratorSection[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
}

type Action =
  | { type: 'SET_VALUE'; key: string; value: any }
  | { type: 'SET_ERROR'; key: string; error: string }
  | { type: 'CLEAR_ERROR'; key: string }
  | { type: 'RESET_FORM' }
  | { type: 'SUBMIT_FORM' };

const initialState: ConfiguratorState = {
  values: {},
  errors: {},
  isDirty: false,
  isValid: true,
};

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

function configuratorReducer(state: ConfiguratorState, action: Action): ConfiguratorState {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        values: { ...state.values, [action.key]: action.value },
        isDirty: true,
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.error },
        isValid: false,
      };
    case 'CLEAR_ERROR':
      const newErrors = { ...state.errors };
      delete newErrors[action.key];
      return {
        ...state,
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0,
      };
    case 'RESET_FORM':
      return initialState;
    case 'SUBMIT_FORM':
      return {
        ...state,
        isDirty: false,
      };
    default:
      return state;
  }
}

export function ConfiguratorProvider({
  children,
  sections,
  initialValues = {},
  onSubmit,
}: ConfiguratorProviderProps) {
  const [state, dispatch] = useReducer(configuratorReducer, {
    ...initialState,
    values: initialValues,
  });

  const contextValue = useMemo(
    () => ({
      state,
      sections,
      setValue: (key: string, value: any) =>
        dispatch({ type: 'SET_VALUE', key, value }),
      setError: (key: string, error: string) =>
        dispatch({ type: 'SET_ERROR', key, error }),
      clearError: (key: string) =>
        dispatch({ type: 'CLEAR_ERROR', key }),
      resetForm: () => dispatch({ type: 'RESET_FORM' }),
      submitForm: () => {
        if (state.isValid) {
          onSubmit(state.values);
          dispatch({ type: 'SUBMIT_FORM' });
        }
      },
    }),
    [state, sections, onSubmit]
  );

  return (
    <ConfiguratorContext.Provider value={contextValue}>
      {children}
    </ConfiguratorContext.Provider>
  );
}

export function useConfigurator() {
  const context = useContext(ConfiguratorContext);
  if (context === undefined) {
    throw new Error('useConfigurator must be used within a ConfiguratorProvider');
  }
  return context;
}