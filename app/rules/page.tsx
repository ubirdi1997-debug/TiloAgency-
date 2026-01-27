import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content';

export default function RulesPage() {
  const content = getContent();
  const { rules } = content;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-sky-blue-50 via-white to-cyan-50">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                {rules.title}
              </h1>
              <p className="text-xl text-gray-600">
                Please review our terms and policies carefully
              </p>
            </div>

            <div className="space-y-8">
              {rules.sections.map((section, index) => (
                <div 
                  key={index}
                  className="glass rounded-xl p-8 hover:shadow-xl transition"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-sky-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="space-y-4 pl-11">
                    {section.content.map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-sky-blue-500 mr-3 mt-1">•</span>
                        <p className="text-gray-700 leading-relaxed flex-1">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-16 text-center glass rounded-xl p-8">
              <p className="text-gray-600 mb-4">
                Have questions about our terms and policies?
              </p>
              <a 
                href="/contact"
                className="inline-block text-sky-blue-600 hover:text-sky-blue-700 font-semibold"
              >
                Contact Us →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
