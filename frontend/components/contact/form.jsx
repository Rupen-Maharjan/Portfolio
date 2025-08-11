import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const ContactForm = () => (
  <motion.section
    aria-labelledby="contact-form-heading"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="bg-[#101c35] rounded-lg p-8 shadow-md space-y-6">
      <h2
        id="contact-form-heading"
        className="text-xl font-semibold flex items-center gap-2"
      >
        <FiSend className="text-blue-400" />
        Send Message
      </h2>

      <form className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-2 bg-[#172136] text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 bg-[#172136] text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1">Subject</label>
          <input
            id="subject"
            type="text"
            placeholder="Project discussion"
            className="w-full px-4 py-2 bg-[#172136] text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea
            id="message"
            placeholder="Tell me about your project..."
            className="w-full px-4 py-2 h-32 bg-[#172136] text-white rounded-md resize-none outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-all duration-300"
        >
          <FiSend />
          Send Message
        </button>
      </form>
    </div>
  </motion.section>
);

export default ContactForm;