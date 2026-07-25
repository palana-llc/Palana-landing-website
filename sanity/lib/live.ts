import {client} from './client';
import type {QueryParams} from '@sanity/client';

export async function sanityFetch<T>(
  query: string,
  params?: QueryParams,
): Promise<T> {
  return client.fetch<T>(query, params ?? {});
}

// Placeholder component so imports don't break.
// It intentionally renders nothing.
export function SanityLive(): null {
  return null;
}
