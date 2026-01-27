import{ NextResponse }from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 86400; // 24 hours

export async function GET() {
  const { rows } = await query(
    `SELECT region_id, region FROM regions ORDER BY region_id`
  );
  return NextResponse.json(rows);
}
