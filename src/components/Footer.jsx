import { useState } from "react";
import { Link } from "react-router-dom";
import { isValidEmail } from "../utils/validation";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Subscription failed');
      }

      setSubscribed(true);
      setEmail('');
      setStatus('success');

      setTimeout(() => {
        setSubscribed(false);
        setStatus('idle');
      }, 5000);

    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to subscribe. Please try again.');

      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

        <div>
          <h3 className="font-bold text-lg mb-3">Rey Technologies</h3>
          <p className="text-gray-400 text-sm">
            Delivering innovative technology solutions for modern enterprises.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/industries" className="hover:text-white transition-colors">Industries</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Contact Info</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="tel:+254746160768" className="hover:text-white transition-colors">
                📞 +254 746 160 768
              </a>
            </li>
            <li>
              <a href="mailto:info@reytechnologies.com" className="hover:text-white transition-colors">
                📧 info@reytechnologies.com
              </a>
            </li>
            <li>📍 Nairobi, Kenya</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Get Updates</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting'}
              className="flex-1 px-3 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSubscribe}
              disabled={status === 'submitting'}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md text-sm font-medium transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? '...' : 'Subscribe'}
            </button>
          </div>

          {status === 'success' && (
            <p className="text-green-400 text-xs mt-2">✓ Thanks for subscribing!</p>
          )}

          {status === 'error' && (
            <p className="text-red-400 text-xs mt-2">✗ {errorMessage}</p>
          )}

          <p className="text-gray-500 text-xs mt-2">Stay updated with our latest news</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-10 pt-6 border-t border-gray-800">
        &copy; {new Date().getFullYear()} Rey Technologies. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;