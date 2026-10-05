import { defineOperation } from '@sine-kits/kit-sdk/server';
import type { KitRecord } from '@sine-kits/kit-contracts';

/** Persist a reading entry only through the installation-bound capability gateway. */
export default defineOperation<{ title: string; url: string; note: string }, KitRecord>(
  async (input, context) => {
    if (
      !input ||
      typeof input.title !== 'string' ||
      typeof input.url !== 'string' ||
      typeof input.note !== 'string'
    )
      throw new Error('Invalid reading entry.');
    const title = input.title.trim();
    if (!title || input.title.length > 160 || input.url.length > 2048 || input.note.length > 1000)
      throw new Error('Invalid reading entry length.');
    const url = new URL(input.url);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password)
      throw new Error('Article URL must be HTTP/HTTPS without credentials.');
    return context.records.create({
      type: 'reading-entry',
      data: { title, url: url.href, note: input.note.trim() },
    });
  },
);
