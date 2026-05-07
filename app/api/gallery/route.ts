// app/api/gallery/route.js
// Fetches unit photos from JSON file with optional filters

// import { readFile } from 'fs/promises';
// import path from 'path';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);

//   const source    = searchParams.get('source');
//   const commodity = searchParams.get('commodity');
//   const unit      = searchParams.get('unit');
//   const region    = searchParams.get('region');

//   try {
//     // Read the JSON metadata file
//     const jsonPath = path.join(process.cwd(), 'data', 'gallery-metadata.json');
//     const fileContent = await readFile(jsonPath, 'utf-8');
//     const data = JSON.parse(fileContent);
    
//     let photos = data.photos || [];

//     // Apply filters
//     if (source) {
//       photos = photos.filter(p => p.source === source);
//     }
//     if (commodity) {
//       photos = photos.filter(p => p.commodity === commodity);
//     }
//     if (unit) {
//       photos = photos.filter(p => 
//         p.unit_name.toLowerCase().includes(unit.toLowerCase())
//       );
//     }
//     if (region) {
//       photos = photos.filter(p => p.region === region);
//     }

//     // Sort by commodity and unit name
//     photos.sort((a, b) => {
//       const commodityCompare = (a.commodity || '').localeCompare(b.commodity || '');
//       if (commodityCompare !== 0) return commodityCompare;
//       return (a.unit_name || '').localeCompare(b.unit_name || '');
//     });

//     return Response.json({ photos });
//   } catch (error) {
//     console.error('Gallery API error:', error);
//     return Response.json({ error: 'Failed to fetch photos' }, { status: 500 });
//   }
// }


// app/api/gallery/route.ts
// Fetches unit photos from JSON file with optional filters, search, and pagination

import { readFile } from 'fs/promises';
import path from 'path';
import { NextRequest } from 'next/server';

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const source    = searchParams.get('source');
  const commodity = searchParams.get('commodity');
  const unit      = searchParams.get('unit');
  const search    = searchParams.get('search');
  const page      = parseInt(searchParams.get('page') || '1');
  const limit     = parseInt(searchParams.get('limit') || '12');

  try {
    // Read the JSON metadata file
    const jsonPath = path.join(process.cwd(), 'data', 'gallery-metadata.json');
    const fileContent = await readFile(jsonPath, 'utf-8');
    const data: GalleryData = JSON.parse(fileContent);
    
    let photos = data.photos || [];

    // Apply filters
    if (source) {
      photos = photos.filter(p => p.source === source);
    }
    if (commodity) {
      photos = photos.filter(p => p.commodity === commodity);
    }
    if (unit) {
      photos = photos.filter(p => 
        p.unit_name.toLowerCase().includes(unit.toLowerCase())
      );
    }

    // Apply search (searches across unit_name and commodity)
    if (search) {
      const searchLower = search.toLowerCase();
      photos = photos.filter(p => 
        p.unit_name.toLowerCase().includes(searchLower) ||
        (p.commodity && p.commodity.toLowerCase().includes(searchLower))
      );
    }

    // Sort by commodity and unit name
    photos.sort((a, b) => {
      const commodityCompare = (a.commodity || '').localeCompare(b.commodity || '');
      if (commodityCompare !== 0) return commodityCompare;
      return (a.unit_name || '').localeCompare(b.unit_name || '');
    });

    // Calculate pagination
    const total = photos.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPhotos = photos.slice(startIndex, endIndex);

    return Response.json({
      photos: paginatedPhotos,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Gallery API error:', error);
    return Response.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}
