// https://codedamn.com/news/javascript/throttling-in-javascript
// Also fires last call

export function throttle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let wait = false;
  let storedArgs: Parameters<T> | null = null;

  const checkStoredArgs = () => {
    if (storedArgs === null) {
      wait = false;
    } else {
      callback(...storedArgs);
      storedArgs = null;
      setTimeout(checkStoredArgs, delay);
    }
  };

  return (...args: Parameters<T>) => {
    if (wait) {
      storedArgs = args;
      return;
    }

    callback(...args);
    wait = true;
    setTimeout(checkStoredArgs, delay);
  };
}
