export function logParams(params: URLSearchParams) {
  for (const [key, value] of params.entries()) {
    console.log(`${key}: ${value}`);
  }
}