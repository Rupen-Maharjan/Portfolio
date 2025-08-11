import { motion } from 'framer-motion';

const ContactHeader = () => (
  <motion.header 
    className="text-center"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="text-4xl mb-2" aria-hidden="true">📧</div>
    <h1 className="text-3xl font-bold">Let's Work Together</h1>
    <p className="mt-2 text-gray-400">
      Have a project in mind? I'd love to hear about it. Let's discuss how we can
      bring your ideas to life.
    </p>
  </motion.header>
);

export default ContactHeader;