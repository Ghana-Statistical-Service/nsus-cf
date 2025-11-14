"use client";
import { useState } from "react";
import Image from "next/image";


type Region = "Greater Accra" | "Ashanti" | "Northern" | "Western" 
            | "Western North" | "Eastern" | "Central" | "Volta" | "Oti" | "Upper East" 
            | "Upper West" | "North East" | "Savannah" | "Bono" 
            | "Bono East" | "Ahafo";
type Category = "Market" | "Household";
type FoodGroup = "Cereals" | "Legumes" | "Roots & Tubers";
type Commodity = "Maize" | "Rice" | "Sorghum";
type LocalUnit = "Olonka" | "Rubber Bucket" | "Tin";
type StandardUnit = "KG" | "Grams";


interface ConversionKey {
  region: Region;
  category: Category;
  foodGroup: FoodGroup;
  commodity: Commodity;
  localUnit: LocalUnit;
  size: "Small" | "Medium" | "Large";
  standardUnit: StandardUnit;
}


/** Dummy conversion table – configure real data later */
const CONVERSIONS: Array<ConversionKey & { factor: number }> = [
  {
    region: "Greater Accra",
    category: "Market",
    foodGroup: "Cereals",
    commodity: "Maize",
    localUnit: "Olonka",
    size: "Medium",
    standardUnit: "KG",
    factor: 1.2,
  },
];



const LOCALUNIT_IMAGES: Record<LocalUnit, string> = {
  Olonka: "/olonka.jpeg",
  "Rubber Bucket": "/rubber-bucket.avif", // change to your real file paths
  Tin: "/tin.png",
};


export default function ConverterForm() {
  const [region, setRegion] = useState<Region | "">("");
  const [category, setCategory] = useState<Category | "">("");
  const [foodGroup, setFoodGroup] = useState<FoodGroup | "">("");
  const [commodity, setCommodity] = useState<Commodity | "">("");
  const [size, setSize] = useState<"Small" | "Medium" | "Large" | "">("");
  const [localUnit, setLocalUnit] = useState<LocalUnit>("Olonka");
  const [standardUnit, setStandardUnit] = useState<StandardUnit | "">("");
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState<string | null>(null);
  const imageSrc = LOCALUNIT_IMAGES[localUnit] ?? "/nsus.png";

  function handleConvert() {
    const match = CONVERSIONS.find(
      (c) =>
        c.region === region &&
        c.category === category &&
        c.foodGroup === foodGroup &&
        c.commodity === commodity &&
        c.localUnit === localUnit &&
        c.size === size &&
        c.standardUnit === standardUnit
    );

    if (!match) {
      setResult(
        "No conversion factor configured yet for this combination. Please contact GSS-Agric & Environment Section."
      );
      return;
    }

    const value = quantity * match.factor;
    setResult(
      `${quantity.toLocaleString()} ${localUnit} (${size}) ≈ ${value.toFixed(
        3
      )} ${standardUnit}`
    );
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
      <Image
        src={imageSrc}
        alt={`${localUnit} in local unit`}
        fill        // <-- Image will fill this  h-56 w-72 box
        className="rounded-[1.5rem] object-cover"
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
            
            <select
              className={selectBase}
              value={region}
              onChange={(e) => setRegion(e.target.value as Region)}
            >
            <option value="">Select a region</option>
              <option>Greater Accra</option>
              <option>Ashanti</option>
              <option>Northern</option>
              <option>Western</option>
              <option>Western North</option>
                <option>Eastern</option>
                <option>Central</option>
                <option>Volta</option>
                <option>Oti</option>
                <option>Upper East</option>
                <option>Upper West</option>
                <option>North East</option>
                <option>Savannah</option>
                <option>Bono</option>
                <option>Bono East</option>
                <option>Ahafo</option> 
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Category
            </label>
            <select
              className={selectBase}
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
            <option value="">Select a category</option>
              <option>Market</option>
              <option>Household</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Food Groupings
            </label>
            <select
              className={selectBase}
              value={foodGroup}
              onChange={(e) => setFoodGroup(e.target.value as FoodGroup)}
            >
                <option value="">Select a food group</option>
              <option>Cereals</option>
              <option>Legumes</option>
              <option>Roots &amp; Tubers</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Commodity
            </label>
            <select
              className={selectBase}
              value={commodity}
              onChange={(e) => setCommodity(e.target.value as Commodity)}
            >
                <option value="">Select a commodity</option>
              <option>Maize</option>
              <option>Rice</option>
              <option>Sorghum</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Size of Local Unit
            </label>
            <select
              className={selectBase}
              value={size}
              onChange={(e) =>
                setSize(e.target.value as "Small" | "Medium" | "Large")
              }
            >
                <option value="">Select size</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Local Unit
            </label>
            <select
              className={selectBase}
              value={localUnit}
              onChange={(e) => setLocalUnit(e.target.value as LocalUnit)}
            >
              <option>Olonka</option>
              <option>Rubber Bucket</option>
              <option>Tin</option>
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
              onChange={(e) => setStandardUnit(e.target.value as StandardUnit)}
            >
                <option value="">Select standard unit</option>
              <option>KG</option>
              <option>Grams</option>
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
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleConvert}
            className="rounded-full bg-brandTeal px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:translate-y-0.5 hover:shadow-lg"
          >
            Convert Unit →
          </button>

          {result && (
            <p className="text-3xl font-bold tracking-wide text-green-600">
            {result}
            </p>          )}
        </div>
      </div>


    </section>
  );
}
