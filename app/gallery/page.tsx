// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// const SOURCE_LABELS = {
//   farmgate: 'Farm Gate',
//   household: 'Household',
//   market: 'Market',
// };

// const SOURCE_COLORS = {
//   farmgate:  'bg-green-100 text-green-800 border-green-300',
//   household: 'bg-blue-100 text-blue-800 border-blue-300',
//   market:    'bg-orange-100 text-orange-800 border-orange-300',
// };

// type photo = {
//   id: number;
//   minio_object_key: string;
//   unit_name: string;
//   commodity?: string;
//   region?: string;
//   size?: string;
//   source: string;
//   description?: string;
// };

// function PhotoCard({ photo }: { photo: Photo }) {
//   const [imgUrl, setImgUrl] = useState(null);
//   const [open, setOpen]     = useState(false);
//   const colorClass = SOURCE_COLORS[Photo.source] || 'bg-slate-100 text-slate-800 border-slate-300';

//   useEffect(() => {
//     fetch(`/api/gallery/presigned?key=${encodeURIComponent(photo.minio_object_key)}`)
//       .then(r => r.json())
//       .then(d => setImgUrl(d.url))
//       .catch(() => {});
//   }, [photo.minio_object_key]);

//   return (
//     <>
//       <div
//         onClick={() => setOpen(true)}
//         className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col"
//       >
//         {/* Image */}
//         <div className="w-full h-48 bg-slate-100 relative">
//           {imgUrl ? (
//             <img
//               src={imgUrl}
//               alt={`${photo.unit_name} - ${photo.commodity}`}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
//               Loading…
//             </div>
//           )}

//           {/* Source badge */}
//           <span className={`absolute top-2 right-2 border rounded-full px-3 py-0.5 text-xs font-semibold ${colorClass}`}>
//             {SOURCE_LABELS[photo.source] || photo.source}
//           </span>
//         </div>

//         {/* Info */}
//         <div className="p-3.5 pb-4">
//           <div className="font-bold text-base text-slate-900 mb-1">
//             {photo.unit_name}
//           </div>
//           {photo.commodity && (
//             <div className="text-sm text-slate-600 mb-0.5">
//               🌾 {photo.commodity}
//             </div>
//           )}
//           {photo.region && (
//             <div className="text-xs text-slate-500">📍 {photo.region}</div>
//           )}
//           {photo.size && (
//             <div className="text-xs text-slate-500">📐 {photo.size}</div>
//           )}
//         </div>
//       </div>

//       {/* Lightbox */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-5"
//         >
//           <div
//             onClick={e => e.stopPropagation()}
//             className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
//           >
//             {imgUrl && (
//               <img 
//                 src={imgUrl} 
//                 alt={photo.unit_name}
//                 className="w-full max-h-96 object-contain bg-slate-50"
//               />
//             )}
//             <div className="p-5 pb-6">
//               <div className="font-bold text-xl mb-2">{photo.unit_name}</div>
//               <table className="text-sm text-slate-600 w-full border-collapse">
//                 <tbody>
//                   {[
//                     ['Commodity', photo.commodity],
//                     ['Source',    SOURCE_LABELS[photo.source] || photo.source],
//                     ['Region',    photo.region],
//                     ['Size',      photo.size],
//                   ].filter(([, v]) => v).map(([label, value]) => (
//                     <tr key={label}>
//                       <td className="py-1 pr-3 font-semibold text-slate-900 whitespace-nowrap">{label}</td>
//                       <td className="py-1">{value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {photo.description && (
//                 <p className="mt-3 text-sm text-slate-600 leading-relaxed">{photo.description}</p>
//               )}
//               <button
//                 onClick={() => setOpen(false)}
//                 className="mt-4 px-6 py-2 bg-brandPurple text-white rounded-lg text-sm font-semibold hover:bg-brandTeal transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default function GalleryPage() {
//   const [photos,      setPhotos]      = useState([]);
//   const [filters,     setFilters]     = useState({ sources: [], commodities: [], units: [], regions: [] });
//   const [selected,    setSelected]    = useState({ source: '', commodity: '', unit: '', region: '' });
//   const [loading,     setLoading]     = useState(true);
//   const [error,       setError]       = useState(null);

