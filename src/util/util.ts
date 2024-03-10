
function getRandomKey<T>(obj: T): keyof T;
function getRandomKey<T>(arr: T[]): number;
function getRandomKey<T>(input: T | T[]): keyof T | number | undefined {
  if (Array.isArray(input)) {
    // Input is an array, pick a random index
    return Math.floor(Math.random() * input.length);
  } else {
    // Input is an object, pick a random key
    const keys = Object.keys(input as Record<string, unknown>) as (keyof T)[];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return randomKey;
  }
}

export { getRandomKey }