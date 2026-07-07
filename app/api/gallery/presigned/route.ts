// app/api/gallery/presigned/route.ts
// Returns a short-lived presigned URL for a MinIO object

import * as Minio from 'minio';
import { NextRequest } from 'next/server';

const BUCKET = 'nsuscf';
const EXPIRY = 60 * 60; // 1 hour in seconds

// Client is created lazily so the build doesn't fail when MinIO env vars
// aren't present (Next imports this module at build time to collect page data).
let minioClient: Minio.Client | null = null;

function getMinioClient(): Minio.Client | null {
  if (minioClient) return minioClient;

  const endPoint = process.env.MINIO_ENDPOINT;
  const accessKey = process.env.MINIO_ACCESS_KEY;
  const secretKey = process.env.MINIO_SECRET_KEY;

  if (!endPoint || !accessKey || !secretKey) {
    return null;
  }

  minioClient = new Minio.Client({
    endPoint,
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey,
    secretKey,
  });
  return minioClient;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const objectKey = searchParams
    .get('key')
    ?.replace(/^\/+/, '');

  if (!objectKey) {
    return Response.json({ error: 'Missing object key' }, { status: 400 });
  }

  // Basic security: only allow keys under gallery/
  if (!objectKey.startsWith('gallery/')) {
    return Response.json({ error: 'Invalid object key' }, { status: 403 });
  }

  const client = getMinioClient();
  if (!client) {
    console.error('MinIO env vars missing (MINIO_ENDPOINT / MINIO_ACCESS_KEY / MINIO_SECRET_KEY)');
    return Response.json({ error: 'Storage not configured' }, { status: 503 });
  }

  try {
    const url = await client.presignedGetObject(BUCKET, objectKey, EXPIRY);
    return Response.json({ url });
  } catch (error) {
    console.error('MinIO presigned URL error:', error);
    return Response.json({ error: 'Failed to generate URL' }, { status: 500 });
  }
}
