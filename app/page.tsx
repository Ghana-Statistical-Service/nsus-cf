import Navbar from "@/components/Navbar";
import ConverterForm from "@/components/ConverterForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-20 pb-16">
          <div className="text-center">
            
            {/* Main heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              <span className="block">Ghana Non-Standard Units</span>
              <span className="mt-2 block text-brandPurple">
                Conversion Factor
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 mx-auto max-w-3xl text-base leading-relaxed text-slate-600">
              The NSUs-CF system helps you convert Ghana&apos;s local measurement units
              into trusted standard units with ease. It provides verified,
              region-specific factors to support traders, field officers, analysts and
              institutions in ensuring accuracy and consistency.
            </p>

            {/* CTA button */}
            <button className="mt-10 inline-flex items-center rounded-full bg-brandPurple px-10 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-brandTeal">
              Getting Started
              <span className="ml-2 text-lg">→</span>
            </button>
          </div>
        </section>


        {/* Converter */}
        <ConverterForm />

        {/* Why Use section */}
        <section
          id="matrix"
          className="mt-20 bg-brandPurple py-16 text-white"
        >
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why Use NSUs-CF System
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/90">
              The web-based conversion factor system provides standardized,
              verified conversion ratios for various non-standard measurement
              units. Whether you are working with Olonka, blue rubber bucket or
              any other local unit, NSUs-CF helps you translate them reliably
              into standard units such as kilograms.
            </p>

            <button
              id="about"
              className="mt-10 rounded-full bg-brandPink px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-white hover:text-brandPurple"
            >
              Read More →
            </button>
          </div>
        </section>

        {/* Help section */}
        <section
          id="help"
          className="mx-auto mt-8 max-w-4xl px-4 text-center text-sm text-slate-700"
        >
          <h3 className="text-lg font-semibold">Need help?</h3>
          <p className="mt-3">
            For questions on non-standard units, new commodities or regional
            updates, Please contact Ghana Statistical Service-Agric & Environment Section.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
