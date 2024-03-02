import { useEffect, useRef, useState } from 'react';
import { Interval, Progress } from './models';
import { INTERVAL_TIME, NO_OP } from './constants';


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


/**
 * Hook to show the progress of a promise
 * 
 * @param  {Promise<T>} promise
 * @param  {(data:any)=>T=null} mapper
 * @returns Progress<T>
 */
export const useProgress = <T>(
  promise: Promise<T>,
  mapper: (data: any) => T = null,
  refresh: () => Promise<T> = null,
): Progress<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }

    if (error) {
      setError(null);
    }

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

  if (refresh) {
    useInterval((interval) => {
      if (loading) {
        return;
      }
  
      if (!refreshing) {
        setRefreshing(true);
        
        if (error) {
          setError(null);
        }

        refresh().then(data => {
          if (mapper) {
            setData(mapper(data));
          } else {
            setData(data);
          }
        }).catch((error) => {
          setError(error);
        }).finally(() => {
          setRefreshing(false);
        });
      } else {
        if (interval.clear) {
          interval.clear();
        }
      }
    }, INTERVAL_TIME * 2);
  }

  return {
    loading,
    error,
    data,
  };
};