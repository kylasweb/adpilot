import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

declare global {
  function afterEach(fn: () => void): void;

  interface Window {
    ResizeObserver: typeof ResizeObserver;
    IntersectionObserver: typeof IntersectionObserver;
  }
}

// Define basic mock function type with implementation details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface MockFnImplementation<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  mockImplementation: (fn: T) => MockFnImplementation<T>;
  mockClear: () => void;
  _implementation?: T;
}

// Create mock function helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createMockFn<T extends (...args: any[]) => any>(): MockFnImplementation<T> {
  const mockFn = function (...args: Parameters<T>): ReturnType<T> {
    return mockFn._implementation
      ? mockFn._implementation(...args)
      : undefined as unknown as ReturnType<T>;
  } as MockFnImplementation<T>;

  mockFn.mockImplementation = function (implementation: T) {
    this._implementation = implementation;
    return this;
  };

  mockFn.mockClear = function () {
    this._implementation = undefined;
  };

  return mockFn;
}

// Types for MediaQueryList listeners
type MediaQueryListener = ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: createMockFn<typeof window.matchMedia>().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: createMockFn<(listener: MediaQueryListener) => void>(),
    removeListener: createMockFn<(listener: MediaQueryListener) => void>(),
    addEventListener: createMockFn<(type: string, listener: EventListener) => void>(),
    removeEventListener: createMockFn<(type: string, listener: EventListener) => void>(),
    dispatchEvent: createMockFn<(event: Event) => boolean>(),
  })),
});

// Mock ResizeObserver
class MockResizeObserver implements Partial<ResizeObserver> {
  observe = createMockFn<ResizeObserver['observe']>();
  unobserve = createMockFn<ResizeObserver['unobserve']>();
  disconnect = createMockFn<ResizeObserver['disconnect']>();
}

window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock IntersectionObserver
class MockIntersectionObserver implements Partial<IntersectionObserver> {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  observe = createMockFn<IntersectionObserver['observe']>();
  unobserve = createMockFn<IntersectionObserver['unobserve']>();
  disconnect = createMockFn<IntersectionObserver['disconnect']>();
  takeRecords = () => [] as IntersectionObserverEntry[];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    // Implementation not needed for mock
  }
}

window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Type for console methods that can be mocked
type MockableConsoleMethods = 'error' | 'warn';
type MockedConsole = Omit<Console, MockableConsoleMethods> & {
  [K in MockableConsoleMethods]: MockFnImplementation<typeof console[K]>
};

// Suppress console errors during tests
const originalConsole = { ...console };

(global.console as MockedConsole) = {
  ...console,
  error: createMockFn<typeof console.error>(),
  warn: createMockFn<typeof console.warn>(),
  // Preserve other console methods
  log: originalConsole.log,
  info: originalConsole.info,
  debug: originalConsole.debug,
  trace: originalConsole.trace
} as MockedConsole;

// Clear mocks after each test
afterEach(() => {
  // Clear window.matchMedia mock
  const mediaQuery = window.matchMedia as unknown as MockFnImplementation<typeof window.matchMedia>;
  mediaQuery?.mockClear();

  // Clear console mocks
  const mockedConsole = console as MockedConsole;
  (['error', 'warn'] as const).forEach((method) => {
    mockedConsole[method]?.mockClear();
  });
});

// Export types for use in tests
export type {
  MockFnImplementation,
  MockableConsoleMethods,
  MockedConsole,
  MediaQueryListener
};