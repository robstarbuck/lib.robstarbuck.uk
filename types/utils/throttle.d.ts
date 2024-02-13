export declare function throttle<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void;
