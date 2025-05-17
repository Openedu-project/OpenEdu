export const createAsyncMutex = () => {
  let locked = false;
  const waitingQueue: Array<() => void> = [];

  const getThreadId = (): string => {
    return Math.random().toString(36).substring(2, 8); // ID ngẫu nhiên
  };

  // Function to acquire the mutex
  const acquire = async (): Promise<() => void> => {
    // If mutex is not locked, acquire it immediately
    console.log(`🔒 Mutex: (Thread ${getThreadId()}) Attempting to acquire lock`);

    if (!locked) {
      locked = true;
      console.log(`🔒 Mutex: (Thread ${getThreadId()}) Lock acquired immediately`);
      return () => release();
    }

    console.log(`⏳ Mutex: (Thread ${getThreadId()}) Lock already taken, waiting...`);

    // Otherwise, wait for the mutex to be released
    return new Promise<() => void>(resolve => {
      // Add release callback to waiting queue
      waitingQueue.push(() => {
        locked = true; // Acquire the lock for the next waiter
        console.log(`🔓 Mutex: (Thread ${getThreadId()}) Lock acquired after waiting`);
        resolve(() => release());
      });
    });
  };

  // Function to release the mutex
  const release = (): void => {
    console.log(`🔓 Mutex: (Thread ${getThreadId()}) Releasing lock`);
    if (waitingQueue.length > 0) {
      console.log(`🔄 Mutex: (Thread ${getThreadId()}) Passing lock to next waiter (${waitingQueue.length} waiting)`);
      // If there are waiters, let the next one proceed
      const nextWaiter = waitingQueue.shift();
      if (nextWaiter) {
        nextWaiter();
      }
    } else {
      console.log(`🔓 Mutex: (Thread ${getThreadId()}) No waiters, lock is free`);
      // Otherwise, release the mutex
      locked = false;
    }
  };

  return {
    acquire,
  };
};
