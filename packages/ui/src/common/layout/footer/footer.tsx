import Twitter from '@oe/assets/icons/social-icon/twitter';
import { Facebook, Instagram } from 'lucide-react';
import { Link } from '#common/navigation';

export function Footer() {
  return (
    <footer className="w-full px-4 py-8 lg:py-16 bg-[linear-gradient(255deg,_#B8F4F8_6.18%,_#EDE3FE_70.53%)]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#4318FF] rounded-full" />
              <span className="text-[#4318FF] text-2xl font-semibold">OpenEDU</span>
            </Link>
            <p className="text-[#464646] text-sm leading-relaxed max-w-xs">
              A dynamic platform for learns, instructors, organizations to engage and share knowledge. We aim to add
              value to our learner's journey.
            </p>
          </div>

          {/* Registration Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#2B3674]">Registration</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/become-creator" className="text-sm text-[#464646] hover:text-[#2B3674] transition-colors">
                  Become Creator
                </Link>
              </li>
              <li>
                <Link href="/become-writer" className="text-sm text-[#464646] hover:text-[#2B3674] transition-colors">
                  Become Writter
                </Link>
              </li>
              <li>
                <Link href="/organization" className="text-sm text-[#464646] hover:text-[#2B3674] transition-colors">
                  Organization Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#2B3674]">Terms & Conditioners</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-sm text-[#464646] hover:text-[#2B3674] transition-colors">
                  OpenEdu T&C
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-[#464646] hover:text-[#2B3674] transition-colors">
                  OpenEdu FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="flex items-center gap-3 text-sm text-[#464646] hover:text-[#2B3674] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="flex items-center gap-3 text-sm text-[#464646] hover:text-[#2B3674] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="flex items-center gap-3 text-sm text-[#464646] hover:text-[#2B3674] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
