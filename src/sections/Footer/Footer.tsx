import VinylPlayer from "../../components/VinylPlayer";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import React from "react";
import { socials } from "../../data/socials";
import { motion } from "motion/react";

const Footer = ({
  setCursorActive,
  setInvert,
}: {
  setCursorActive: (active: boolean) => void;
  setInvert: (invert: boolean) => void;
}) => {
  const [emailHovered, setEmailHovered] = React.useState(false);

  return (
    <div className="min-h-screen w-full flex items-center">
      <section
        id="footer"
        className="relative w-full h-full border-28 border-white bg-white flex flex-col md:flex-row items-center"
        onMouseEnter={() => setCursorActive(true)}
        onMouseLeave={() => setCursorActive(false)}
        style={{ minHeight: "100vh" }}
      >
        <motion.div
          className="flex-2 flex flex-col items-start px-6 md:pl-32 md:pr-0 mb-12 md:mb-0 w-full pt-12 md:pt-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6"
            style={{ fontFamily: "'Koulen', cursive" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Get in touch
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8 pl-1"
            style={{ fontFamily: "'Hind Vadodara', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Feel free to reach out — I’m always happy to chat about code,
            projects, or ideas.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-16 w-full pl-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ul className="space-y-2">
              {socials.map((social, i) => (
                <motion.li
                  key={social.name}
                  className="flex items-center"
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
            </ul>
            <motion.div
              className="flex"
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
        </motion.div>
        <motion.div
          className="flex-3 flex flex-col items-center justify-center px-6 md:pr-12 w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span
            className="mb-6 text-xl font-semibold text-gray-800"
            style={{ fontFamily: "'Nothing You Could Do', cursive" }}
          >
            Currently on repeat:
          </span>
          <VinylPlayer setInvert={setInvert} />
        </motion.div>
        <motion.div
          className="w-full mt-8 pb-6 md:pb-0 text-center text-xs text-gray-500 md:absolute md:left-4 md:bottom-4 md:w-auto md:mt-0 md:text-left"
          style={{ fontFamily: "'Nothing You Could Do', cursive" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          © {new Date().getFullYear()} Liam Jack Rogers.
          <br className="md:hidden" /> All rights reserved.
        </motion.div>
      </section>
    </div>
  );
};

export default Footer;
