import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom"; // Add this import
import { isValidEmail } from "../utils/validation";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!data.success) {
        if (data.error.includes('duplicate')) {
          setErrorMessage('Already subscribed');
        } else {
          setErrorMessage(data.error || 'Something went wrong');
        }
        setStatus('error');
      } else {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to subscribe.');
      setStatus('error');
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-100">
      {/* Main Footer Content */}
      <div className="px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-sm font-bold text-accent mb-3 uppercase tracking-wide">Rey Technologies</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Innovative technology solutions for modern businesses.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <a href="https://wa.me/254746160768" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors"
                title="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.733 0-3.43.436-4.93 1.275L5.07 3.586 6.388 8.84c-.694 1.46-1.063 3.09-1.063 4.7 0 5.186 4.221 9.407 9.407 9.407 2.516 0 4.883-.97 6.66-2.73 1.777-1.76 2.757-4.118 2.757-6.677 0-5.186-4.221-9.407-9.407-9.407"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/rey-technologies" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors"
                title="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0"/>
                </svg>
              </a>
              <a href="https://twitter.com/reytechnologies" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors"
                title="X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.223-6.83-5.974 6.83h-3.31l7.73-8.835L2.55 2.25h6.632l4.775 6.312 5.387-6.312zM17.15 18.39h1.828L6.412 4.1H4.5z"/>
                </svg>
              </a>
              <a href="https://instagram.com/reytechnologies" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors"
                title="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>
              <a href="https://facebook.com/reytechnologies" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors"
                title="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-primary mb-4 uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-xs text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="/services" className="text-xs text-gray-400 hover:text-primary transition-colors">Services</a></li>
              <li><a href="/industries" className="text-xs text-gray-400 hover:text-primary transition-colors">Industries</a></li>
              <li><a href="/about" className="text-xs text-gray-400 hover:text-primary transition-colors">About</a></li>
              <li><a href="/contact" className="text-xs text-gray-400 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-secondary mb-4 uppercase tracking-wide">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services/custom-software" className="text-xs text-gray-400 hover:text-secondary transition-colors">Custom Software</a></li>
              <li><a href="/services/web-design" className="text-xs text-gray-400 hover:text-secondary transition-colors">Web Design</a></li>
              <li><a href="/services/mobile-apps" className="text-xs text-gray-400 hover:text-secondary transition-colors">Mobile Apps</a></li>
              <li><a href="/services/cloud-solutions" className="text-xs text-gray-400 hover:text-secondary transition-colors">Cloud Solutions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-accent mb-4 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary flex-shrink-0" />
                <a href="tel:+254746160768" className="text-xs text-gray-400 hover:text-primary transition-colors">+254 746 160 768</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary flex-shrink-0" />
                <a href="mailto:info@reytechnologies.com" className="text-xs text-gray-400 hover:text-primary transition-colors">info@reytechnologies.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-400">Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-primary mb-4 uppercase tracking-wide">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'submitting'}
                placeholder="Your email"
                className="w-full px-3 py-2 text-xs rounded bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:border-primary disabled:opacity-50 placeholder-gray-600"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-3 py-2 text-xs font-semibold bg-accent text-white rounded hover:brightness-110 disabled:opacity-60 transition-all"
              >
                {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              </button>
              {status === 'success' && (
                <p className="text-xs text-green-400">✓ Thanks!</p>
              )}
              {errorMessage && (
                <p className="text-xs text-red-400">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Legal Links & Copyright - ONLY THIS SECTION CHANGED */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2024 Rey Technologies Limited. All rights reserved.</p>
          <div className="flex gap-6 text-xs flex-wrap justify-center">
            <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;