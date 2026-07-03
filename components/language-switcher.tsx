'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Language, languages } from '@/lib/languages';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export default function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-red-600 font-bold transition-colors text-sm rounded hover:bg-gray-100"
      >
        <Globe className="w-4 h-4" />
        <span>{languages[currentLanguage].nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <div className="p-2">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => {
                  onLanguageChange(code as Language);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                  code === currentLanguage
                    ? 'bg-red-100 text-red-700 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.nativeName}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
