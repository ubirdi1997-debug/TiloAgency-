import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content';

export default function ServicesPage() {
  const content = getContent();
  const { services } = content;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-sky-blue-50 via-white to-cyan-50">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Our Services
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive digital solutions designed to help your business thrive in the modern digital landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="glass rounded-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-blue-500 to-cyan-500 rounded-xl mb-6 flex items-center justify-center text-white text-3xl">
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

            {/* CTA */}
            <div className="mt-20 text-center">
              <div className="glass rounded-2xl p-12 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Let's discuss how our services can help you achieve your goals.
                </p>
                <a 
                  href="/contact"
                  className="inline-block bg-sky-blue-600 text-white px-10 py-4 rounded-full hover:bg-sky-blue-700 transition shadow-lg text-lg font-semibold"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