//   // Load filter options once
//   useEffect(() => {
//     fetch('/api/gallery/filters')
//       .then(r => r.json())
//       .then(setFilters)
//       .catch(() => {});
//   }, []);

//   // Load photos whenever filters change
//   const fetchPhotos = useCallback(() => {
//     setLoading(true);
//     const params = new URLSearchParams();
//     Object.entries(selected).forEach(([k, v]) => { if (v) params.set(k, v); });

//     fetch(`/api/gallery?${params.toString()}`)
//       .then(r => r.json())
//       .then(d => { setPhotos(d.photos || []); setLoading(false); })
//       .catch(() => { setError('Failed to load photos.'); setLoading(false); });
//   }, [selected]);

//   useEffect(() => { fetchPhotos(); }, [fetchPhotos]);

//   const handleFilter = (key, value) =>
//     setSelected(prev => ({ ...prev, [key]: value }));

//   const clearFilters = () =>
//     setSelected({ source: '', commodity: '', unit: '', region: '' });

//   const hasActiveFilters = Object.values(selected).some(Boolean);

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Navbar />

//       <main className="flex-1 pt-[120px] pb-16">
//         {/* Header */}
//         <div className="bg-brandPurple text-white py-12 px-4">
//           <div className="max-w-6xl mx-auto">
//             <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
//               📷 Photo Gallery
//             </h1>
//             <p className="mt-3 text-base leading-relaxed text-white/90 max-w-3xl">
//               Visual reference of local non-standard units used across Ghana
//             </p>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white border-b border-slate-200 py-4 px-4">
//           <div className="max-w-6xl mx-auto flex flex-wrap gap-3 items-center">
//             <span className="text-sm font-semibold text-slate-600 mr-1">Filter by:</span>

//             {[
//               { key: 'source',    label: 'Source',    options: filters.sources,      labelMap: SOURCE_LABELS },
//               { key: 'commodity', label: 'Commodity',  options: filters.commodities,  labelMap: null },
//               { key: 'unit',      label: 'Unit',       options: filters.units,        labelMap: null },
//               { key: 'region',    label: 'Region',     options: filters.regions,      labelMap: null },
//             ].map(({ key, label, options, labelMap }) => (
//               <select
//                 key={key}
//                 value={selected[key]}
//                 onChange={e => handleFilter(key, e.target.value)}
//                 className="px-3 py-2 rounded-lg border-2 border-slate-300 text-sm bg-white text-slate-700 cursor-pointer min-w-[160px] focus:outline-none focus:border-brandPurple"
//               >
//                 <option value="">All {label}s</option>
//                 {(options || []).map(opt => (
//                   <option key={opt} value={opt}>
//                     {labelMap ? (labelMap[opt] || opt) : opt}
//                   </option>
//                 ))}
//               </select>
//             ))}

//             {hasActiveFilters && (
//               <button
//                 onClick={clearFilters}
//                 className="px-4 py-2 bg-red-50 text-red-700 border-2 border-red-200 rounded-lg text-sm font-semibold transition hover:bg-red-100"
//               >
//                 ✕ Clear
//               </button>
//             )}

//             <span className="ml-auto text-sm text-slate-500">
//               {loading ? 'Loading…' : `${photos.length} photo${photos.length !== 1 ? 's' : ''}`}
//             </span>
//           </div>
//         </div>

//         {/* Grid */}
//         <div className="max-w-6xl mx-auto px-4 py-10">
//           {error && (
//             <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-5 border border-red-200">
//               {error}
//             </div>
//           )}

//           {!loading && photos.length === 0 && !error && (
//             <div className="text-center py-16 text-slate-400">
//               <div className="text-5xl">📭</div>
//               <div className="mt-3 text-base">No photos found for the selected filters.</div>
//               {hasActiveFilters && (
//                 <button 
//                   onClick={clearFilters} 
//                   className="mt-3 text-brandPurple hover:underline text-sm font-medium"
//                 >
//                   Clear filters
//                 </button>
//               )}
//             </div>
//           )}

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//             {photos.map(photo => (
//               <PhotoCard key={photo.id} photo={photo} />
//             ))}
//           </div>
//         </div>
//       </main>

