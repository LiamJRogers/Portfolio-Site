import React, { lazy, Suspense } from "react";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import { socials } from "../../data/socials";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VinylPlayer = lazy(() => import("../../components/VinylPlayer"));

const Footer = ({
  setCursorActive,
  setInvert,
}: {
  setCursorActive: (active: boolean) => void;
  setInvert: (invert: boolean) => void;
}) => {
  const [emailHovered, setEmailHovered] = React.useState(false);

  return (
    <section
      id="footer"
      className="w-full min-h-screen flex items-center justify-center bg-white border-t border-gray-200 relative"
      onMouseEnter={() => setCursorActive(true)}
      onMouseLeave={() => setCursorActive(false)}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-6xl gap-12 pl-4 sm:pl-16">
        <motion.div
          className="flex flex-col items-start justify-center w-full sm:w-1/2 flex-1"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 pt-8 sm:pt-0"
            style={{ fontFamily: "'Koulen', cursive" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Get in touch
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-md"
            style={{ fontFamily: "'Hind Vadodara', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Feel free to reach out — I’m always happy to chat about code,
            projects, or ideas.
          </motion.p>
          <motion.ul
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {socials.map((social, i) => (
              <motion.li
                key={social.name}
                className="mb-2 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="mr-2 text-lg text-gray-600">—</span>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-flip text-gray-600 text-xl flex items-center h-full transition hover:text-gray-700"
                  style={{ fontFamily: "'Hind Vadodara', sans-serif" }}
                >
                  <span>{social.name}</span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <a
              href="mailto:liam@example.com"
              className={`quick-flip bg-black text-white rounded-full px-4 py-2 text-lg transition flex items-center ${emailHovered ? "quick-flip-hover" : ""}`}
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
              style={{ fontFamily: "'Hind Vadodara', sans-serif" }}
            >
              <span>Drop me an email</span>
            </a>
            <span
              className={`quick-flip flex items-center justify-center py-2 px-3 rounded-full bg-black text-white cursor-pointer shadow transition ${emailHovered ? "quick-flip-hover" : ""}`}
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
            >
              <span className="mb-1">
                <ArrowOutward fontSize="small" />
              </span>
            </span>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center w-full sm:w-1/2 flex-1 mt-12 sm:mt-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span
            className="mb-4 text-xl font-semibold text-gray-800"
            style={{ fontFamily: "'Nothing You Could Do', cursive" }}
          >
            Currently on repeat:
          </span>
          <Suspense fallback={<div style={{ height: 300 }} />}>
            <VinylPlayer setInvert={setInvert} />
          </Suspense>
          <Link
            to="/PrivacyPolicy"
            className="block sm:hidden mt-8 mb-2 text-xs text-gray-500 underline"
            style={{ fontFamily: "'Nothing You Could Do', cursive" }}
          >
            Privacy Policy
          </Link>
          <span
            className="block sm:hidden mb-6 text-xs text-gray-500"
            style={{ fontFamily: "'Nothing You Could Do', cursive" }}
          >
            © {new Date().getFullYear()} Liam Jack Rogers. All rights reserved.
          </span>
        </motion.div>
      </div>
      <motion.div
        className="hidden sm:block absolute left-6 bottom-6 text-xs text-gray-500"
        style={{
          fontFamily: "'Nothing You Could Do', cursive",
          paddingLeft: "0.5rem",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        © {new Date().getFullYear()} Liam Jack Rogers. All rights reserved.
      </motion.div>
      <motion.div
        className="hidden sm:block absolute right-6 bottom-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Link
          to="/PrivacyPolicy"
          className="text-xs text-gray-500 underline"
          style={{
            fontFamily: "'Nothing You Could Do', cursive",
            paddingRight: "0.5rem",
          }}
        >
          Privacy Policy
        </Link>
      </motion.div>
    </section>
  );
};

export default Footer;
