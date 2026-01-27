export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-sky-blue-700 mb-4">
            Tilo Agency
          </h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Transform Your Digital Presence
          </p>
          <div className="glass rounded-xl p-8 max-w-2xl mx-auto shadow-xl">
            <p className="text-gray-700 text-lg">
              Modern digital agency specializing in strategic partnerships and digital growth solutions.
            </p>
          </div>
          <div className="mt-12">
            <p className="text-gray-500">
              Run <code className="bg-gray-100 px-3 py-1 rounded">npm run setup-content</code> to fetch and process content
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
