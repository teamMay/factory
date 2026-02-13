/**
 * Mock for @next/env used by payload's loadEnv.
 * Payload does `import nextEnvImport from '@next/env'; const { loadEnvConfig } = nextEnvImport;`
 * Since @next/env is CJS with __esModule but no default export, SWC interop breaks.
 * This mock provides the expected shape.
 */
export const loadEnvConfig = (
  _dir: string,
  _dev?: boolean,
): {
  combinedEnv: NodeJS.ProcessEnv;
  loadedEnvFiles: Array<{ path: string; contents: string }>;
} => ({
  combinedEnv: process.env,
  loadedEnvFiles: [],
});

export default { loadEnvConfig };
