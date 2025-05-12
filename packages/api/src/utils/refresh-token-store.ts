import type { NextResponse } from 'next/server';
// import type { JWT } from 'next-auth/jwt';
import type { IToken } from '#types/auth';
import { createAsyncMutex } from '../utils/mutex';
// Singleton mutex
export const globalRefreshMutex = createAsyncMutex();

// Singleton promise tracking
let _refreshTokenPromise: Promise<NextResponse<IToken | { error: string }>> | null = null;

export const getRefreshTokenPromise = () => _refreshTokenPromise;
export const setRefreshTokenPromise = (promise: Promise<NextResponse<IToken | { error: string }>> | null) => {
  _refreshTokenPromise = promise;
};
