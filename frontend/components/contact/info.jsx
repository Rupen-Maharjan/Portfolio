import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiGlobe,
} from "react-icons/fi";

const iconMap = {
  email: FiMail,
  phone: FiPhone,
  location: FiMapPin,
  github: FiGithub,
  linkedin: FiLinkedin,
};

const ContactInfo = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    axios.get("/api/profile").then((res) => {
      setInfo(res.data || {});
    });
  }, []);

  return (
    <motion.section
      aria-labelledby="contact-info-heading"
      className="grid md:grid-cols-2 gap-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-4">
        <h2 id="contact-info-heading" className="text-lg font-semibold">
          Contact Information
        </h2>
        {["email", "phone", "location"].map((field) => {
          const Icon = iconMap[field] || FiGlobe;
          return (
            info[field] && (
              <div key={field} className="flex items-center gap-2 text-gray-300">
                <Icon className="text-blue-400" />
                <span>{info[field]}</span>
              </div>
            )
          );
        })}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Connect With Me</h2>
        {["linkedin", "github"].map((field) => {
          const Icon = iconMap[field] || FiGlobe;
          return (
            info[field] && (
              <div key={field} className="flex items-center gap-2 text-gray-300">
                <Icon className="text-blue-400" />
                <span>{info[field]}</span>
              </div>
            )
          );
        })}
      </div>
    </motion.section>
  );
};

export default ContactInfo;
