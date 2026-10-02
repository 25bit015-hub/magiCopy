import { useEffect, useState } from 'react';
import { useToast } from '../context/AppContext';

type LoadingState = 'idle' | 'loading' | 'error' | 'success';

export function useApi<T>(
  fetcher: () => Promise<T>,
  dependencies: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<LoadingState>('idle');
  const [error, setError] = useState<Error | null>(null);
  const { push } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        setState('loading');
        setError(null);
        const result = await fetcher();
        if (isMounted) {
          setData(result);
          setState('success');
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error('Unknown error');
          setError(error);
          setState('error');
          push({ type: 'error', message: error.message });
        }
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    setState('loading');
    try {
      const result = await fetcher();
      setData(result);
      setState('success');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      setState('error');
      push({ type: 'error', message: error.message });
    }
  };

  return { data, state, error, refetch, isLoading: state === 'loading' };
}
