export function debounce<T extends any[]>(fn: (...args: T) => void, delay: number = 250) {
  let timer: number | null = null;
  return function (...args: T) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      clearTimeout(timer!);
    }, delay);
  };
}