//       {totalPages > 1 && (
//         <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">

//           <button
//             disabled={page === 1}
//             onClick={() => setPage(prev => prev - 1)}
//             className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
//           >
//             ← Previous
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
//             <button
//               key={num}
//               onClick={() => setPage(num)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
//                 page === num
//                   ? 'bg-brandPurple text-white border-brandPurple'
//                   : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
//               }`}
//             >
//               {num}
//             </button>
//           ))}

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(prev => prev + 1)}
//             className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
//           >
//             Next →
//           </button>

//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }


// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// type Photo = {
//   id: number;
//   minio_object_key: string;
//   unit_name: string;
//   commodity?: string;
//   region?: string;
//   size?: string;
//   source: string;
//   description?: string;
// };

// type Filters = {
//   sources: string[];
//   commodities: string[];
//   units: string[];
//   regions: string[];
// };

// type SelectedFilters = {
//   source: string;
//   commodity: string;
//   unit: string;
//   region: string;
// };

// const SOURCE_LABELS: Record<string, string> = {
//   farmgate: 'Farm Gate',
//   household: 'Household',
//   market: 'Market',
// };

// const SOURCE_COLORS: Record<string, string> = {
//   farmgate: 'bg-green-100 text-green-800 border-green-300',
//   household: 'bg-blue-100 text-blue-800 border-blue-300',
//   market: 'bg-orange-100 text-orange-800 border-orange-300',
// };

// function PhotoCard({ photo }: { photo: Photo }) {
//   const [imgUrl, setImgUrl] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);

//   const colorClass =
//     SOURCE_COLORS[photo.source] ||
//     'bg-slate-100 text-slate-800 border-slate-300';

//   useEffect(() => {
//     fetch(
//       `/api/gallery/presigned?key=${encodeURIComponent(
//         photo.minio_object_key
//       )}`
//     )
//       .then((r) => r.json())
//       .then((d) => setImgUrl(d.url))
//       .catch(() => {});
//   }, [photo.minio_object_key]);

//   return (
//     <>
//       <div
//         onClick={() => setOpen(true)}
//         className="flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
//       >
//         {/* Image */}
//         <div className="relative h-48 w-full bg-slate-100">
//           {imgUrl ? (
//             <img
//               src={imgUrl}
//               alt={`${photo.unit_name} - ${photo.commodity ?? ''}`}
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
//               Loading…
//             </div>
//           )}

//           {/* Source badge */}
//           <span
//             className={`absolute right-2 top-2 rounded-full border px-3 py-0.5 text-xs font-semibold ${colorClass}`}
//           >
//             {SOURCE_LABELS[photo.source] || photo.source}
//           </span>
//         </div>

//         {/* Info */}
//         <div className="p-3.5 pb-4">
//           <div className="mb-1 text-base font-bold text-slate-900">
//             {photo.unit_name}
//           </div>

//           {photo.commodity && (
//             <div className="mb-0.5 text-sm text-slate-600">
//               🌾 {photo.commodity}
//             </div>
//           )}

//           {photo.region && (
//             <div className="text-xs text-slate-500">
//               📍 {photo.region}
//             </div>
//           )}

//           {photo.size && (
//             <div className="text-xs text-slate-500">
//               📐 {photo.size}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Lightbox */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5"
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
//           >
//             {imgUrl && (
//               <img
//                 src={imgUrl}
//                 alt={photo.unit_name}
//                 className="max-h-96 w-full object-contain bg-slate-50"
//               />
//             )}

//             <div className="p-5 pb-6">
//               <div className="mb-2 text-xl font-bold">
//                 {photo.unit_name}
//               </div>

