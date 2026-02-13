/**
 * Stub for prettier, which is loaded transitively via:
 * @payloadcms/db-sqlite → @payloadcms/drizzle → payload/node → generateTypes → json-schema-to-typescript → prettier.
 *
 * Prettier's CJS entry uses `import("./index.mjs")` at module evaluation time,
 * which fails in Jest's VM context without --experimental-vm-modules.
 * Since prettier is only used for code formatting in generateTypes (not needed in tests), this stub is safe.
 */

export const format = (source: string): Promise<string> => Promise.resolve(source);

export const check = (): Promise<boolean> => Promise.resolve(true);

export const formatWithCursor = (source: string): Promise<{ formatted: string; cursorOffset: number }> =>
  Promise.resolve({ formatted: source, cursorOffset: 0 });

export const resolveConfig = (): Promise<null> => Promise.resolve(null);

export const getFileInfo = (): Promise<{
  ignored: boolean;
  inferredParser: null;
}> => Promise.resolve({ ignored: false, inferredParser: null });

export const getSupportInfo = (): Promise<{
  languages: never[];
  options: never[];
}> => Promise.resolve({ languages: [], options: [] });

export default {
  format,
  check,
  formatWithCursor,
  resolveConfig,
  getFileInfo,
  getSupportInfo,
};
