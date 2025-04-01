import { expect, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import server from "./mocks/server";
import "@testing-library/jest-dom";
import { vi } from "vitest";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  vi.clearAllMocks();
  vi.resetAllMocks();
  vi.restoreAllMocks();
});

afterAll(() => {
  server.close();
});

expect.extend(matchers);

// Mock TanStack router hooks globally for all tests
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useRouter: () => ({
      navigate: vi.fn(),
    }),
    useMatch: () => ({
      params: {},
    }),
    useMatchRoute: () => vi.fn(),
    Link: ({ children, ...rest }: React.PropsWithChildren) => {
      // Using JSX directly instead of requiring React
      return <a {...rest}>{children}</a>;
    },
  };
});
