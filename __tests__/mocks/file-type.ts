/**
 * Stub for file-type, loaded transitively via payload/dist/uploads/getFileByPath.js.
 *
 * file-type@21 is ESM-only and its package.json `exports` map declares only
 * `import`/`module-sync` conditions (no `require`/`default`), so Jest's CJS
 * resolver cannot locate it from payload's compiled output. Upload helpers
 * aren't exercised by these tests, so an inert stub is sufficient.
 */

type FileTypeResult = { ext: string; mime: string } | undefined;

export const fileTypeFromFile = (): Promise<FileTypeResult> => Promise.resolve(undefined);

export const fileTypeFromBuffer = (): Promise<FileTypeResult> => Promise.resolve(undefined);

export const fileTypeFromStream = (): Promise<FileTypeResult> => Promise.resolve(undefined);

export const fileTypeFromBlob = (): Promise<FileTypeResult> => Promise.resolve(undefined);

export class FileTypeParser {
  fromFile(): Promise<FileTypeResult> {
    return Promise.resolve(undefined);
  }
  fromBuffer(): Promise<FileTypeResult> {
    return Promise.resolve(undefined);
  }
  fromStream(): Promise<FileTypeResult> {
    return Promise.resolve(undefined);
  }
  fromBlob(): Promise<FileTypeResult> {
    return Promise.resolve(undefined);
  }
}

export default {
  fileTypeFromFile,
  fileTypeFromBuffer,
  fileTypeFromStream,
  fileTypeFromBlob,
  FileTypeParser,
};
