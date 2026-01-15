import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 86400; // 24 hours

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sourceId     = searchParams.get('source_id');
  const commodityId  = searchParams.get('commodity_id');

  if (!sourceId || !commodityId) {
    return NextResponse.json([], { status: 400 });
  }

  const { rows } = await query(
    `
    SELECT DISTINCT
      lu.lunit_id,
      lu.lunit_desc
    FROM items i
    JOIN local_unit_sizes lus ON i.lunit_size_id = lus.lunit_size_id
    JOIN local_units lu       ON lus.lunit_id = lu.lunit_id
    WHERE
      i.source_id = $1
      AND i.commodity_id = $2
    ORDER BY lu.lunit_id
    `,
    [sourceId, commodityId]
  );

  return NextResponse.json(rows);
}