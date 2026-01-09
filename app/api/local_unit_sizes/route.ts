import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 3600; // 1 hour

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sourceId    = searchParams.get('source_id');
  const commodityId = searchParams.get('commodity_id');
  const lunitId     = searchParams.get('lunit_id');

  if (!sourceId || !commodityId || !lunitId) {
    return NextResponse.json([], { status: 400 });
  }

  const { rows } = await query(
    `
    SELECT DISTINCT
      lus.lunit_size_id,
      lus.lunit_size_desc
    FROM items i
    JOIN local_unit_sizes lus ON i.lunit_size_id = lus.lunit_size_id
    WHERE
      i.source_id = $1
      AND i.commodity_id = $2
      AND lus.lunit_id = $3
    ORDER BY lus.lunit_size_id
    `,
    [sourceId, commodityId, lunitId]
  );

  return NextResponse.json(rows);
}