//               <table className="w-full border-collapse text-sm text-slate-600">
//                 <tbody>
//                   {[
//                     ['Commodity', photo.commodity],
//                     [
//                       'Source',
//                       SOURCE_LABELS[photo.source] || photo.source,
//                     ],
//                     ['Region', photo.region],
//                     ['Size', photo.size],
//                   ]
//                     .filter(([, v]) => v)
//                     .map(([label, value]) => (
//                       <tr key={label}>
//                         <td className="whitespace-nowrap py-1 pr-3 font-semibold text-slate-900">
//                           {label}
//                         </td>
//                         <td className="py-1">{value}</td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>

//               {photo.description && (
//                 <p className="mt-3 text-sm leading-relaxed text-slate-600">
//                   {photo.description}
//                 </p>
//               )}

//               <button
//                 onClick={() => setOpen(false)}
//                 className="mt-4 rounded-lg bg-brandPurple px-6 py-2 text-sm font-semibold text-white transition hover:bg-brandTeal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default function GalleryPage() {
//   const [photos, setPhotos] = useState<Photo[]>([]);

//   const [filters, setFilters] = useState<Filters>({
//     sources: [],
//     commodities: [],
//     units: [],
//     regions: [],
//   });

//   const [selected, setSelected] = useState<SelectedFilters>({
//     source: '',
//     commodity: '',
//     unit: '',
//     region: '',
//   });

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState<string | null>(null);

//   // Load filter options once
//   useEffect(() => {
//     fetch('/api/gallery/filters')
//       .then((r) => r.json())
//       .then(setFilters)
//       .catch(() => {});
//   }, []);

//   // Load photos whenever filters change
//   const fetchPhotos = useCallback(() => {
//     setLoading(true);

//     const params = new URLSearchParams();

//     Object.entries(selected).forEach(([k, v]) => {
//       if (v) params.set(k, v);
//     });

//     fetch(`/api/gallery?${params.toString()}`)
//       .then((r) => r.json())
//       .then((d) => {
//         setPhotos(d.photos || []);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError('Failed to load photos.');
//         setLoading(false);
//       });
//   }, [selected]);

//   useEffect(() => {
//     fetchPhotos();
//   }, [fetchPhotos]);

//   const handleFilter = (
//     key: keyof SelectedFilters,
//     value: string
//   ) => {
//     setSelected((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const clearFilters = () =>
//     setSelected({
//       source: '',
//       commodity: '',
//       unit: '',
//       region: '',
//     });

//   const hasActiveFilters = Object.values(selected).some(Boolean);

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Navbar />

//       <main className="flex-1 pb-16 pt-[120px]">
//         {/* Header */}
//         <div className="bg-brandPurple px-4 py-12 text-white">
//           <div className="mx-auto max-w-6xl">
//             <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
//               📷 Photo Gallery
//             </h1>

//             <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/90">
//               Visual reference of local non-standard units used across Ghana
//             </p>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="border-b border-slate-200 bg-white px-4 py-4">
//           <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
//             <span className="mr-1 text-sm font-semibold text-slate-600">
//               Filter by:
//             </span>

//             {[
//               {
//                 key: 'source',
//                 label: 'Source',
//                 options: filters.sources,
//                 labelMap: SOURCE_LABELS,
//               },
//               {
//                 key: 'commodity',
//                 label: 'Commodity',
//                 options: filters.commodities,
//                 labelMap: null,
//               },
//               {
//                 key: 'unit',
//                 label: 'Unit',
//                 options: filters.units,
//                 labelMap: null,
//               },
//               {
//                 key: 'region',
//                 label: 'Region',
//                 options: filters.regions,
//                 labelMap: null,
//               },
//             ].map(({ key, label, options, labelMap }) => (
//               <select
//                 key={key}
//                 value={selected[key as keyof SelectedFilters]}
//                 onChange={(e) =>
//                   handleFilter(
//                     key as keyof SelectedFilters,
//                     e.target.value
//                   )
//                 }
//                 className="min-w-[160px] cursor-pointer rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brandPurple focus:outline-none"
//               >
//                 <option value="">All {label}s</option>

//                 {(options || []).map((opt) => (
//                   <option key={opt} value={opt}>
//                     {labelMap
//                       ? labelMap[opt as keyof typeof labelMap] || opt
//                       : opt}
//                   </option>
//                 ))}
//               </select>
//             ))}

