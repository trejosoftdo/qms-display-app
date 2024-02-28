import { useEffect, useRef, useState } from 'react';
import { Interval, Progress } from './models';
import { NO_OP } from './constants';

/**
 * Hook to show the progress of a promise
 * 
 * @param  {Promise<T>} promise
 * @param  {(data:any)=>T=null} mapper
 * @returns Progress<T>
 */
export const useProgress = <T>(promise: Promise<T>, mapper: (data: any) => T = null): Progress<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setLoading(true);
    promise.then(data => {
      if (mapper) {
        setData(mapper(data));
      } else {
        setData(data);
      }
    }).catch((error) => {
      setError(error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  
  return {
    loading,
    error,
    data,
  };
};

/**
 * Hook to execute a call back at a given interval
 * 
 * @param  {()=>void} callback
 * @param  {number} delay
 * @returns void
 */
export const useInterval = (callback: (interval: Interval) => void, delay: number): void => {
  const callbackRef = useRef<(interval: Interval) => void>(NO_OP);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const interval: Interval = {
      clear: undefined,
    };
  
    const run = () => {
      callbackRef.current(interval);
    };

    if (delay !== null) {
      const intervalRef = setInterval(run, delay);
      interval.clear = () => clearInterval(intervalRef);
    }
  }, [delay]);
};