import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiMapPin, FiUser, FiArrowRight, FiExternalLink, FiClock } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Conference Banner */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white py-2.5 border-b border-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm">
            <span className="font-medium">Part of MAIA 2025 Conference</span>
            <span className="hidden md:inline text-primary-300">•</span>
            <span className="text-primary-100">December 18-20, 2025 • ENS-Tetouan, Morocco</span>
            <span className="hidden md:inline text-primary-300">•</span>
            <a 
              href="https://icmaia.ens-tetouan.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium hover:text-accent-300 transition-colors"
            >
              Visit Conference <FiExternalLink className="text-xs" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-white space-y-6 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <FiClock className="text-accent-300" />
                <span>December 20, 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
                Professional AI Workshops
                <span className="block text-accent-300 mt-2">at MAIA 2025</span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-100 leading-relaxed max-w-xl">
                Master cutting-edge AI technologies through hands-on workshops. Build real applications with Visual RAG, LLMs, and low-code tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-all duration-300 shadow-medium hover:shadow-hard hover:scale-105"
                >
                  Register Now
                  <FiArrowRight />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  Learn More
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                  <span className="text-primary-200">Free Attendance</span>
                </div>
              </div>
            </div>

            {/* Right Column - Logo & Info */}
            <div className="flex flex-col items-center space-y-8 animate-fade-in">
              <div className="bg-white p-8 rounded-2xl shadow-hard">
                <Image
                  src="/images/maia-logo-white-bg.jpg"
                  alt="MAIA Conference Logo"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="bg-neutral-50 py-12 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 group">
              <div className="bg-primary-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <FiCalendar className="text-primary-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1 font-display">Date</h3>
                <p className="text-neutral-700 font-medium">December 20, 2025</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-primary-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <FiMapPin className="text-primary-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1 font-display">Location</h3>
                <p className="text-neutral-700 font-medium">ENS-Tetouan</p>
                <p className="text-sm text-neutral-500 mt-1">Morocco</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-primary-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <FiUser className="text-primary-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1 font-display">Format</h3>
                <p className="text-neutral-700 font-medium">Hands-On</p>
                <p className="text-sm text-neutral-500 mt-1">Interactive sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Sessions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 font-display mb-4">
              Workshop Sessions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Two comprehensive sessions designed to give you practical AI skills
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Session 1: Visual RAG Pipeline */}
            <div className="group relative bg-gradient-to-br from-white to-primary-50 border-2 border-primary-200 rounded-2xl p-8 shadow-soft hover:shadow-hard transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 -mt-4 -mr-4">
                <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Session 1
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2 font-display">
                  Visual RAG Pipeline
                </h3>
                <p className="text-lg text-primary-700 font-semibold">(Low Code Approach)</p>
              </div>

              <p className="text-neutral-700 mb-6 leading-relaxed">
                Master the art of building Retrieval-Augmented Generation systems using N8N workflow automation. 
                Learn to integrate Large Language Models with Vector Databases to create intelligent AI applications 
                without extensive coding.
              </p>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-neutral-900">What You'll Learn:</h4>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-0.5">▸</span>
                    <span>Understanding LLMs and Vector Store architectures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-0.5">▸</span>
                    <span>Building N8N workflows from scratch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-0.5">▸</span>
                    <span>Implementing RAG for real-world applications</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-primary-200 pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-600 p-3 rounded-xl">
                    <FiUser className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">Taoufik Hicham</p>
                    <p className="text-sm text-neutral-600">AI Specialist, AphelionXInnovations</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-semibold">LLMs</span>
                <span className="bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-semibold">Vector Stores</span>
                <span className="bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-semibold">N8N</span>
                <span className="bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-semibold">RAG</span>
              </div>
            </div>

            {/* Session 2: TBA */}
            <div className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 border-2 border-dashed border-neutral-300 rounded-2xl p-8 shadow-soft">
              <div className="absolute top-0 right-0 -mt-4 -mr-4">
                <div className="bg-neutral-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Session 2
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-700 mb-2 font-display">
                  Advanced Topics
                </h3>
                <p className="text-lg text-neutral-500 font-semibold">To Be Announced</p>
              </div>

              <p className="text-neutral-600 mb-6 leading-relaxed">
                The second workshop session will cover advanced AI topics complementing the morning session. 
                Details including the specific topic and instructor will be announced soon.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>📢 Coming Soon:</strong> Register now to be notified when session details are announced.
                </p>
              </div>

              <div className="border-t border-neutral-300 pt-6 opacity-60">
                <div className="flex items-center gap-4">
                  <div className="bg-neutral-400 p-3 rounded-xl">
                    <FiUser className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-600">Instructor TBA</p>
                    <p className="text-sm text-neutral-500">Details coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Ready to Transform Your AI Skills?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join us for an intensive day of hands-on learning and practical application development
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-accent-500 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-accent-600 transition-all duration-300 shadow-hard hover:scale-105"
          >
            Secure Your Spot
            <FiArrowRight className="text-xl" />
          </Link>
          <p className="mt-6 text-primary-200 text-sm">
            Limited seats available • Free attendance
          </p>
        </div>
      </section>
    </div>
  );
}

