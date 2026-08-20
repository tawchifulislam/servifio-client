import { ApiClientError } from '@/lib/api';

export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong',
): string {
  return error instanceof ApiClientError ? error.message : fallback;
}
