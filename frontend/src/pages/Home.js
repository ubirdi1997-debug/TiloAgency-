import { useEffect, useState } from 'react';
import { MessageSquare, Gem, TrendingUp, Shield, Mail, Video, MessageCircle, Gift, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, contactForm);
      toast.success('Message sent successfully!');
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = settings?.whatsappNumber || '+918266941716';

  const salarySheet = [
    { coins: 40000, rupees: 800 },
    { coins: 80000, rupees: 1600 },
    { coins: 120000, rupees: 2400 },
    { coins: 160000, rupees: 3200 },
    { coins: 200000, rupees: 4000 },
    { coins: 240000, rupees: 4800 },
    { coins: 280000, rupees: 5600 },
    { coins: 320000, rupees: 6400 },
    { coins: 360000, rupees: 7200 },
    { coins: 400000, rupees: 8000 },
  ];

  const diamondSalary = [
    { diamond: '20,000', salary: 5, bonus: '-' },
    { diamond: '40,000', salary: 10, bonus: '-' },
    { diamond: '80,000', salary: 20, bonus: '-' },
    { diamond: '160,000', salary: 40, bonus: 3 },
    { diamond: '320,000', salary: 80, bonus: 5 },
    { diamond: '480,000', salary: 120, bonus: 10 },
    { diamond: '760,000', salary: 190, bonus: 15 },
    { diamond: '920,000', salary: 230, bonus: 20 },
  ];

  const fixedSalary = [
    { duration: '700min', avgCall: '2min', salary: 20 },
    { duration: '800min', avgCall: '2.5min', salary: 25 },
    { duration: '1000min', avgCall: '3min', salary: 30 },
    { duration: '1300min', avgCall: '3.5min', salary: 35 },
    { duration: '1500min', avgCall: '4min', salary: 50 },
  ];

  const agencySalary = [
    { total: '0-100', share: '5%', bonus: '-' },
    { total: '101-500', share: '8%', bonus: '-' },
    { total: '501-1000', share: '10%', bonus: 5 },
    { total: '1001-1500', share: '12%', bonus: 10 },
    { total: '1501-3000', share: '15%', bonus: 20 },
    { total: '3001-5000', share: '18%', bonus: 30 },
    { total: '≥5001', share: '20%', bonus: 50 },
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 glass-effect" data-testid="main-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_9f71c832-32c0-4e43-a54d-148da0bec377/artifacts/rv69rtzr_Firefly_Gemini_Flash_remove_background_389106-removebg-preview%20%281%29.png" 
                alt="Tilo Live Logo" 
                className="h-12"
              />
            </div>
            <div className="flex items-center space-x-8">
              <a href="#home" className="text-base font-medium text-gray-700 hover:text-sky-500 transition-colors">Home</a>
              <a href="#salary" className="text-base font-medium text-gray-700 hover:text-sky-500 transition-colors">Salary</a>
              <a href="#benefits" className="text-base font-medium text-gray-700 hover:text-sky-500 transition-colors">Benefits</a>
              <a href="#rules" className="text-base font-medium text-gray-700 hover:text-sky-500 transition-colors">Rules</a>
              <a href="#contact" className="text-base font-medium text-gray-700 hover:text-sky-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-gradient pt-32 pb-20 px-4" data-testid="hero-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="hero-headline">
                Join Tilo Live and Start Earning Today
              </h1>
              <p className="text-base sm:text-lg text-gray-600" data-testid="hero-subheadline">
                Become a Host or Agent and unlock flexible payouts, exclusive rewards, and professional growth opportunities.
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
            
            {/* Salary Sheet Table */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Tilo App Official Salary Sheet
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-sky-500">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Coins (Target)</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Payout (INR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salarySheet.map((row, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-sky-50 transition-colors">
                          <td className="py-3 px-4 text-gray-700">{row.coins.toLocaleString()} Coins</td>
                          <td className="text-right py-3 px-4 font-semibold text-sky-600">₹ {row.rupees.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salary Section */}
      <section id="salary" className="section-padding bg-white" data-testid="salary-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Our <span className="text-gradient">Salary Structure</span>
            </h2>
            <p className="text-lg text-gray-600">Our salary structure is designed to reward Hosts and Agents fairly based on Diamonds, Calls, and Agent performance.</p>
          </div>

          {/* Diamonds Salary Table */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <Gem className="text-sky-500" size={28} />
              Diamond Salary
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-sky-500">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Diamond</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Diamond Salary (USD)</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Host Bonus (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {diamondSalary.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-sky-50 transition-colors">
                      <td className="py-3 px-4 text-gray-700">{row.diamond}</td>
                      <td className="text-center py-3 px-4 font-semibold text-sky-600">${row.salary}</td>
                      <td className="text-right py-3 px-4 text-gray-700">{row.bonus === '-' ? '-' : `$${row.bonus}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>• Maximum Rate: 4000 Diamonds = 1 USD</p>
                <p>• Host salary = Diamond salary + Host Bonus + Fixed salary</p>
                <p>• Diamonds achieving 20k will be settled</p>
              </div>
            </div>
          </div>

          {/* Fixed Salary Table */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <Clock className="text-cyan-500" size={28} />
              Fixed Salary
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-cyan-500">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Private Call Duration/Week</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Average Call Duration</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Fixed Salary (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {fixedSalary.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-cyan-50 transition-colors">
                      <td className="py-3 px-4 text-gray-700">{row.duration}</td>
                      <td className="text-center py-3 px-4 text-gray-700">{row.avgCall}</td>
                      <td className="text-right py-3 px-4 font-semibold text-cyan-600">${row.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Agency Salary Table */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-purple-500" size={28} />
              Agency Salary
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-purple-500">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Host Total Salary (USD)</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Agent Share</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Agent Bonus (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {agencySalary.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-purple-50 transition-colors">
                      <td className="py-3 px-4 text-gray-700">{row.total}</td>
                      <td className="text-center py-3 px-4 font-semibold text-purple-600">{row.share}</td>
                      <td className="text-right py-3 px-4 text-gray-700">{row.bonus === '-' ? '-' : `$${row.bonus}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>• Agent Salary = Agent commission + Agent Bonus</p>
                <p>• If an agency's total income does not meet $20 for a week, it will not be paid but can be accumulated to the next week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-padding gradient-bg" data-testid="benefits-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              New Host Benefits
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl mb-12">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🟢</span>
                <p className="text-lg text-gray-700">Earn <strong>Double Diamonds</strong> for their first 20 calls (including matched and private calls) within 48 hours of being approved as a host.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🟢</span>
                <p className="text-lg text-gray-700">Each new host can earn up to <strong>20,000 diamonds</strong>.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🟢</span>
                <p className="text-lg text-gray-700">Bonus will be calculated on salary report of host.</p>
              </div>
            </div>
          </div>

          {/* Settlement Details */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl mb-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Get Secure Payouts and Flexible Diamond-to-Cash Conversion Through Epay
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sky-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Settlement Details</h4>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Method:</strong> Epay</p>
                  <p><strong>Cycle:</strong> Monday 00:00 to Sunday 24:00</p>
                  <p><strong>Cut-off:</strong> Sunday Midnight (24:00)</p>
                  <p><strong>Pay Day:</strong> Every Wednesday</p>
                  <p className="text-sm text-gray-600">(Salary reports sent on Tuesday)</p>
                </div>
              </div>
              <div className="bg-cyan-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Requirements</h4>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    Agency must reach <strong>$20</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    Host must reach <strong>20,000 Diamonds</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Earning Methods Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-sky-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="text-sky-600" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Video Call Rates</h3>
              <p className="text-gray-600 mb-2">Earn <strong className="text-sky-600">196 💎</strong> for 30 seconds</p>
              <p className="text-gray-600">Earn <strong className="text-sky-600">294 💎</strong> for a full minute</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-cyan-600" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Reply Rewards</h3>
              <p className="text-gray-600 mb-2">Reply within 2 min: <strong className="text-cyan-600">15 💎</strong></p>
              <p className="text-gray-600 mb-2">Reply within 30 min: <strong className="text-cyan-600">7 💎</strong></p>
              <p className="text-gray-600">Reply after 30 min: <strong className="text-gray-400">0 💎</strong></p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="text-purple-600" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Virtual Gifts</h3>
              <p className="text-gray-600">Receive gifts during calls to boost your diamond count instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="section-padding bg-white" data-testid="rules-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Host <span className="text-gradient">Rules</span>
            </h2>
            <p className="text-lg text-gray-600">Follow the rules to maintain your level, avoid penalties, and maximize your income.</p>
          </div>

          {/* Call Rejection Rules - Timeline */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Call Rejection Rules</h3>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-orange-400 to-red-500"></div>
              
              <div className="space-y-8 relative">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    1-2
                  </div>
                  <div className="flex-1 bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                    <h4 className="font-bold text-gray-900 mb-2">Warning</h4>
                    <p className="text-gray-600">First and second call rejections result in a warning</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    3
                  </div>
                  <div className="flex-1 bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                    <h4 className="font-bold text-gray-900 mb-2">2h Suspension + Demotion</h4>
                    <p className="text-gray-600">Third rejection leads to 2-hour suspension and level demotion</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    4
                  </div>
                  <div className="flex-1 bg-red-50 rounded-xl p-6 border-2 border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">24h Suspension + Traffic Block</h4>
                    <p className="text-gray-600">Fourth rejection results in 24-hour suspension and traffic blocking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Host Levels - Tier Badges */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Host Levels</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  S
                </div>
                <p className="font-semibold text-gray-900">S Level</p>
                <p className="text-sm text-gray-600">Premium</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  A
                </div>
                <p className="font-semibold text-gray-900">A Level</p>
                <p className="text-sm text-gray-600">High Tier</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  B
                </div>
                <p className="font-semibold text-gray-900">B Level</p>
                <p className="text-sm text-gray-600">Mid Tier</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  C
                </div>
                <p className="font-semibold text-gray-900">C Level</p>
                <p className="text-sm text-gray-600">Entry</p>
              </div>
            </div>
            <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
              <p className="text-center text-gray-700"><strong>Pro Tip:</strong> Exchange rate is <strong className="text-sky-600">4000 💎 = $1 USD</strong></p>
            </div>
          </div>

          {/* Perfect Host Requirements - Split Card */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-green-600" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">✅ The Perfect Host</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Lighting:</strong> Keep the room bright and well-lit</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Visibility:</strong> Show your full face in the video call</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Engagement:</strong> Take the initiative to greet users and smile</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Appearance:</strong> Wear makeup and dress decently</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Eligibility:</strong> Female hosts only (Age 18 to 45)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="text-red-600" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">❌ Immediate Prohibitions</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Personal Info:</strong> DO NOT share contact details (WhatsApp, Phone numbers)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Obscurity:</strong> Do not hide your face or show only part of it</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Environment:</strong> No black screens or dark rooms</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Behavior:</strong> No ignoring or disrespecting users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding gradient-bg" data-testid="contact-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Get in Touch
            </h2>
            <p className="text-lg text-white/90">Have questions? We're here to help.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleContactSubmit} className="space-y-6" data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <textarea
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img 
            src="https://customer-assets.emergentagent.com/job_9f71c832-32c0-4e43-a54d-148da0bec377/artifacts/rv69rtzr_Firefly_Gemini_Flash_remove_background_389106-removebg-preview%20%281%29.png" 
            alt="Tilo Live" 
            className="h-10 mx-auto mb-4 brightness-0 invert"
          />
          <p className="text-gray-400 text-sm">
            © 2025 Tilo Live. All rights reserved.
          </p>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I%20have%20a%20question%20about%20Tilo%20Live`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all z-40 hover:scale-110"
        data-testid="whatsapp-float-button"
      >
        <MessageSquare size={32} />
      </a>
    </div>
  );
};

export default Home;
