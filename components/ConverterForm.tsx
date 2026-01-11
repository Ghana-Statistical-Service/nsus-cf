"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";


type Option = { id: number; name: string };

export default function ConverterForm() {

  // States that hold dropdown options (lists)
  const [region, setRegion] = useState<Option[]>([]);
  const [source, setSource] = useState<Option[]>([]);
  const [groups, setGroups] = useState<Option[]>([]);
  const [commodities, setCommodities] = useState<Option[]>([]);
  const [units, setUnits] = useState<Option[]>([]);
  const [sizes, setSizes] = useState<Option[]>([]);
  

  // States that hold selected values (IDs) for dependent dropdowns
  const [regionId, setRegionId] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [commodityId, setCommodityId] = useState('');
  const [unitId, setUnitId] = useState('');
  const [sizeId, setSizeId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState<string | null>(null);
  const [standardUnit, setStandardUnit] = useState('');


  /* Load regions */
  useEffect(() => {
    fetch('/api/regions')
      .then(res => res.json())
      .then(data =>
        setRegion(data.map((r: any) => ({ id: Number(r.region_id), name: r.region })))
      );
  }, []);

  /* Load source */
  useEffect(() => {
    fetch('/api/sources')
      .then(res => res.json())
      .then(data =>
        setSource(data.map((s: any) => ({ id: s.source_id, name: s.source_desc })))
      );
  }, []);

  /* Load commodity groups based on selected source */
  useEffect(() => {
  if (!sourceId) return;

  setGroups([]);
  setGroupId('');
  setCommodities([]);
  setCommodityId('');
  setUnits([]);
  setUnitId('');
  setSizes([]);
  setSizeId('');

  fetch(`/api/commodity_groups?source_id=${sourceId}`)
    .then(res => res.json())
    .then(data =>
      setGroups(data.map((g: any) => ({id: g.group_id, name: g.group_desc})))
    );
  }, [sourceId]);


  //Load commodities based on selected source and group 
  useEffect(() => {
  if (!sourceId || !groupId) return;

  setCommodities([]);
  setCommodityId('');
  setUnits([]);
  setUnitId('');
  setSizes([]);
  setSizeId('');

  fetch(`/api/commodities?source_id=${sourceId}&group_id=${groupId}`)
    .then(res => res.json())
    .then(data =>
      setCommodities(data.map((c: any) => ({id: c.commodity_id, name: c.commodity_desc })))
    );
  }, [sourceId, groupId]);


  // Load local units based on selected source and commodity 
  useEffect(() => {
  if (!sourceId || !commodityId) return;

  setUnits([]);
  setUnitId('');
  setSizes([]);
  setSizeId('');

  fetch(`/api/local_units?source_id=${sourceId}&commodity_id=${commodityId}`)
    .then(res => res.json())
    .then(data =>
      setUnits(data.map((u: any) => ({id: u.lunit_id, name: u.lunit_desc})))
    );
  }, [sourceId, commodityId]);


  /* Load unit sizes based on selected source, commodity and local unit*/
  useEffect(() => {
  if (!sourceId || !commodityId || !unitId) return;

  setSizes([]);
  setSizeId('');

  fetch(`/api/local_unit_sizes?source_id=${sourceId}&commodity_id=${commodityId}&lunit_id=${unitId}`)
    .then(res => res.json())
    .then(data =>
      setSizes(
        data.map((s: any) => ({id: s.lunit_size_id, name: s.lunit_size_desc })))
    );
  }, [sourceId, commodityId, unitId]);


  function handleSourceChange(value: string) {
    setSourceId(value);
    setGroupId('');
    setGroups([]);
    setCommodityId('');
    setCommodities([]);
    setUnitId('');
    setUnits([]);
    setSizeId('');
    setSizes([]);
  }


  const isFormValid =
    regionId &&
    sourceId &&
    groupId &&
    commodityId &&
    unitId &&
    sizeId &&
    standardUnit &&
    quantity > 0;
  

  function resetResult() {
    setResult(null);
  }

  // image source URL
  /*
  const imageSrc =
  sizeId && commodityId && sourceId
    ? `/api/images?lunit_size_id=${sizeId}&commodity_id=${commodityId}&source_id=${sourceId}`
    : '/imagePlaceholder.png';
    */
  
  /* Image logic (memoized) 
  const imageSrc = useMemo(() => {
    if (!sizeId || !commodityId || !sourceId) {
      return "/imagePlaceholder.png";
    }
    return `/api/images?lunit_size_id=${sizeId}&commodity_id=${commodityId}&source_id=${sourceId}`;
  }, [sizeId, commodityId, sourceId]);
  */

  async function handleConvert() {
    
    try {
      // Call the conversion factors API with all selected filter IDs
      const res = await fetch(
        `/api/conversion_factors?region_id=${regionId}&source_id=${sourceId}&group_id=${groupId}&commodity_id=${commodityId}&lunit_id=${unitId}&lunit_size_id=${sizeId}`
      );

      // If the HTTP response itself failed (e.g. 404, 500)
      if (!res.ok) {
        setResult(
          "No conversion factor has been configured for the selected combination. Kindly contact the Agric & Environment Section at GSS for further assistance."
        );
        return;
      }

      // Parse the JSON response
      const data = await res.json();
      //console.log("Conversion data:", data);

      // Validate that expected data exists in the response
      if (!data.conversion_factor_kg) {
        setResult(
          "Conversion factor data is unavailable for the selected combination. Kindly contact the Agric & Environment Section at GSS for further assistance."
        );
        return;
      }

      // Ensure numeric values before calculation
      var factor = Number(data.conversion_factor_kg);
      const qty = Number(quantity);

      if (standardUnit === "g") {
        // Adjust factor for grams conversion
        factor *= 1000;
      }

      // Perform the conversion to the selected standard unit
      const value = qty * factor;

      // Display a formatted and user-friendly conversion result
      setResult(
        `${qty.toLocaleString()} ${data.local_unit} (${data.local_unit_size}) ≈ ${value.toFixed(
          3
        )} ${standardUnit}`
      );
    } catch (error) {
      // Catch network or unexpected runtime errors
      console.error("Conversion error:", error);
      setResult(
        "An unexpected error occurred while processing the conversion. Please try again or contact the Agric & Environment Section at GSS."
      );
    }

  }

  const selectBase =
    "w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brandTeal focus:outline-none focus:ring-2 focus:ring-brandTeal/40";

  return (
    <section
        id="convert"
        className="mx-auto mt-1 grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.1fr,0.9fr]"
    >
 {/* Right: image placeholder */}
<div className="mt-8 flex items-center justify-center">
  <div className="overflow-hidden rounded-[2rem] bg-slate-100 p-6 shadow-md">
    <div className="relative h-56 w-72">
      <img
        src={'/imagePlaceholder.png'}
        alt={`local unit`}
        //onError={(e) => {e.currentTarget.src = '/imagePlaceholder.png'; }}
        //fill        // <-- Image will fill this  h-56 w-72 box
        className="absolute inset-0 h-full w-full object-cover rounded-[1.5rem]"
      />
    </div>
  </div>
</div>  


      {/* Left: form */}
      <div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Region
            </label>

            <select className={selectBase} value={regionId} onChange={(e) => {setRegionId(e.target.value); resetResult();}}>
              <option value="">Select a region</option>
              {region.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Category
            </label>
            <select className={selectBase} value={sourceId} onChange={(e) => {setSourceId(e.target.value); resetResult();}} disabled={!regionId}>
              <option value="">Select a category</option>
              {source.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Food Groupings
            </label>
            <select className={selectBase} value={groupId} onChange={(e) => {setGroupId(e.target.value); resetResult();}} disabled={!sourceId}>
              <option value="">Select a food group</option>
              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Commodity
            </label>
            <select className={selectBase} value={commodityId} onChange={(e) => {setCommodityId(e.target.value); resetResult();}} disabled={!groupId}>
              <option value="">Select a commodity</option>
              {commodities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Local Unit
            </label>
            <select className={selectBase} value={unitId} onChange={(e) => {setUnitId(e.target.value); resetResult();}} disabled={!commodityId}>
              <option value="">Select Local Unit</option>
              {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Size of Local Unit
            </label>
            <select className={selectBase} value={sizeId} onChange={(e) => {setSizeId(e.target.value); resetResult();}} disabled={!unitId}> 
              <option value="">Select size of local unit</option>
              {sizes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Standardised Unit
            </label>
            <select
              className={selectBase}
              value={standardUnit}
              onChange={(e) => {setStandardUnit(e.target.value); resetResult();}}
            >
              <option value="">Select standard unit</option>
              <option value="kg">Kilograms</option>
              <option value="g">Grams</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Quantity (number of local units)
            </label>
            <input
              type="number"
              min={0}
              step={0.25}
              className={selectBase}
              value={quantity}
              onChange={(e) => {setQuantity(Number(e.target.value)); resetResult();}}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="button" 
            onClick={handleConvert}
            disabled={!isFormValid}
            className={`rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition
              ${isFormValid
                ? "bg-brandTeal hover:translate-y-0.5 hover:shadow-lg"
                : "bg-slate-300 cursor-not-allowed"}
            `}
          >
            Convert Unit →
          </button>

          {result && (
            <p className="text-3xl font-bold tracking-wide text-green-600 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            {result}
            </p>          )}
        </div>
      </div>

    </section>
  );
}