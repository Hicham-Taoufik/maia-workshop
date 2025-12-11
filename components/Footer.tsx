import { FiExternalLink, FiMapPin, FiCalendar } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-block mb-4 group">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/maia-logo-white-bg.jpg"
                  alt="MAIA Conference Logo"
                  width={50}
                  height={50}
                  className="object-contain group-hover:scale-110 transition-transform"
                />
                <div>
                  <h3 className="text-2xl font-bold font-display">MAIA 2025</h3>
                  <p className="text-neutral-400 text-xs">Workshops</p>
                </div>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
              Professional AI workshops at the International Conference on Mathematics, Artificial Intelligence, and Applications.
            </p>
          </div>

          {/* Event Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-neutral-400">Event Information</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <FiCalendar className="text-accent-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-neutral-300 font-medium">December 20, 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <FiMapPin className="text-accent-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-neutral-300 font-medium">ENS-Tetouan</p>
                  <p className="text-neutral-500 text-xs">Morocco</p>
                </div>
              </div>
              <a 
                href="https://icmaia.ens-tetouan.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-400 hover:text-accent-300 transition-colors text-sm font-medium mt-2"
              >
                Conference Website
                <FiExternalLink className="text-xs" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-neutral-500">
            <p>© 2025 MAIA Conference. All rights reserved.</p>
            <p>Higher Normal School, Tetouan, Morocco</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

