import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { type SessionPayload, getSession } from '#actions/session';
import { getMeServiceWithoutError } from '#services/auth';
import { API_ENDPOINT } from '#utils/endpoints';

export const useMe = () => {
  const { data, isLoading, error, mutate } = useSWR(API_ENDPOINT.USERS_ME, getMeServiceWithoutError, {
    refreshInterval: 5000,
  });
  return { me: data, meIsLoading: isLoading, meError: error, meMutate: mutate };
};

export const useSession = () => {
  const [session, setSession] = useState<SessionPayload | null>(null);
  useEffect(() => {
    (async () => {
      const session = await getSession();
      setSession(session);
    })();
  }, []);
  return { session };
};