//             {hasActiveFilters && (
//               <button
//                 onClick={clearFilters}
//                 className="rounded-lg border-2 border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
//               >
//                 ✕ Clear
//               </button>
//             )}

//             <span className="ml-auto text-sm text-slate-500">
//               {loading
//                 ? 'Loading…'
//                 : `${photos.length} photo${
//                     photos.length !== 1 ? 's' : ''
//                   }`}
//             </span>
//           </div>
//         </div>

//         {/* Grid */}
//         <div className="mx-auto max-w-6xl px-4 py-10">
//           {error && (
//             <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
//               {error}
//             </div>
//           )}

//           {!loading && photos.length === 0 && !error && (
//             <div className="py-16 text-center text-slate-400">
//               <div className="text-5xl">📭</div>

//               <div className="mt-3 text-base">
//                 No photos found for the selected filters.
//               </div>

//               {hasActiveFilters && (
//                 <button
//                   onClick={clearFilters}
//                   className="mt-3 text-sm font-medium text-brandPurple hover:underline"
//                 >
//                   Clear filters
//                 </button>
//               )}
//             </div>
//           )}

//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {photos.map((photo) => (
//               <PhotoCard key={photo.id} photo={photo} />
//             ))}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }


'use client';

// app/gallery/page.tsx
// Photo gallery for local non-standard units — filterable by source, commodity, unit with search and pagination

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

interface GalleryResponse {
  photos: Photo[];
  pagination: PaginationInfo;
}

interface FilterOptions {
  sources: string[];
  commodities: string[];
  units: string[];
}

const SOURCE_LABELS: Record<string, string> = {
  farmgate: 'Farm Gate',
  household: 'Household',
  market: 'Market',
};

const SOURCE_COLORS: Record<string, string> = {
  farmgate:  'bg-green-100 text-green-800 border-green-300',
  household: 'bg-blue-100 text-blue-800 border-blue-300',
  market:    'bg-orange-100 text-orange-800 border-orange-300',
};

interface PhotoCardProps {
  photo: Photo;
}

