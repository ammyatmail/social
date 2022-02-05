export function parseName(name: string) {
  const val = name.match(/[A-Z][a-z]+|[0-9]+/g);
  return val ?? [""];
}
