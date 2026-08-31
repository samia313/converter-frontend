'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactOptions = [
    { icon: Mail, title: 'Email Support', description: "Send us an email and we'll respond as soon as possible", value: 'support@pdfilio.com' },
    { icon: MessageSquare, title: 'Support', description: 'Use the contact form below for product or privacy questions', value: 'Contact Form' },
  ];

  const faqs = [
    { question: 'How long are my files stored?', answer: 'PDFilio is not a permanent file-storage service. Processing depends on the tool: some tools process in your browser while others use temporary server-side processing. We do not promise one fixed retention period for every tool.' },
    { question: 'Is PDFilio secure?', answer: 'We use reasonable technical measures for the service, but no internet service can guarantee absolute security. Please avoid uploading information you are not authorized to process.' },
    { question: 'Do I need to create an account?', answer: 'Many public tools can be used without registration. Account requirements can differ for selected features.' },
    { question: 'What file formats do you support?', answer: 'PDFilio supports a range of PDF and document formats. Supported formats and limits vary by tool.' },
    { question: 'Can I use PDFilio offline?', answer: 'PDFilio is a web-based service and normally requires an internet connection. Some processing may occur directly in your browser.' },
    { question: 'Is there a file size limit?', answer: 'The standard file uploader currently validates files up to 50MB unless a specific tool supplies a different limit. Do not assume unlimited file sizes unless the tool explicitly states otherwise.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSelectTool={() => {}} onNavigateBlog={() => {}} />
      <main className="pt-32 pb-20">
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Have questions or need support? Contact PDFilio by email or use the form below.</p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 text-center"><Icon className="w-12 h-12 text-red-600 mx-auto mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3><p className="text-gray-600 mb-4">{option.description}</p><p className="text-lg font-semibold text-red-600">{option.value}</p></div>;
            })}
          </div>

          <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            {submitted ? <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"><p className="text-green-800 font-semibold">Thank you for your message! We'll get back to you soon.</p></div> : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Your name" /></div>
                  <div><label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="your@email.com" /></div>
                </div>
                <div><label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label><input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="How can we help?" /></div>
                <div><label className="block text-sm font-semibold text-gray-900 mb-2">Message</label><textarea name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Your message..." /></div>
                <button type="submit" className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">Send Message</button>
              </form>
            )}
          </div>
        </section>

        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12"><HelpCircle className="w-8 h-8 text-red-600" /><h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2></div>
            <div className="space-y-6">{faqs.map((faq, index) => <details key={index} className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-red-300 transition-colors"><summary className="flex items-center justify-between font-semibold text-gray-900 select-none"><span>{faq.question}</span><span className="text-red-600">+</span></summary><p className="text-gray-600 mt-4">{faq.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Need help?</h2>
          <p className="text-lg text-gray-600 mb-4">Email <a className="text-red-600 font-semibold" href="mailto:support@pdfilio.com">support@pdfilio.com</a> for support or privacy questions.</p>
          <p className="text-sm text-gray-500">For privacy and advertising information, see our <Link href="/privacy" className="underline">Privacy Policy</Link> and <Link href="/cookies" className="underline">Cookie Policy</Link>.</p>
        </section>

        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto"><h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our PDF Tools</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/compress-pdf" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all"><h3 className="font-bold text-lg text-gray-900 mb-2">Compress PDF</h3><p className="text-sm text-gray-600">Reduce file size with the PDFilio compression tool.</p></Link>
            <Link href="/merge-pdf" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all"><h3 className="font-bold text-lg text-gray-900 mb-2">Merge PDF</h3><p className="text-sm text-gray-600">Combine multiple PDFs into one document.</p></Link>
            <Link href="/word-to-pdf" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all"><h3 className="font-bold text-lg text-gray-900 mb-2">Word to PDF</h3><p className="text-sm text-gray-600">Convert supported Word documents to PDF.</p></Link>
          </div></div>
        </section>
      </main>
    </div>
  );
}