function PhotoCard({ photo }: PhotoCardProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const colorClass = SOURCE_COLORS[photo.source] || 'bg-slate-100 text-slate-800 border-slate-300';

  useEffect(() => {
    fetch(`/api/gallery/presigned?key=${encodeURIComponent(photo.minio_object_key)}`)
      .then(r => r.json())
      .then(d => setImgUrl(d.url))
      .catch(() => {});
  }, [photo.minio_object_key]);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col"
      >
        {/* Image */}
        <div className="w-full h-48 bg-slate-100 relative">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={`${photo.unit_name} - ${photo.commodity || ''}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
              Loading…
            </div>
          )}

          {/* Source badge */}
          <span className={`absolute top-2 right-2 border rounded-full px-3 py-0.5 text-xs font-semibold ${colorClass}`}>
            {SOURCE_LABELS[photo.source] || photo.source}
          </span>
        </div>

        {/* Info */}
        <div className="p-3.5 pb-4">
          <div className="font-bold text-base text-slate-900 mb-1">
            {photo.unit_name}
          </div>
          {photo.commodity && (
            <div className="text-sm text-slate-600 mb-0.5">
              🌾 {photo.commodity}
            </div>
          )}
          {photo.size && (
            <div className="text-xs text-slate-500">📐 {photo.size}</div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-5"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
          >
            {imgUrl && (
              <img 
                src={imgUrl} 
                alt={photo.unit_name}
                className="w-full max-h-96 object-contain bg-slate-50"
              />
            )}
            <div className="p-5 pb-6">
              <div className="font-bold text-xl mb-2">{photo.unit_name}</div>
              <table className="text-sm text-slate-600 w-full border-collapse">
                <tbody>
                  {[
                    ['Commodity', photo.commodity],
                    ['Source', SOURCE_LABELS[photo.source] || photo.source],
                    ['Size', photo.size],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <tr key={label}>
                      <td className="py-1 pr-3 font-semibold text-slate-900 whitespace-nowrap">{label}</td>
                      <td className="py-1">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => setOpen(false)}
                className="mt-4 px-6 py-2 bg-brandPurple text-white rounded-lg text-sm font-semibold hover:bg-brandTeal transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({ sources: [], commodities: [], units: [] });
  const [selected, setSelected] = useState({ source: '', commodity: '', unit: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load filter options once
  useEffect(() => {
    fetch('/api/gallery/filters')
      .then(r => r.json())
      .then(setFilters)
      .catch(() => {});
  }, []);

  // Load photos whenever filters/search/page change
  const fetchPhotos = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    
    Object.entries(selected).forEach(([k, v]) => { 
      if (v) params.set(k, v); 
    });
    
    if (searchQuery) params.set('search', searchQuery);
    params.set('page', currentPage.toString());
    params.set('limit', '12');

    fetch(`/api/gallery?${params.toString()}`)
      .then(r => r.json())
      .then((d: GalleryResponse) => { 
        setPhotos(d.photos || []); 
        setPagination(d.pagination);
        setLoading(false); 
      })
      .catch(() => { 
        setError('Failed to load photos.'); 
        setLoading(false); 
      });
  }, [selected, searchQuery, currentPage]);

  useEffect(() => { 
    fetchPhotos(); 
  }, [fetchPhotos]);

  const handleFilter = (key: string, value: string) => {
    setSelected(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const clearFilters = () => {
    setSelected({ source: '', commodity: '', unit: '' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.values(selected).some(Boolean) || searchQuery;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-[120px] pb-16">
        {/* Header */}
        <div className="text-brandPurple py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Photo Gallery
            </h1>
            <p className="mt-3 text-base leading-relaxed text-gray-600 max-w-3xl">
              Visual reference of local non-standard units used across Ghana
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-b border-slate-200 py-4 px-4">
          <div className="max-w-6xl mx-auto space-y-3">
            {/* Search bar */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Search by unit name or commodity..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-300 text-sm bg-white text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brandPurple"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-semibold text-slate-600 mr-1">Filter by:</span>

              {[
                { key: 'source', label: 'Source', options: filters.sources, labelMap: SOURCE_LABELS },
                { key: 'commodity', label: 'Commodity', options: filters.commodities, labelMap: null },
                { key: 'unit', label: 'Unit', options: filters.units, labelMap: null },
              ].map(({ key, label, options, labelMap }) => (
                <select
                  key={key}
                  value={selected[key as keyof typeof selected]}
                  onChange={e => handleFilter(key, e.target.value)}
                  className="px-3 py-2 rounded-lg border-2 border-slate-300 text-sm bg-white text-slate-700 cursor-pointer min-w-[160px] focus:outline-none focus:border-brandPurple"
                >
                  <option value="">All {label}s</option>
                  {(options || []).map(opt => (
                    <option key={opt} value={opt}>
                      {labelMap ? (labelMap[opt] || opt) : opt}
                    </option>
                  ))}
                </select>
              ))}

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-red-50 text-red-700 border-2 border-red-200 rounded-lg text-sm font-semibold transition hover:bg-red-100"
                >
                  ✕ Clear
                </button>
              )}

              <span className="ml-auto text-sm text-slate-500">
                {loading ? 'Loading…' : pagination ? `${pagination.total} photo${pagination.total !== 1 ? 's' : ''}` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-5 border border-red-200">
              {error}
            </div>
          )}

          {!loading && photos.length === 0 && !error && (
            <div className="text-center py-16 text-slate-400">
              <div className="text-5xl">📭</div>
              <div className="mt-3 text-base">No photos found for the selected filters.</div>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters} 
                  className="mt-3 text-brandPurple hover:underline text-sm font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {photos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white border-2 border-slate-300 text-sm font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
              >
                Prev
              </button>

              <div className="flex gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${
                      page === currentPage
                        ? 'bg-brandPurple text-white'
                        : 'bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                disabled={currentPage === pagination.totalPages}
                className="px-4 py-2 rounded-lg bg-white border-2 border-slate-300 text-sm font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}