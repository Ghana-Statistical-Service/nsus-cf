

// app/api/gallery/presigned/route.js

// import * as Minio from 'minio';



// const BUCKET = 'nsuscf';
// const EXPIRY = 60 * 60;

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);

//   const objectKey = searchParams
//     .get('key')
//     ?.replace(/^\/+/, '');

//   if (!objectKey) {
//     return Response.json(
//       { error: 'Missing object key' },
//       { status: 400 }
//     );
//   }

//   if (!objectKey.startsWith('gallery/')) {
//     return Response.json(
//       { error: 'Invalid object key' },
//       { status: 403 }
//     );
//   }

//   try {
//     const url = await minioClient.presignedGetObject(
//       BUCKET,
//       objectKey,
//       EXPIRY
//     );

//     return Response.json({ url });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('MinIO presigned URL error:', {
//         message: error.message,
//         endpoint: process.env.MINIO_ENDPOINT,
//         port: process.env.MINIO_PORT,
//         useSSL: process.env.MINIO_USE_SSL,
//         objectKey,
//       });
//     } else {
//     console.error('Unknown MinIO error:', error);
//     }
//     return Response.json(
//       { error: 'Failed to generate URL' },
//       { status: 500 }
//     );
//   }
// }


// app/api/gallery/presigned/route.ts
// Returns a short-lived presigned URL for a MinIO object

import * as Minio from 'minio';
import { NextRequest } from 'next/server';

const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT;
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY;

if (!MINIO_ENDPOINT) {
  throw new Error('MINIO_ENDPOINT is missing');
}

if (!MINIO_ACCESS_KEY) {
  throw new Error('MINIO_ACCESS_KEY is missing');
}

if (!MINIO_SECRET_KEY) {
  throw new Error('MINIO_SECRET_KEY is missing');
}

const minioClient = new Minio.Client({
  endPoint: MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
});

const BUCKET = 'nsuscf';
const EXPIRY = 60 * 60; // 1 hour in seconds

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

  try {
    const url = await minioClient.presignedGetObject(BUCKET, objectKey, EXPIRY);
    return Response.json({ url });
  } catch (error) {
    console.error('MinIO presigned URL error:', error);
    return Response.json({ error: 'Failed to generate URL' }, { status: 500 });
  }
}