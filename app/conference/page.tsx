import { FiExternalLink, FiCalendar, FiMapPin } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function ConferencePage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/maia-logo-white-bg.jpg"
              alt="MAIA Conference Logo"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MAIA 2025 Conference
          </h1>
          <p className="text-xl text-gray-600">
            International Conference on Mathematics Artificial Intelligence And Its Applications
          </p>
        </div>

        {/* Main Conference Info */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">About MAIA 2025</h2>
          <p className="text-lg leading-relaxed mb-4">
            This conference explores the intersection of <strong>mathematics</strong>, <strong>artificial intelligence</strong>, 
            and their wide-ranging applications in designing intelligent systems for science, engineering, education, and digital innovation.
          </p>
          <p className="text-lg leading-relaxed">
            The theme of this first edition is to unite researchers and practitioners around both theoretical and applied perspectives, 
            rethinking the connections between advanced mathematics, AI, e-learning, and pedagogical innovation through an interdisciplinary 
            and sustainable approach.
          </p>
        </div>

        {/* Conference Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-primary-200 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <FiCalendar className="text-primary-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Conference Dates</h3>
                <p className="text-gray-600">December 18-20, 2025</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-primary-200 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <FiMapPin className="text-primary-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Location</h3>
                <p className="text-gray-600">ENS-Tetouan, Morocco</p>
                <p className="text-sm text-gray-500">Higher Normal School - Tetouan</p>
              </div>
            </div>
          </div>
        </div>


        {/* Call to Action */}
        <div className="bg-primary-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Visit the Official Conference Website
          </h3>
          <a
            href="https://icmaia.ens-tetouan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Visit MAIA 2025 Website <FiExternalLink />
          </a>
        </div>

        {/* Workshop Link */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Interested in our Workshops?
          </h3>
          <p className="text-gray-600 mb-4">
            Register for the MAIA 2025 workshops on December 20, 2025.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Register for Workshop
          </Link>
        </div>
      </div>
    </div>
  );
}

