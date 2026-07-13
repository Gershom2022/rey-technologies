import { useState } from "react";
import { isValidEmail } from "../utils/validation";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    else if (formData.name.trim().length < 4) errors.name = 'Name must be at least 4 characters';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!isValidEmail(formData.email)) errors.email = 'Please enter a valid email address';
    if (!formData.message.trim()) errors.message = 'Message is required';
    else if (formData.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
    else if (formData.message.trim().length > 500) errors.message = 'Message must not exceed 500 characters';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');

    try {
      const response = await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="py-16 px-8 bg-light">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-dark">Get in Touch</h1>
        <p className="text-gray-600 mb-12">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md border-2 border-primary border-opacity-20">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'submitting'}
              className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-all ${
                errors.name 
                  ? 'border-red-500 focus:border-red-600' 
                  : 'border-primary focus:border-secondary focus:ring-2 focus:ring-primary focus:ring-opacity-20'
              } disabled:opacity-50 disabled:bg-gray-100`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'submitting'}
              className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-all ${
                errors.email 
                  ? 'border-red-500 focus:border-red-600' 
                  : 'border-primary focus:border-secondary focus:ring-2 focus:ring-primary focus:ring-opacity-20'
              } disabled:opacity-50 disabled:bg-gray-100`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'submitting'}
              rows="6"
              className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-all resize-none ${
                errors.message 
                  ? 'border-red-500 focus:border-red-600' 
                  : 'border-primary focus:border-secondary focus:ring-2 focus:ring-primary focus:ring-opacity-20'
              } disabled:opacity-50 disabled:bg-gray-100`}
              placeholder="Your message here..."
            />
            <div className="flex justify-between mt-2">
              <p className="text-red-500 text-sm">{errors.message || ''}</p>
              <p className="text-gray-500 text-sm">{formData.message.length}/500</p>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <p className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
              ✓ Thanks for reaching out! We'll get back to you soon.
            </p>
          )}

          {status === 'error' && (
            <p className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
              ✗ Something went wrong. Please try again.
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold text-lg hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;