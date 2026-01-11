import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sourceId = searchParams.get('source_id');
  const groupId  = searchParams.get('group_id');

  if (!sourceId || !groupId) {
    return NextResponse.json([], { status: 400 });
  }

  const { rows } = await query(
    `
    SELECT DISTINCT
      c.commodity_id,
      c.commodity_desc
    FROM items i
    JOIN commodities c ON i.commodity_id = c.commodity_id
    WHERE
      i.source_id = $1
      AND c.group_id = $2
    ORDER BY c.commodity_id
    `,
    [sourceId, groupId]
  );

  return NextResponse.json(rows);
}

export const revalidate = 3600; // 1 hour