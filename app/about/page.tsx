'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {

  const steps = [
    {
      title: 'Select a Commodity',
      desc: 'Choose the agricultural commodity you are working with, such as Maize, Rice, Cassava, or Groundnut.',
    },
    {
      title: 'Choose the Source',
      desc: 'Indicate whether the measurement is from a Farm Gate, Household, or Market context, as conversion factors differ by source.',
    },
    {
      title: 'Select the Local Unit',
      desc: 'Pick the non-standard unit being used — for example, an Olonka, Basket, Rubber Bucket, or Tin.',
    },
    {
      title: 'View the Conversion Factor',
      desc: 'The system will display the standard conversion factor (in kilograms) for that unit, commodity, and source combination.',
    },
    {
      title: 'Use the Photo Gallery',
      desc: 'If you are unsure which unit you have, visit the Photo Gallery to visually identify local units by commodity and source.',
    },
  ];

  const contacts = [
    { label: 'Division',  value: 'Agriculture & Environment Statistics Division' },
    { label: 'Email',     value: 'agric@statsghana.gov.gh' },
    { label: 'Website',   value: 'www.statsghana.gov.gh' },
    { label: 'Phone',     value: '+233 (0)30 2671732' },
    { label: 'Address',   value: 'Ghana Statistical Service, P.O. Box GP 1098, Accra, Ghana' },
  ];
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pb-16 pt-[120px]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* What is NSUs-CF */}
          <div className="bg-white rounded-xl p-7 sm:p-8 mb-6 shadow-sm">
            <h2 className="text-xl font-bold text-brandPurple mt-0 mb-3.5 pb-2.5 border-b-2 border-blue-100">What is the NSUs-CF System?</h2>
            <p className="text-[#444] leading-[1.8] mt-0">
              The <strong>Non-Standard Units Conversion Factor (NSUs-CF)</strong> system is a
              data tool developed by the Ghana Statistical Service (GSS) to standardise the
              measurement of agricultural commodities across Ghana.
            </p>
            <p className="text-[#444] leading-[1.8]">
              Farmers, traders, and households in Ghana commonly measure commodities using
              local units such as <em>Olonkas</em>, <em>Rubber Buckets</em>, <em>Baskets</em>,
              and <em>Tins</em>. These units vary in size by region, commodity, and context —
              making it difficult to compare prices and quantities without a reference guide.
            </p>
            <p className="text-[#444] leading-[1.8] mb-0">
              The NSUs-CF system provides verified conversion factors (in kilograms) for each
              local unit, enabling enumerators, researchers, and policymakers to convert
              local measurements into standard weights reliably.
            </p>
          </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-white rounded-xl p-7 sm:p-8 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-brandPurple mt-0 mb-3.5 pb-2.5 border-b-2 border-blue-100">How to Use the System</h2>
          <div className="mt-1">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 mb-4.5 items-start">
                <div className="w-8 h-8 min-w-[32px] bg-brandPurple text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</div>
                <div>
                  <div className="font-semibold text-[#1a1a1a] mb-[3px]">{step.title}</div>
                  <div className="text-[#555] text-sm leading-[1.65]">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl p-7 sm:p-8 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-brandPurple mt-0 mb-3.5 pb-2.5 border-b-2 border-blue-100">Contact Us</h2>
          <p className="text-[#555] text-sm mt-0 mb-[18px]">
            For enquiries about the NSUs-CF system, data requests, or to report errors,
            please contact the Agriculture &amp; Environment Statistics Division:
          </p>
          <table className="w-full border-collapse">
            <tbody>
              {contacts.map(({ label, value }) => (
                <tr key={label} className="border-b border-[#f0f0f0]">
                  <td className="py-2.5 pr-4 pl-0 font-semibold text-[13px] text-[#333] whitespace-nowrap align-top">
                    {label}
                  </td>
                  <td className="py-2.5 text-[13px] text-[#555]">
                    {label === 'Email' ? (
                      <a href={`mailto:${value}`} className="text-[#1a5276] hover:underline">{value}</a>
                    ) : label === 'Website' ? (
                      <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="text-[#1a5276] hover:underline">{value}</a>
                    ) : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}