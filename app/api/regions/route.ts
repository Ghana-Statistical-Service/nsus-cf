import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { query } from '@/lib/db';

// Cached at runtime (not build time) so the build doesn't need a live DB.
export const dynamic = 'force-dynamic';

const getRegions = unstable_cache(
  async () => {
    const { rows } = await query(
      `SELECT region_id, region FROM regions ORDER BY region_id`
    );
    return rows;
  },
  ['regions'],
  { revalidate: 86400 } // 24 hours
);

export async function GET() {
  return NextResponse.json(await getRegions());
}
