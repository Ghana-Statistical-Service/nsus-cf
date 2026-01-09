/*
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          
          <div className="flex items-center gap-3">

              <Image 
                src="/logo.png" 
                alt="Ghana flag" 
                width={60} height={60} 
                className="h-12 w-12 rounded-full" />
           
            <div className="flex flex-col leading-[0.6rem]">
                <span className="text-[8px] font-semibold tracking-wide text-slate-700">
                    GHANA
                </span>
                <span className="text-[8px] font-semibold tracking-wide text-slate-700">
                    STATISTICAL
                </span>
                <span className="text-[8px] font-semibold tracking-wide text-slate-700">
                    SERVICE
                </span>
            </div>
          </div>
              <Image 
                src="/ghanaflag.png"
                alt="Ghana flag"
                width={55}
                height={32}
                className="rounded-full w-15 h-auto"
              />
        </div>
      </div>

  
      <div className="bg-brandPurple text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-4xl font-semibold tracking-wide">NSUs-CF</span>

          <nav className="flex items-center gap-8 text-sm font-medium">
            <a href="#matrix" className="hover:text-brandTeal">
              Conversion Matrix
            </a>
            <a href="#convert" className="hover:text-brandTeal">
              Convert
            </a>
            <a href="#about" className="hover:text-brandTeal">
              About
            </a>
            <a href="#help" className="hover:text-brandTeal">
              Help?
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
*/

"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="GSS Logo"
              width={60}
              height={60}
              className="h-12 w-12 rounded-full"
            />

            <div className="flex flex-col leading-[0.6rem]">
              <span className="text-[8px] font-semibold tracking-wide text-slate-700">
                GHANA
              </span>
              <span className="text-[8px] font-semibold tracking-wide text-slate-700">
                STATISTICAL
              </span>
              <span className="text-[8px] font-semibold tracking-wide text-slate-700">
                SERVICE
              </span>
            </div>
          </div>

          <Image
            src="/ghanaflag.png"
            alt="Ghana flag"
            width={55}
            height={32}
            className="h-auto w-auto rounded-full"
          />
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-brandPurple text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-2xl font-semibold tracking-wide">NSUs-CF</span>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#conversiontable" className="hover:text-brandTeal">
              Conversion Table
            </a>
            <a href="#convert" className="hover:text-brandTeal">
              Convert
            </a>
            <a href="#about" className="hover:text-brandTeal">
              About
            </a>
            <a href="#help" className="hover:text-brandTeal">
              Help?
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-6 bg-white" />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="md:hidden bg-brandPurple border-t border-white/20">
            <nav className="flex flex-col px-4 py-3 text-sm font-medium">
              <a
                href="#matrix"
                className="py-2 hover:text-brandTeal"
                onClick={() => setOpen(false)}
              >
                Conversion Table
              </a>
              <a
                href="#convert"
                className="py-2 hover:text-brandTeal"
                onClick={() => setOpen(false)}
              >
                Convert
              </a>
              <a
                href="#about"
                className="py-2 hover:text-brandTeal"
                onClick={() => setOpen(false)}
              >
                About
              </a>
              <a
                href="#help"
                className="py-2 hover:text-brandTeal"
                onClick={() => setOpen(false)}
              >
                Help?
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}