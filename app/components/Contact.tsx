'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState('');
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Use no-cors mode to avoid CORS issues with Google Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbzfc4S9RwuxZr4uaXxgN_-Ar3-xB54GxMCVlpUpkp0ajZ1PEkiaO92zEqlat1d1Swyo/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      // With no-cors, we can't read the response, so assume success
      setFormStatus('Message sent successfully!');
      form.reset();
      setTimeout(() => setFormStatus(''), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('Failed to send message. Please try email directly.');
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen py-32 relative overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
      />

      <div className="container mx-auto px-8 lg:px-16 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-xl">
            Just a call, mail, or text away!
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: '📍', title: 'Location', value: 'Indore, Madhya Pradesh' },
            { icon: '📱', title: 'Phone', value: '+91 9826869555' },
            { icon: '✉️', title: 'Email', value: 'gulanijayesh55@gmail.com' },
            { icon: '🌐', title: 'Website', value: 'jayeshgulani.site' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">{item.title}</h3>
              <p className="text-white text-sm">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8">Find Me Online</h3>
            <div className="space-y-6">
              {[
                { name: 'GitHub', url: 'https://github.com/jayesh55555', icon: '💻' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jayesh-gulani-ba8899250/', icon: '💼' },
                { name: 'Instagram', url: 'https://www.instagram.com/jayesh_gulani/', icon: '📸' },
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, scale: 1.05 }}
                  className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-primary/50 transition-all group"
                >
                  <span className="text-3xl">{social.icon}</span>
                  <span className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} name="submit-to-google-sheet" className="space-y-6">
              <div>
                <input
                  type="text"
                  name="Name"
                  placeholder="Your Name"
                  required
                  className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="Email"
                  placeholder="Your Email"
                  required
                  className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  name="Message"
                  placeholder="Your Message"
                  rows={6}
                  required
                  className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                Send Message
              </motion.button>
              {formStatus && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-500 font-semibold"
                >
                  {formStatus}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-32 py-8 text-center text-gray-500 border-t border-gray-800"
      >
        <p>© 2024 Jayesh Gulani. All rights reserved.</p>
      </motion.div>
    </section>
  );
}
