import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaWhatsapp, FaDiamond, FaChartLine, FaShieldAlt, FaEnvelope } from 'react-icons/fa';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API}/settings`);
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = settings?.whatsappNumber || '+918266941716';

  return (
    <div className="min-h-screen" data-testid="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20 px-4" data-testid="hero-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="hero-headline">
                {settings?.heroHeadline || 'Join Tilo Live and Start Earning Today'}
              </h1>
              <p className="text-base sm:text-lg text-gray-600" data-testid="hero-subheadline">
                {settings?.heroSubheadline || 'Become a Host or Agent and unlock flexible payouts, exclusive rewards, and professional growth opportunities.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I%20want%20to%20be%20a%20Host%20at%20Tilo%20Live`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-center"
                  data-testid="cta-host-button"
                >
                  I'm a Host
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I%20want%20to%20be%20an%20Agent%20at%20Tilo%20Live`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center justify-center gap-2 text-center"
                  data-testid="cta-agent-button"
                >
                  I'm an Agent
                </a>
              </div>
            </div>
            <div className="relative animate-float">
              <div className="glass-effect rounded-3xl p-8 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop" 
                  alt="Live Streaming" 
                  className="rounded-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white" data-testid="features-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Why Choose <span className="text-gradient">Tilo Live</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-8 border border-sky-100" data-testid="feature-earnings">
              <div className="bg-sky-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FaDiamond className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Competitive Earnings</h3>
              <p className="text-gray-600">Earn based on diamonds, calls, and performance with transparent salary structures and timely payouts.</p>
            </div>

            <div className="card-hover bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-8 border border-sky-100" data-testid="feature-growth">
              <div className="bg-cyan-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Career Growth</h3>
              <p className="text-gray-600">Access exclusive benefits, bonuses, and advancement opportunities as you build your presence.</p>
            </div>

            <div className="card-hover bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-8 border border-sky-100" data-testid="feature-secure">
              <div className="bg-sky-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Platform</h3>
              <p className="text-gray-600">Professional support, clear guidelines, and secure payment systems ensure your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Host Benefits */}
      <section className="section-padding gradient-bg" data-testid="benefits-section">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              New Host <span className="text-gradient">Benefits</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-sky-50 rounded-xl" data-testid="benefit-double-diamonds">
                <div className="text-4xl font-bold text-sky-500 mb-3">2x</div>
                <h3 className="font-semibold mb-2 text-gray-900">Double Diamonds</h3>
                <p className="text-sm text-gray-600">Earn double diamonds for your first 20 calls within 48 hours of approval</p>
              </div>
              <div className="text-center p-6 bg-cyan-50 rounded-xl" data-testid="benefit-earning-potential">
                <div className="text-4xl font-bold text-cyan-500 mb-3">20K+</div>
                <h3 className="font-semibold mb-2 text-gray-900">Earning Potential</h3>
                <p className="text-sm text-gray-600">New hosts can earn up to 20,000 diamonds through the welcome bonus program</p>
              </div>
              <div className="text-center p-6 bg-sky-50 rounded-xl" data-testid="benefit-instant-payout">
                <div className="text-4xl font-bold text-sky-600 mb-3">100%</div>
                <h3 className="font-semibold mb-2 text-gray-900">Transparent Payouts</h3>
                <p className="text-sm text-gray-600">Bonus automatically calculated in your salary report with full transparency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white" data-testid="cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of successful hosts and agents. Begin earning with Tilo Live today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/salary" className="btn-primary inline-flex items-center justify-center" data-testid="view-salary-button">
              View Salary Structure
            </Link>
            <Link to="/rules" className="btn-outline inline-flex items-center justify-center" data-testid="read-rules-button">
              Read Guidelines
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding gradient-bg" data-testid="newsletter-section">
        <div className="max-w-2xl mx-auto text-center">
          <FaEnvelope className="text-5xl text-white mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Stay Updated
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Subscribe to our newsletter for the latest updates, tips, and exclusive offers.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" data-testid="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              data-testid="newsletter-email-input"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-sky-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
              data-testid="newsletter-submit-button"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I%20have%20a%20question%20about%20Tilo%20Live`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all z-40 hover:scale-110"
        data-testid="whatsapp-float-button"
      >
        <FaWhatsapp size={32} />
      </a>

      <Footer />
    </div>
  );
};

export default Home;
