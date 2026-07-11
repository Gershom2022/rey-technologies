import { useState } from "react";
import { isValidEmail } from "../utils/validation";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 4) {
      errors.name = 'Name must be at least 4 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 500) {
      errors.message = 'Message must not exceed 500 characters';
    }

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
      // Clear success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
      // Clear error message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="py-16 px-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
      <p className="text-gray-600 mb-8">Have an Inquiry? Welcome on board!</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            disabled={status === 'submitting'}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          <p className="text-gray-400 text-xs mt-1 text-right">
            {formData.message.length}/500
          </p>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-sm mt-2">✓ Thanks! We'll be in touch soon.</p>
        )}

        {status === 'error' && (
          <p className="text-red-600 text-sm mt-2">✗ Failed to send message. Please try again later.</p>
        )}
      </form>
    </div>
  );
}

export default Contact;