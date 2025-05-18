import { handleGETRefreshToken, handlePOSTRefreshToken } from '@oe/api';
import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return handleGETRefreshToken(request, () => {
    revalidatePath('/');
  });
}

export async function POST(request: NextRequest) {
  return handlePOSTRefreshToken(request, () => {
    revalidatePath('/');
  });
}
