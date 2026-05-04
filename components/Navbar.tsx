"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full shadow-md">
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
            <Link href="/#convert" className="hover:text-brandTeal">
              Convert
            </Link>
            <Link href="/#about" className="hover:text-brandTeal">
              About
            </Link>
            <Link href="/#gallery" className="hover:text-brandTeal">
              Photo Library
            </Link>
            <Link href="/#help" className="hover:text-brandTeal">
              Help?
            </Link>
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
              <Link
                href="/#matrix"
                className="py-2 hover:text-brandTeal"
                onClick={() => setOpen(false)}
              >
                Conversion Table
              </Link>
              <Link
                href="/#convert"
                className="py-2 hover:text-brandTeal"
                onClick={() => setOpen(false)}
              >
                Convert
              </Link>
              <Link
                href="/#about"
                className="py-2 hover:text-brandTeal"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#help"
                className="py-2 hover:text-brandTeal"
                onClick={() => setOpen(false)}
              >
                Help?
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}