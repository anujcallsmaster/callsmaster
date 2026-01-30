'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check, Languages } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1] || 'en';

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },

  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (locale) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/') || '/');
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center gap-2 group cursor-pointer">
          <Image src="/logo.png" width={300} height={300} alt="logo" />
      </div>

      {/* Language Switcher */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            group flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-200
            ${isOpen 
              ? 'bg-blue-50 border-blue-200 ring-4 ring-blue-50' 
              : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}
          `}
        >
          <div className="bg-gray-100 p-1 rounded-full group-hover:bg-blue-100 transition-colors">
            <Globe size={16} className="text-gray-600 group-hover:text-blue-600" />
          </div>
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            {currentLocale}
          </span>
          <ChevronDown 
            size={14} 
            className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} 
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-56 origin-top-right bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200">
            <div className="px-4 py-2 mb-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Select Language</p>
            </div>
            
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-150
                  ${currentLocale === lang.code 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg leading-none">{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                {currentLocale === lang.code && (
                  <Check size={16} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;