import React, { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Mock theme provider since we don't have the actual implementation yet
const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <div data-testid="theme-provider">{children}</div>
);

// Mock toaster since we don't have the actual implementation yet
const Toaster = () => <div data-testid="toaster" />;

// Define basic render options type
interface RenderOptions {
  container?: HTMLElement;
  baseElement?: HTMLElement;
}

// Define providers wrapper
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

// Custom render function
const render = (
  ui: ReactElement,
  options: RenderOptions = {}
) => {
  const {
    container = document.createElement('div'),
    baseElement = document.body,
  } = options;

  baseElement.appendChild(container);
  const root = createRoot(container);
  root.render(<AllTheProviders>{ui}</AllTheProviders>);

  return {
    container,
    baseElement,
    unmount: () => {
      root.unmount();
      container.remove();
    },
    rerender: (ui: ReactElement) => {
      root.render(<AllTheProviders>{ui}</AllTheProviders>);
    }
  };
};

// Helper to simulate user interactions
const userActions = {
  click: async (element: Element | null) => {
    if (!element) throw new Error('Element not found');
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
  },
  type: async (element: HTMLElement | null, text: string) => {
    if (!element) throw new Error('Element not found');
    element.focus();
    text.split('').forEach(char => {
      const event = new KeyboardEvent('keypress', {
        key: char,
        bubbles: true,
      });
      element.dispatchEvent(event);
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value += char;
      }
    });
  },
  clear: async (element: HTMLElement | null) => {
    if (!element) throw new Error('Element not found');
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      element.value = '';
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },
  selectOption: async (element: HTMLSelectElement | null, value: string) => {
    if (!element) throw new Error('Element not found');
    element.value = value;
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }
};

// Mock response generator
const mockResponse = <T extends object>(
  data: T,
  status = 200,
  statusText = 'OK'
): Response => {
  const response = new Response(JSON.stringify(data), {
    status,
    statusText,
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });

  return response;
};

// Mock error response
const mockErrorResponse = (
  status = 400,
  statusText = 'Bad Request',
  message = 'Something went wrong'
): Response => {
  return mockResponse({ error: message }, status, statusText);
};

// Wait for async operations
const waitForAsync = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

// Mock form data
const mockFormData = <T extends object>(data: T): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  return formData;
};

// Mock file
const mockFile = (
  name = 'test.txt',
  type = 'text/plain',
  content = 'test content'
): File => {
  return new File([content], name, { type });
};

// Mock date
const createMockDate = (defaultDate: string) => {
  const currentDate = new Date(defaultDate);

  class MockDate {
    private date: Date;

    constructor() {
      this.date = new Date(currentDate);
    }

    static now() {
      return currentDate.getTime();
    }

    getTime() {
      return this.date.getTime();
    }

    toISOString() {
      return this.date.toISOString();
    }

    toString() {
      return this.date.toString();
    }
  }

  return MockDate;
};

const mockDate = (isoDate: string) => {
  const RealDate = global.Date;
  const MockDate = createMockDate(isoDate);

  global.Date = MockDate as unknown as DateConstructor;

  return () => {
    global.Date = RealDate;
  };
};

// Export everything
export {
  render,
  userActions,
  mockResponse,
  mockErrorResponse,
  waitForAsync,
  mockFormData,
  mockFile,
  mockDate,
  // Types
  type RenderOptions,
  type ThemeProviderProps
};