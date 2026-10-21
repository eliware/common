/** Returns the current filename from import.meta or the supplied directory string. */
export declare function getCurrentFilename(metaOrDir: ImportMeta | string): string;

/** Returns the current directory from import.meta or the supplied directory string. */
export declare function getCurrentDirname(
  metaOrDir: ImportMeta | string,
  dirnameFn?: (path: string) => string,
): string;

/** Joins the current directory with path segments. */
export declare const path: (metaOrDir: ImportMeta | string, ...segments: string[]) => string;

/** Converts a resolved path to a file URL string. */
export declare function pathUrl(metaOrDir: ImportMeta | string, ...segments: string[]): string;

/** Resolves path segments from the module directory. */
export declare function resolvePath(metaOrDir: ImportMeta | string, ...segments: string[]): string;

/** Returns a path relative to the module directory. */
export declare function relativePath(metaOrDir: ImportMeta | string, ...segments: string[]): string;

/** Converts a file URL string or URL object to a file path. */
export declare function fileUrlToPath(fileUrl: string | URL): string;

/** A logger that accepts structured Winston-style records. */
export type PathLogger = Pick<import("./log.mjs").LoggerWithConfiguredLevels, "log">;

/** Options for path helpers with an injected logger. */
export interface PathHelpersOptions {
  logger?: PathLogger;
}

/** Path helper functions that write structured records to the supplied logger. */
export interface PathHelpers {
  getCurrentFilename(metaOrDir: ImportMeta | string): string;
  getCurrentDirname(metaOrDir: ImportMeta | string, dirnameFn?: (path: string) => string): string;
  path(metaOrDir: ImportMeta | string, ...segments: string[]): string;
  pathUrl(metaOrDir: ImportMeta | string, ...segments: string[]): string;
  resolvePath(metaOrDir: ImportMeta | string, ...segments: string[]): string;
  relativePath(metaOrDir: ImportMeta | string, ...segments: string[]): string;
  fileUrlToPath(fileUrl: string | URL): string;
}

/** Creates path helpers that write safe operation records. */
export declare function createPathHelpers(options?: PathHelpersOptions): PathHelpers;

export default path;
