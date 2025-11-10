"use client";
import { Button } from "./ui/button";
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'help@synctom.com';

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Industries", href: "/industries" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Web Development", href: "/services/web-development" },
  { name: "UI/UX Designing", href: "/services/ui-ux-design" },
  { name: "App Development", href: "/services/app-development" },
  { name: "Graphic Designing", href: "/services/graphic-design" },
  { name: "Branding", href: "/services/branding" },
  { name: "AI Automation", href: "/services/ai-automation" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link className="flex items-center mb-4 sm:mb-6" href={'/'}>
              <Image
                src={'/loo.png'}
                alt='logo'
                width={120}
                height={100}
                className="w-24 sm:w-28 md:w-32 h-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed max-w-xs sm:max-w-sm">
              Empowering businesses through technology, creativity, and innovation.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link 
                href="https://www.facebook.com/share/1CvMspAMCR/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors p-1"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link 
                href="https://www.linkedin.com/company/synctom/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors p-1"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link 
                href="https://www.instagram.com/synctom.official?igsh=MTJ4ZWR6aWs5cW41MA==" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors p-1"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1">
            <h3 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="sm:col-span-1">
            <h3 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base block py-1"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center text-sm sm:text-base text-gray-600">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400 shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="break-all hover:underline">{CONTACT_EMAIL}</a>
              </div>
              <div className="flex items-center text-sm sm:text-base text-gray-600">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400 shrink-0" />
                <span>0514444599</span>
              </div>
              <div className="flex items-start text-sm sm:text-base text-gray-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 mt-0.5 text-gray-400 shrink-0" />
                <span>Sector I-9/4<br />Islamabad, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Subscribe to our Newsletter</h3>
            <div className="space-y-3 sm:space-y-4">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-md transition-shadow"
              />
              <Button type="submit" variant="default" className="w-full py-2 sm:py-3 text-sm sm:text-base">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-6">
          <p className="text-gray-500 text-xs sm:text-sm text-center">
            © {new Date().getFullYear()} Synctom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}