'use client';

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PAGE_TITLE = "Ghana Non-Standard Units Conversion Factors System";
const BREADCRUMB = ["About", "NSUs Conversion Factors"];

  const steps = [
    {
      title: 'Select a Region and Category',
      desc: 'Select the region, then choose the category (e.g. Household or Market).',
    },
    {
      title: 'Choose the Food Group and Commodity',
      desc: 'Select the food group, then choose the commodity (e.g. Cereals and flours, Vegetables).',
    },
    {
      title: 'Select the Local Unit',
      desc: 'Select the local unit (e.g. Olonka, Tomato Paste Tin).',
    },
    {
      title: 'Select the Local Unit Size',
      desc: 'Choose the size of the local unit (Small, Medium, or Large).',
    },
    {
      title: 'Choose the Preferred Standard Unit',
      desc: 'Select the preferred standard unit for conversion.',
    },
    {
      title: 'Enter the Quantity',
      desc: 'Enter the number of units or quantity of the local unit to be converted (e.g. 1 Olonka).',
    },
    {
      title: 'View the Conversion Factor',
      desc: 'Click Convert Unit and wait for the results to be displayed.',
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

export default function AboutPage() {
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pb-16 pt-[120px]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* What is NSUs-CF */}
          <div className="bg-white rounded-xl p-7 sm:p-8 mb-6 shadow-sm">
            {/* Breadcrumb */}
            {/* <nav className="text-sm mb-4 text-gray-600">
              {BREADCRUMB.map((crumb, index) => (
                <span key={index}>
                  {index > 0 && <span className="mx-2">/</span>}
                  <span className={index === BREADCRUMB.length - 1 ? "font-semibold text-gray-900" : ""}>
                    {crumb}
                  </span>
                </span>
              ))}
            </nav> */}

            <h2 className="text-xl font-bold text-brandPurple mt-0 mb-3.5 pb-2.5 border-b-2 border-blue-100">{PAGE_TITLE}</h2>
            {/* <p className="text-[#444] leading-[1.8] mt-0">
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
            </p> */}

            {/* Title */}
          {/* <h1 className="text-[2.2em] sm:text-[1.8em] font-bold text-[#1a472a] mb-8 pb-4 border-b-[3px] border-[#ce1126] leading-[1.3]">
            Ghana Non-Standard Units Conversion Factors System
          </h1> */}

          {/* Section */}
          <div className="mb-8">
            <h4 className="text-[1.6em] sm:text-[1.4em] font-semibold text-brandPurple mt-10 mb-5">
              1.0 Overview
            </h4>

            <p className="mb-4 text-justify">
              The Ghana Non-Standard Units Conversion Factors (NSUs-CF) system is a web-based platform that provides standardised and verified average conversion factors for a wide range of Non-Standard Units (NSUs), commonly referred to as local units of measurement, used in Ghana at the household, market, and farmgate levels. These local units include olonka (American tin), tomato paste tins, koko bowls, blue rubber buckets, sacks, and similar containers.
            </p>

            <p className="mb-4 text-justify">
              The system enables the conversion of quantities reported in these local units into accurate and reliable standard units, primarily kilograms (kg), at both the national and the 16 regions. In addition, the NSUs-CF system provides average weights (kg) for major food groups and commodities. The lists are not exhaustive and are meant as a general guide. These are aligned with internationally recognised classifications, including the <strong>Central Product Classification (CPC Ver. 2.1)</strong> with the FAO expansion for agricultural statistics. This ensures that quantities reported using local measurement practices can be translated into accurate, comparable, and internationally consistent statistical measures, thereby supporting analysis of household consumption, agriculture output analysis at the market and farmgate reporting, and policy formulation.
            </p>

            <p className="mb-4 text-justify">
              While the system covers only the commonly used NSUs captured in the survey, there may be a few additional NSUs used by traders in some parts of the country that are not included.
            </p>
          </div>

          {/* Section */}
          <div className="mb-8">
            <h4 className="text-[1.6em] sm:text-[1.4em] font-semibold text-brandPurple mt-10 mb-5">
              2.0 Purpose / Why Use the NSUs-CF System
            </h4>

            <p className="mb-4">The NSUs-CF system:</p>

            <ol className="list-[lower-roman] ml-6 mb-5 space-y-2">
              <li>Promotes consistency, accuracy, and reliability in analysing the standard of living and poverty patterns, among others, in monetary units to inform evidence-based policies.</li>
              <li>Supports traders (retailers, wholesalers, and agribusiness investors) in budget planning and applying harmonized standard weights for agricultural produce and commodities.</li>
              <li>Provides a scientific means of ensuring that quantities of produce sold in different units are transformed into a common unit. </li>
              <li>Helps field officers, statisticians, researchers, analysts, and policymakers to make informed decisions about using standard units of measurement.</li>
            </ol>

            <h5 className="text-[1.3em] sm:text-[1.2em] font-semibold text-brandPurple mt-8 mb-4">
              2.1 Key benefits include:
            </h5>

            <ol className="list-[lower-roman] ml-6 mb-5 space-y-2">
              <li>Reducing measurement bias arising from the use of diverse local units;</li>
              <li>Improving the quality of data used for agricultural production estimates, market analysis, policy formulation, and monitoring and evaluation;</li>
              <li>Strengthening evidence-based decision-making by ensuring that data derived from local measurement practices are standardised and comparable;</li>
              <li>Improving user accessibility and usability;</li>
              <li>Reducing errors and preventing wrong combinations of NSUs; and</li>
              <li>vi.	Saving time and reducing manual calculations and lookup errors.</li>
            </ol>
          </div>

          {/* Section */}
          <div className="mb-8">
            <h2 className="text-[1.6em] sm:text-[1.4em] font-semibold text-brandPurple mt-10 mb-5">
              3.0 Guidance for Use
            </h2>

            <p className="mb-4 text-justify">
              Conversion factors for local units should be applied with caution. Unit sizes and container volumes may vary by region, filling practices, commodity type, and moisture content (e.g., maize or groundnut), all of which can significantly influence actual weights.
            </p>

            <p className="mb-4">Additional considerations include:</p>

            <ul className="list-disc ml-6 mb-5 space-y-2">
              <li>Conversion factors represent national and regional averages derived from estimations across households, markets, and farmgate transactions, and may not fully reflect local or transaction-specific conditions.</li>
              <li>Conversion factors exclude add-ons (locally referred to as ntosoɔ) and common market practices such as heaping containers.</li>
              <li>Tempered, adjusted, or modified containers used in certain transactions were excluded.</li>
            </ul>

            <h5 className="text-[1.3em] sm:text-[1.2em] font-semibold text-brandPurple mt-8 mb-4">
              3.1 Photo Library
            </h5>

            <p className="mb-4">
              For clarity and visual reference, users are encouraged to consult the Ghana NSUS Photo Library to guide the collection of consumption and agricultural production quantities at:
              <br /><br />
              <Link
                href="https://nsuscf.statsghana.gov.gh/gallery"
                className="text-blue-600 font-medium hover:underline"
              >
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Visit Photo Library
                </button>
              </Link>
            </p>
          </div>

          {/* Section */}
          <div className="mb-8">
            <h4 className="text-[1.6em] sm:text-[1.4em] font-semibold text-brandPurple mt-10 mb-5">
              4.0 About the Ghana NSUs Web System
            </h4>

            <p className="mb-4 text-justify">
              The web-based system provides standardised conversion factors for Non-Standard Units (NSUs) used in selected agricultural commodities and other food products at the market and farmgate levels, and for consumption at the household level. Access the system using any web browser (Firefox, Google Chrome, Internet Explorer, or Microsoft Edge) on a computer or mobile device.
            </p>

          </div>
            
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-white rounded-xl p-7 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-brandPurple mt-0 mb-3.5 pb-2.5 border-b-2 border-blue-100">How to Use the Conversion Tool</h2>
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