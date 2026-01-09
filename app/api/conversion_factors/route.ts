/*
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 3600; // 1 hour

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const region = searchParams.get('region');
  const source = searchParams.get('source');
  const commodityGroup = searchParams.get('commodity_group');
  const commodity = searchParams.get('commodity');
  const localUnit = searchParams.get('local_unit');
  const localUnitSize = searchParams.get('local_unit_size');

  const sql = `
    SELECT *
    FROM vw_conversion_factors_api
    WHERE
        ($1::text IS NULL OR LOWER(region) = LOWER($1))
    AND ($2::text IS NULL OR LOWER(source) = LOWER($2))
    AND ($3::text IS NULL OR LOWER(commodity_group) = LOWER($3))
    AND ($4::text IS NULL OR LOWER(commodity) = LOWER($4))
    AND ($5::text IS NULL OR LOWER(local_unit) = LOWER($5))
    AND ($6::text IS NULL OR LOWER(local_unit_size) = LOWER($6))
    LIMIT 1;
  `;

  const { rows } = await query(sql, [
    region,
    source,
    commodityGroup,
    commodity,
    localUnit,
    localUnitSize,
  ]);

  if (rows.length === 0) {
    return NextResponse.json(
      { message: 'No conversion factor found' },
      { status: 404 }
    );
  }

  return NextResponse.json(rows[0]);
}
*/


import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const revalidate = 3600; // 1 hour

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

  /* --- enforce full selection (single-row contract) --- */
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

  const sql = `
    SELECT *
    FROM vw_conversion_factors_api
    WHERE region_id     = $1
      AND source_id     = $2
      AND group_id      = $3
      AND commodity_id  = $4
      AND lunit_id      = $5
      AND lunit_size_id = $6
    LIMIT 1;
  `;

  const { rows } = await query(sql, [
    regionId,
    sourceId,
    groupId,
    commodityId,
    unitId,
    sizeId,
  ]);

  if (rows.length === 0) {
    return NextResponse.json(
      { message: "No conversion factor found" },
      { status: 404 }
    );
  }

  return NextResponse.json(rows[0]);
}