export const createIdSegment = () => {
  const randomUUID = globalThis.crypto?.randomUUID;
  if (typeof randomUUID === "function") {
    return randomUUID.call(globalThis.crypto);
  }

  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 10) || "0";
  return `${timestamp}-${random}`;
};

export const createPrefixedId = (prefix: string) => `${prefix}-${createIdSegment()}`;