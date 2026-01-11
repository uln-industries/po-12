import type { Pattern } from "./types";

// Maximum allowed file size for pattern uploads (100KB)
// Pattern files are small JSON - 100KB is generous for 16 patterns
const MAX_PATTERN_FILE_SIZE = 100 * 1024;

export class PatternFileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PatternFileError";
  }
}

/**
 * Accept a file upload of a .json pattern file.
 * Validates file size to prevent memory exhaustion attacks.
 */
const importPatternFile = () => {
  return new Promise<File>((resolve, reject) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file size to prevent memory exhaustion
      if (file.size > MAX_PATTERN_FILE_SIZE) {
        reject(
          new PatternFileError(
            `File too large. Maximum size is ${MAX_PATTERN_FILE_SIZE / 1024}KB.`
          )
        );
        return;
      }

      resolve(file);
    };
    fileInput.click();
  });
};

/**
 * Export a pattern file as JSON.
 */
const exportPatternFile = (patterns: Pattern[]) => {
  const json = JSON.stringify(patterns);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "patterns.json";
  link.click();
  URL.revokeObjectURL(url);
};

export { importPatternFile, exportPatternFile };
