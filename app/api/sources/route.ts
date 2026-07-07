import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { query } from '@/lib/db';

// Cached at runtime (not build time) so the build doesn't need a live DB.
export const dynamic = 'force-dynamic';

const getSources = unstable_cache(
  async () => {
    const { rows } = await query(
      `SELECT source_id, source_desc FROM sources ORDER BY source_id`
    );
    return rows;
  },
  ['sources'],
  { revalidate: 86400 } // 24 hours
);

export async function GET() {
  return NextResponse.json(await getSources());
}
