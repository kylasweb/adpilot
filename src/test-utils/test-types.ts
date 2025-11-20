export { };

declare global {
  // Base test runner types
  let describe: (name: string, fn: () => void) => void;
  let beforeEach: (fn: () => void) => void;
  let it: (name: string, fn: () => void | Promise<void>) => void;

  // Jest specific types
  interface CustomMatchers<R = unknown> {
    toBeInTheDocument(): R;
    toHaveValue(expected: any): R;
    toBeChecked(): R;
    toBeDisabled(): R;
  }

  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {
      toBe(expected: any): R;
      toEqual(expected: any): R;
      toContain(expected: any): R;
      toHaveBeenCalled(): R;
      toHaveBeenCalledWith(...args: any[]): R;
      not: Matchers<R>;
    }

    interface Expect {
      <T = any>(actual: T): Matchers<void>;
      any(constructor: any): any;
      anything(): any;
    }

    interface MockInstance<T = any, Y extends any[] = any> {
      (...args: Y): T;
      mockImplementation(fn: (...args: Y) => T): this;
      mockImplementationOnce(fn: (...args: Y) => T): this;
      mockResolvedValue(value: Awaited<T>): this;
      mockResolvedValueOnce(value: Awaited<T>): this;
      mockRejectedValue(value: any): this;
      mockRejectedValueOnce(value: any): this;
      mockReturnValue(value: T): this;
      mockReturnValueOnce(value: T): this;
      mockReturnThis(): this;
      mockRestore(): void;
      mockReset(): void;
      mockClear(): void;
      getMockName(): string;
      mockName(name: string): this;
      mock: {
        calls: Y[];
        instances: T[];
        contexts: any[];
        lastCall: Y | undefined;
      };
    }

    type Mock<T = any, Y extends any[] = any> = MockInstance<T, Y>;

    interface JestInterface {
      fn<T = any, Y extends any[] = any>(): Mock<T, Y>;
      spyOn<T extends {}, M extends keyof T>(
        object: T,
        method: M
      ): Mock<T[M]>;
    }
  }

  const jest: jest.JestInterface;
  const expect: jest.Expect;

  interface Window {
    fetch: jest.Mock;
  }

  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
    }
  }
}