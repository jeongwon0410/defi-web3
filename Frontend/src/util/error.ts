export const getErrorMessage = (e: unknown) =>
  e instanceof Error ? e.message : String(e);
