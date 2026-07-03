'use client';

import { FileText, ChevronDown, Moon, Combine, Scissors, RotateCw, Trash2, Layout, Zap, FileUp, Grid3X3, BookOpen, Mail, Lock } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onSelectTool: (toolId: string) => void;
  onNavigateBlog?: () => void;
}

interface DropdownTool {
  id: string;
  label: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}

interface Category {
  label: string;
  tools: DropdownTool[];
}

export default function Navbar({ onSelectTool, onNavigateBlog }: NavbarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const categories: { [key: string]: Category } = {
    organize: {
      label: 'Organize PDF',
      tools: [
        { id: 'merge', label: 'Merge PDF', description: 'Combine multiple PDF files into one document', icon: Combine, color: '#dc2626', bgColor: '#fee2e2' },
        { id: 'split', label: 'Split PDF', description: 'Extract pages from PDF or split into multiple files', icon: Scissors, color: '#ea580c', bgColor: '#ffedd5' },
        { id: 'rotate', label: 'Rotate PDF', description: 'Rotate PDF pages to the orientation you need', icon: RotateCw, color: '#ca8a04', bgColor: '#fef3c7' },
        { id: 'remove-pages', label: 'Remove Pages', description: 'Delete unwanted pages from your PDF', icon: Trash2, color: '#dc2626', bgColor: '#fee2e2' },
        { id: 'organize', label: 'Organize PDF', description: 'Rearrange, delete and rotate PDF pages with ease', icon: Layout, color: '#ec4899', bgColor: '#fce7f3' },
      ]
    },
    optimize: {
      label: 'Optimize',
      tools: [
        { id: 'compress', label: 'Compress PDF', description: 'Reduce PDF file size while keeping quality', icon: Zap, color: '#16a34a', bgColor: '#dcfce7' },
      ]
    },
    convert_to: {
      label: 'Convert to PDF',
      tools: [
        { id: 'word-to-pdf', label: 'Word to PDF', description: 'Convert Word documents to PDF format', icon: FileUp, color: '#2563eb', bgColor: '#dbeafe' },
        { id: 'excel-to-pdf', label: 'Excel to PDF', description: 'Convert Excel spreadsheets to PDF format', icon: Grid3X3, color: '#16a34a', bgColor: '#dcfce7' },
        { id: 'ppt-to-pdf', label: 'PowerPoint to PDF', description: 'Convert PowerPoint presentations to PDF', icon: BookOpen, color: '#ea580c', bgColor: '#ffedd5' },
        { id: 'jpg-to-pdf', label: 'JPG to PDF', description: 'Convert images to PDF documents', icon: Mail, color: '#ec4899', bgColor: '#fce7f3' },
        { id: 'html-to-pdf', label: 'HTML to PDF', description: 'Convert web pages to PDF documents', icon: Lock, color: '#0891b2', bgColor: '#cffafe' },
      ]
    },
    convert_from: {
      label: 'Convert from PDF',
      tools: [
        { id: 'pdf-to-word', label: 'PDF to Word', description: 'Convert PDF files to editable Word documents', icon: FileUp, color: '#2563eb', bgColor: '#dbeafe' },
        { id: 'pdf-to-excel', label: 'PDF to Excel', description: 'Extract data from PDF to Excel spreadsheets', icon: Grid3X3, color: '#16a34a', bgColor: '#dcfce7' },
        { id: 'pdf-to-ppt', label: 'PDF to PowerPoint', description: 'Convert PDF files to editable presentations', icon: BookOpen, color: '#ea580c', bgColor: '#ffedd5' },
        { id: 'pdf-to-jpg', label: 'PDF to JPG', description: 'Convert PDF pages to JPG images', icon: Mail, color: '#ec4899', bgColor: '#fce7f3' },
      ]
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-full mx-auto px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5 text-white font-bold" />
            </div>
            <span className="text-xl font-bold text-gray-900">pdfilio</span>
          </button>

          {/* Menu Items */}
          <div className="flex items-center gap-1">
            {Object.entries(categories).map(([key, category]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setOpenMenu(key)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="flex items-center gap-1 px-3.5 py-2 text-white bg-red-600 hover:bg-red-700 rounded font-bold transition-all duration-200 text-sm whitespace-nowrap">
                  {category.label}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-2xl py-4 px-0 z-20 transition-all duration-200 ${
                  openMenu === key ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  {category.tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => {
                          onSelectTool(tool.id);
                          setOpenMenu(null);
                        }}
                        className="w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-start gap-3 group/item"
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: tool.bgColor }}
                        >
                          <Icon className="w-5 h-5" style={{ color: tool.color }} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-900 text-sm">{tool.label}</h4>
                          <p className="text-gray-600 text-xs mt-0.5">{tool.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button 
              onClick={onNavigateBlog}
              className="px-3 py-2 text-gray-700 hover:text-red-600 font-bold transition-colors text-sm"
            >
              Blog
            </button>
            <a href="#" className="px-3 py-2 text-gray-700 hover:text-red-600 font-bold transition-colors text-sm">
              Pricing
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
              <Moon className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 text-gray-700 hover:text-red-600 font-bold transition-colors text-sm">
              Sign In
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold transition-all duration-200 shadow-sm hover:shadow-md text-sm">
              Get Premium
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
