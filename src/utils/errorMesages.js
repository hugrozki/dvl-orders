export function getErrorMessage(message) {
  if (message.includes("SQLITE_CONSTRAINT_UNIQUE")) {
    return "La descripción ya está registrada anteriormente. Capture otra.";
  }
  return message;
}
