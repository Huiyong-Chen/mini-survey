class EventEmitter<T extends Record<string, any[]>> {
  private listeners: { [P in keyof T]?: Set<(...args: T[P]) => void> } = {};

  on<K extends keyof T>(eventName: K, listener: (...args: T[K]) => void) {
    if (this.listeners[eventName] === undefined) {
      this.listeners[eventName] = new Set();
    }
    this.listeners[eventName].add(listener);
  }

  emit<K extends keyof T>(eventName: K, ...args: T[K]) {
    if (!this.listeners[eventName]) {
      return;
    }
    this.listeners[eventName].forEach((listener) => listener(...args));
  }
  off<K extends keyof T>(eventName: K, listener: (...args: T[K]) => void) {
    if (!this.listeners[eventName]) {
      return;
    }
    this.listeners[eventName].delete(listener);
  }
}

export const ERROR_API_ERROR_KEY = 'API:ERROR';

type EventNames = {
  [ERROR_API_ERROR_KEY]: [message: string];
};

export default new EventEmitter<EventNames>();
