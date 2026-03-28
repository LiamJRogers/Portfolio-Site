import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React from "react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="min-h-dvh flex flex-col bg-white w-full">
      <main className="flex-1 w-5/6 pt-20 pb-20 px-6 md:px-32 mx-auto">
        <div className="flex items-center mb-10">
          <button
            onClick={() => navigate("/")}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex items-center text-gray-700 hover:text-black text-xl font-semibold px-0 py-0 bg-transparent shadow-none transition-colors duration-150 ${
              hovered ? "cursor-pointer" : "cursor-auto"
            }`}
            style={{ fontFamily: "'Hind Vadodara', sans-serif" }}
            aria-label="Back to Home"
          >
            <svg
              className="mr-2"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </button>
        </div>
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-black mb-16 text-center w-full"
          style={{ fontFamily: "'Koulen', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.div
          className="text-xl md:text-2xl text-gray-700 leading-relaxed w-full"
          style={{ fontFamily: "'Hind Vadodara', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="mb-8">
            <strong>Last updated:</strong> 26 March 2026
          </p>
          <p className="mb-8">
            This website is a personal portfolio operated by Liam Jack Rogers.
            This policy explains how information may be processed when you visit
            this website and how cookies are used.
          </p>
          <h2
            className="text-3xl font-bold mt-20 mb-4"
            style={{ fontFamily: "'Koulen', sans-serif" }}
          >
            Information Collected
          </h2>
          <p className="mb-4">
            This website does not collect personal information such as names,
            email addresses, or contact details directly from visitors.
          </p>
          <p className="mb-8">
            However, limited technical information may be processed
            automatically when you access the site. This may include information
            such as your IP address, browser type, device type, and pages
            visited. This information is used solely for security, performance,
            and analytics purposes.
          </p>
          <h2
            className="text-3xl font-bold mt-20 mb-4"
            style={{ fontFamily: "'Koulen', sans-serif" }}
          >
            Analytics
          </h2>
          <p className="mb-4">
            This website uses Cloudflare Web Analytics, a privacy-focused
            analytics service provided by Cloudflare, Inc.
          </p>
          <p className="mb-4">
            Cloudflare Web Analytics collects aggregated and anonymised usage
            statistics such as page views, referring websites, and general
            location data. The service does not use cookies and does not track
            visitors across websites.
          </p>
          <p className="mb-8">
            Analytics data is used only to understand how the site is used and
            to improve its content and performance.
          </p>
          <h2
            className="text-3xl font-bold mt-20 mb-4"
            style={{ fontFamily: "'Koulen', sans-serif" }}
          >
            Hosting
          </h2>
          <p className="mb-8">
            This website is hosted using GitHub Pages, a service provided by
            GitHub, Inc. As part of delivering the website, GitHub may process
            technical data such as IP addresses in server logs for operational
            and security purposes.
          </p>
          <h2
            className="text-3xl font-bold mt-20 mb-4"
            style={{ fontFamily: "'Koulen', sans-serif" }}
          >
            Cookies
          </h2>
          <p className="mb-4">
            This website uses cookies and similar technologies from third-party
            services to provide features such as audio previews and analytics.
          </p>
          <ul className="mb-4 list-disc pl-8">
            <li className="mb-2">
              <strong>Non-essential cookies</strong> are only loaded after you
              give consent via the cookie banner.
            </li>
            <li>
              <strong>Essential cookies</strong> are strictly necessary for the
              site to function.
            </li>
          </ul>
          <p className="mb-8">
            If you decline non-essential cookies, some features, including audio
            previews, may not be available.
          </p>
          <h2
            className="text-3xl font-bold mt-20 mb-4"
            style={{ fontFamily: "'Koulen', sans-serif" }}
          >
            Third-Party Links
          </h2>
          <p className="mb-8">
            This website may contain links to external websites. Once you leave
            this site, I am not responsible for the privacy practices or content
            of those websites.
          </p>
          <h2
            className="text-3xl font-bold mt-20 mb-4"
            style={{ fontFamily: "'Koulen', sans-serif" }}
          >
            Legal Basis
          </h2>
          <p className="mb-8">
            Any processing of technical data is carried out in accordance with
            applicable data protection laws, including the UK General Data
            Protection Regulation (UK GDPR), for the legitimate purpose of
            operating and improving this website.
          </p>
          <p>
            Consent is obtained for non-essential cookies in compliance with
            PECR and UK GDPR.
          </p>
          <h2
            className="text-3xl font-bold mt-20 mb-4"
            style={{ fontFamily: "'Koulen', sans-serif" }}
          >
            Contact
          </h2>
          <p className="mb-8">
            If you have any questions about this privacy policy, you can contact
            me through the contact information provided on this website.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
