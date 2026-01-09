import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 3600; // 1 hour

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sourceId = searchParams.get('source_id');

  if (!sourceId) {
    return NextResponse.json([], { status: 400 });
  }

  const { rows } = await query(
    `
    SELECT DISTINCT
      cg.group_id,
      cg.group_desc
    FROM items i
    JOIN commodities c        ON i.commodity_id = c.commodity_id
    JOIN commodity_groups cg  ON c.group_id = cg.group_id
    WHERE i.source_id = $1
    ORDER BY cg.group_id
    `,
    [sourceId]
  );

  return NextResponse.json(rows);
}
