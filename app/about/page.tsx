'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {

  const sectionStyle = {
    background: '#fff',
    borderRadius: 14,
    padding: '28px 32px',
    marginBottom: 24,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  };

  const headingStyle = {
    fontSize: 20,
    fontWeight: 700,
    color: '#1a5276',
    marginTop: 0,
    marginBottom: 14,
    paddingBottom: 10,
    borderBottom: '2px solid #e8f0fe',
  };

  const stepStyle = {
    display: 'flex',
    gap: 16,
    marginBottom: 18,
    alignItems: 'flex-start',
  };

  const stepNumStyle = {
    width: 32, height: 32, minWidth: 32,
    background: '#1a5276', color: '#fff',
    borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: 14,
  };

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
          <div style={sectionStyle}>
            <h2 style={headingStyle}>What is the NSUs-CF System?</h2>
            <p>
              The <strong>Non-Standard Units Conversion Factor (NSUs-CF)</strong> system is a
              data tool developed by the Ghana Statistical Service (GSS) to standardise the
              measurement of agricultural commodities across Ghana.
            </p>
            <p>
              Farmers, traders, and households in Ghana commonly measure commodities using
              local units such as <em>Olonkas</em>, <em>Rubber Buckets</em>, <em>Baskets</em>,
              and <em>Tins</em>. These units vary in size by region, commodity, and context —
              making it difficult to compare prices and quantities without a reference guide.
            </p>
            <p>
              The NSUs-CF system provides verified conversion factors (in kilograms) for each
              local unit, enabling enumerators, researchers, and policymakers to convert
              local measurements into standard weights reliably.
            </p>
          </div>

          {/* How to Use */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>How to Use the System</h2>
          <div style={{ marginTop: 4 }}>
            {steps.map((step, i) => (
              <div key={i} style={stepStyle}>
                <div style={stepNumStyle}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: 3 }}>{step.title}</div>
                  <div style={{ color: '#555', fontSize: 14, lineHeight: 1.65 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Contact Us</h2>
          <p style={{ color: '#555', fontSize: 14, marginTop: 0, marginBottom: 18 }}>
            For enquiries about the NSUs-CF system, data requests, or to report errors,
            please contact the Agriculture &amp; Environment Statistics Division:
          </p>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              {contacts.map(({ label, value }) => (
                <tr key={label} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 16px 10px 0', fontWeight: 600, fontSize: 13, color: '#333', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                    {label}
                  </td>
                  <td style={{ padding: '10px 0', fontSize: 13, color: '#555' }}>
                    {label === 'Email' ? (
                      <a href={`mailto:${value}`} style={{ color: '#1a5276' }}>{value}</a>
                    ) : label === 'Website' ? (
                      <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" style={{ color: '#1a5276' }}>{value}</a>
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