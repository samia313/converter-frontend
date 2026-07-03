'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import { Mail, MessageSquare, HelpCircle, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactOptions = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      value: 'support@pdfilio.com'
    },
    {
      icon: Phone,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      value: 'Available 24/7'
    },
    {
      icon: MessageSquare,
      title: 'Support Ticket',
      description: 'Track your support requests with ticket ID',
      value: 'Submit Below'
    }
  ];

  const faqs = [
    {
      question: 'How long are my files stored?',
      answer: 'All files are automatically deleted after 1 hour of processing. We do not retain any files on our servers.'
    },
    {
      question: 'Is PDFilio secure?',
      answer: 'Yes, PDFilio uses military-grade 256-bit AES encryption to protect your files. We are GDPR compliant and do not share data with third parties.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No, PDFilio is completely free and does not require registration. You can start using our tools immediately.'
    },
    {
      question: 'What file formats do you support?',
      answer: 'We support PDF, Word, Excel, PowerPoint, JPG, PNG, HTML, and many other formats. Check our tools page for complete list.'
    },
    {
      question: 'Can I use PDFilio offline?',
      answer: 'PDFilio is a web-based service and requires an internet connection. However, we offer a Chrome Extension for enhanced functionality.'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Free users can process files up to 50MB. Premium users can process files up to 500MB. Contact support for enterprise plans.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSelectTool={() => {}} onNavigateBlog={() => {}} />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or need support? Our team is here to help. Get in touch with us through any of these channels.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 text-center">
                  <Icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <p className="text-lg font-semibold text-red-600">{option.value}</p>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-semibold">Thank you for your message! We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <HelpCircle className="w-8 h-8 text-red-600" />
              <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-red-300 transition-colors">
                  <summary className="flex items-center justify-between font-semibold text-gray-900 select-none">
                    <span>{faq.question}</span>
                    <span className="text-red-600">+</span>
                  </summary>
                  <p className="text-gray-600 mt-4">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Live Chat Widget Placeholder */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Live Chat Support
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Click the chat icon in the bottom right corner to start a live conversation with our support team. Available 24/7.
          </p>
          <div className="inline-block bg-red-100 border-2 border-red-600 rounded-lg p-8">
            <MessageSquare className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <p className="text-red-600 font-semibold">Live Chat Widget Coming Soon</p>
          </div>
        </section>
      </main>
    </div>
  );
}
