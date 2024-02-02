export function isNotNull<A>(x: A | null): x is A {
  return x !== null;
}

export function isNotUndefined<A>(x: A | undefined): x is A {
  return x !== undefined;
}
