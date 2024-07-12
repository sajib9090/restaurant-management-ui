import React from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <div className="contact-us py-16 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGZvb2R8ZW58MHx8MHx8fDA%3D')" }}>
      <div className="bg-black bg-opacity-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          <motion.form
            className="max-w-lg mx-auto bg-white bg-opacity-80 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <input type="text" placeholder="Name" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div className="mb-6">
              <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div className="mb-6">
              <textarea placeholder="Message" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" rows="4"></textarea>
            </div>
            <button type="submit" className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors duration-300">Send Message</button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
