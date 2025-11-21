/* eslint-disable @typescript-eslint/no-explicit-any */
export { };

declare global {
  // Jest specific types
  interface CustomMatchers<R = unknown> {
    toBeInTheDocument(): R;
    toHaveValue(expected: any): R;
    toBeChecked(): R;
    toBeDisabled(): R;
  }

  interface Window {
    fetch: jest.Mock;
  }

  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
    }
  }
}