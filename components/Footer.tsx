import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-sky-blue-400 mb-4">Tilo Agency</h3>
            <p className="text-gray-400">
              Modern digital agency specializing in strategic partnerships and digital growth solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-sky-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-sky-blue-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-gray-400 hover:text-sky-blue-400 transition">
                  Terms & Policies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-sky-blue-400 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 contact@tiloagency.com</li>
              <li>🌐 tiloagency.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tilo Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
