import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content';

export default function Home() {
  const content = getContent();
  const { home, services } = content;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-sky-blue-50 via-white to-cyan-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {home.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
              {home.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-sky-blue-600 text-white px-8 py-4 rounded-full hover:bg-sky-blue-700 transition shadow-lg text-lg font-semibold"
              >
                Get Started
              </Link>
              <Link 
                href="/services" 
                className="glass text-sky-blue-700 px-8 py-4 rounded-full hover:shadow-xl transition text-lg font-semibold"
              >
                Our Services
              </Link>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service, index) => (
                <div 
                  key={index}
                  className="glass rounded-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-blue-500 to-cyan-500 rounded-lg mb-4 flex items-center justify-center text-white text-2xl">
                    ✦
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link 
                href="/services" 
                className="text-sky-blue-600 hover:text-sky-blue-700 font-semibold text-lg"
              >
                View All Services →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {home.sections[0]?.title || 'Why Choose Us'}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {home.sections[0]?.content}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-dark rounded-2xl p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                {home.sections[1]?.title || 'Ready to Get Started?'}
              </h2>
              <p className="text-xl mb-8 text-gray-200">
                {home.sections[1]?.content}
              </p>
              <Link 
                href={home.sections[1]?.buttonLink || '/contact'}
                className="inline-block bg-white text-sky-blue-700 px-10 py-4 rounded-full hover:bg-gray-100 transition shadow-lg text-lg font-semibold"
              >
                {home.sections[1]?.buttonText || 'Contact Us'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
