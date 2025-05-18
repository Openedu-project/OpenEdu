import { handleGETAuthCallback } from '@oe/api';
import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return handleGETAuthCallback(request, () => {
    revalidatePath('/');
  });
}
