import { FiCalendar, FiMapPin, FiUser, FiTarget, FiExternalLink, FiCheck } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                MAIA 2025 Workshops
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">
                Professional AI Training for the Future
              </h1>
              <p className="text-xl text-primary-100 leading-relaxed">
                Two comprehensive workshop sessions designed to equip you with cutting-edge AI skills through hands-on, practical learning.
              </p>
            </div>

            <div className="flex justify-center animate-fade-in">
              <div className="bg-white p-6 rounded-2xl shadow-hard">
                <Image
                  src="/images/maia-logo-white-bg.jpg"
                  alt="MAIA Conference Logo"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conference Context */}
      <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-primary-200 rounded-2xl p-8 md:p-12 shadow-soft">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary-100 p-3 rounded-xl">
                <FiExternalLink className="text-primary-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-3 font-display">
                  Part of MAIA 2025 Conference
                </h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  These workshops are part of the <strong>International Conference on Mathematics, Artificial Intelligence, and Its Applications (MAIA 2025)</strong>, 
                  taking place December 18-20, 2025 at ENS-Tetouan, Morocco.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  The conference explores the intersection of mathematics, artificial intelligence, and their wide-ranging applications 
                  in designing intelligent systems for science, engineering, education, and digital innovation.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a 
                href="https://icmaia.ens-tetouan.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Visit Conference Website <FiExternalLink />
              </a>
              <Link 
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-lg hover:bg-accent-600 transition-colors font-semibold"
              >
                Register for Workshops
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 font-display mb-4">
              Workshop Sessions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Two focused sessions covering essential AI technologies and applications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Session 1 */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border-2 border-primary-300 shadow-soft">
              <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-6">
                Session 1
              </div>
              
              <h3 className="text-3xl font-bold text-neutral-900 mb-4 font-display">
                Visual RAG Pipeline
                <span className="block text-xl text-primary-700 mt-2">(Low-Code Approach)</span>
              </h3>

              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold text-neutral-800">What You'll Master:</h4>
                <ul className="space-y-3">
                  {[
                    'Understanding LLM architectures and capabilities',
                    'Working with Vector Databases for semantic search',
                    'Building N8N workflows from scratch',
                    'Implementing Retrieval-Augmented Generation'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="text-primary-600 mt-1 flex-shrink-0" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t-2 border-primary-300 pt-6 mt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-600 p-3 rounded-xl">
                    <FiUser className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-lg">Taoufik Hicham</p>
                    <p className="text-neutral-600">AI Specialist, AphelionXInnovations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session 2 */}
            <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl p-8 border-2 border-dashed border-neutral-400 shadow-soft">
              <div className="bg-neutral-500 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-6">
                Session 2
              </div>
              
              <h3 className="text-3xl font-bold text-neutral-700 mb-4 font-display">
                Advanced Topics
                <span className="block text-xl text-neutral-500 mt-2">To Be Announced</span>
              </h3>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">Expected Focus Areas:</p>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Advanced AI implementation techniques</li>
                  <li>• Real-world case studies</li>
                  <li>• Production deployment strategies</li>
                  <li>• Interactive hands-on exercises</li>
                </ul>
              </div>

              <div className="border-t-2 border-neutral-400 pt-6 mt-6 opacity-60">
                <div className="flex items-center gap-4">
                  <div className="bg-neutral-500 p-3 rounded-xl">
                    <FiUser className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-600 text-lg">Instructor TBA</p>
                    <p className="text-neutral-500">Details coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 font-display mb-4">
              Who Should Attend
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              These workshops are designed for a diverse audience interested in AI and automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Developers & Engineers',
                description: 'Software developers looking to add AI capabilities to their skillset'
              },
              {
                title: 'Data Scientists',
                description: 'Data professionals wanting to expand into AI application development'
              },
              {
                title: 'Product Managers',
                description: 'Technical PMs seeking to understand AI implementation possibilities'
              },
              {
                title: 'Students & Researchers',
                description: 'Academic professionals interested in practical AI applications'
              },
              {
                title: 'Business Professionals',
                description: 'Decision-makers evaluating AI solutions for their organizations'
              },
              {
                title: 'Tech Enthusiasts',
                description: 'Anyone passionate about learning cutting-edge AI technologies'
              }
            ].map((audience, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow border border-neutral-200">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FiTarget className="text-primary-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 font-display">{audience.title}</h3>
                <p className="text-neutral-600">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Event Details */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white shadow-hard">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <FiCalendar className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display">Date</h3>
                    <p className="text-primary-100">December 20, 2025</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <FiMapPin className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display">Location</h3>
                    <p className="text-primary-100">ENS-Tetouan, Morocco</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20 text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-600 transition-all duration-300 hover:scale-105"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
