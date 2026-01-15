import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 86400; // 24 hours

export async function GET() {
  const { rows } = await query(
    `SELECT source_id, source_desc FROM sources ORDER BY source_id`
  );
  return NextResponse.json(rows);
}
