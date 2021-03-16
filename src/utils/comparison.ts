export const shallowEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) { return true; }

  if (typeof a !== 'object' || typeof b !== 'object') { return false; }
  if (a == null || b == null) { return false; }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) { return false; }

  for (let i = 0; i < keysA.length; i += 1) {
    const key = keysA[i];
    if (a[key] !== b[key]) { return false; }
  }

  return true;
};
