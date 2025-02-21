import { headers } from 'next/headers';

// Define regex pattern at the top level for better performance
const MOBILE_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;

export async function isMobile() {
  // Get the headers from the request
  const headersList = headers();
  const userAgent = (await headersList).get('user-agent') || '';

  return MOBILE_REGEX.test(userAgent);
}
