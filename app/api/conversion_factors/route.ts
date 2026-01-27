import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const revalidate = 3600;

/* ---------- helpers ---------- */
const cleanInt = (v: string | null): number | null => {
  if (!v) return null;
  const n = Number(v.trim());
  return Number.isInteger(n) ? n : null;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const regionId     = cleanInt(searchParams.get("region_id"));
  const sourceId     = cleanInt(searchParams.get("source_id"));
  const groupId      = cleanInt(searchParams.get("group_id"));
  const commodityId  = cleanInt(searchParams.get("commodity_id"));
  const unitId       = cleanInt(searchParams.get("lunit_id"));
  const sizeId       = cleanInt(searchParams.get("lunit_size_id"));

  /* --- strict validation --- */
  if (
    regionId === null ||
    sourceId === null ||
    groupId === null ||
    commodityId === null ||
    unitId === null ||
    sizeId === null
  ) {
    return NextResponse.json(
      { error: "All filter IDs are required" },
      { status: 400 }
    );
  }

  /* --- choose source dynamically --- */
  const isNational = regionId === 0;

  const sql = isNational
    ? `
      SELECT *
      FROM vw_national_cf_api
      WHERE source_id     = $1
        AND group_id      = $2
        AND commodity_id  = $3
        AND lunit_id      = $4
        AND lunit_size_id = $5
      LIMIT 1;
    `
    : `
      SELECT *
      FROM vw_regional_cf_api
      WHERE region_id     = $1
        AND source_id     = $2
        AND group_id      = $3
        AND commodity_id  = $4
        AND lunit_id      = $5
        AND lunit_size_id = $6
      LIMIT 1;
    `;

  const params = isNational
    ? [sourceId, groupId, commodityId, unitId, sizeId]
    : [regionId, sourceId, groupId, commodityId, unitId, sizeId];

  const { rows } = await query(sql, params);

  if (rows.length === 0) {
    return NextResponse.json(
      { message: "No conversion factor found" },
      { status: 404 }
    );
  }

  return NextResponse.json(rows[0]);
}