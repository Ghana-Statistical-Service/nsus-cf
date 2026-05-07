// app/api/gallery/filters/route.ts
// Returns distinct values for all filter dropdowns from JSON file

import { readFile } from 'fs/promises';
import path from 'path';

interface Photo {
  id: string;
  unit_name: string;
  commodity?: string;
  source: 'farmgate' | 'household' | 'market';
  size?: string;
  minio_object_key: string;
  uploaded_at?: string;
  uploaded_by?: string;
}

interface GalleryData {
  photos: Photo[];
}

export async function GET() {
  try {
    // Read the JSON metadata file
    const jsonPath = path.join(process.cwd(), 'data', 'gallery-metadata.json');
    const fileContent = await readFile(jsonPath, 'utf-8');
    const data: GalleryData = JSON.parse(fileContent);
    
    const photos = data.photos || [];

    // Extract unique values for each filter
    const sources     = [...new Set(photos.map(p => p.source).filter(Boolean))].sort();
    const commodities = [...new Set(photos.map(p => p.commodity).filter(Boolean))].sort();
    const units       = [...new Set(photos.map(p => p.unit_name).filter(Boolean))].sort();

    return Response.json({ sources, commodities, units });
  } catch (error) {
    console.error('Filters API error:', error);
    return Response.json({ error: 'Failed to fetch filters' }, { status: 500 });
  }
}