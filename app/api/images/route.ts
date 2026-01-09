import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const lunitSizeId = Number(searchParams.get('lunit_size_id'));
    const commodityId = Number(searchParams.get('commodity_id'));
    const sourceId = Number(searchParams.get('source_id'));

    if ([lunitSizeId, commodityId, sourceId].some(Number.isNaN)) {
      // Do NOT error for images
      return new NextResponse(null, { status: 204 });
    }

    const { rows } = await query(
      `
      SELECT img.image, img.mime_type
      FROM items i
      JOIN images img
        ON img.image_id = i.item_id
      WHERE i.lunit_size_id = $1
        AND i.commodity_id = $2
        AND i.source_id = $3
      LIMIT 1
      `,
      [lunitSizeId, commodityId, sourceId]
    );

    if (rows.length === 0) {
      // Silent success – no image
      return new NextResponse(null, { status: 204 });
    }

    const { image, mime_type } = rows[0];

    return new NextResponse(image, {
      status: 200,
      headers: {
        'Content-Type': mime_type,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    // Absolute last-resort safety
    return new NextResponse(null, { status: 204 });
  }
}