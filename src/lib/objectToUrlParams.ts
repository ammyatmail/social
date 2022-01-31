export function objectToUrlParams(object?: { [key: string]: any }) {
  if (!object) {
    return new URLSearchParams();
  }

  const queryString = Object.entries(object).reduce<URLSearchParams>(
    (prev, [key, val]) => {
      if (typeof val !== 'undefined' && val !== null) {
        prev.append(key, String(val));
      }

      return prev;
    },
    new URLSearchParams(),
  );

  return queryString.toString().length > 0 ? `?${queryString}` : '';
}
