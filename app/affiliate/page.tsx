'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import { TrendingUp, DollarSign, BarChart3, Users, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AffiliateProgram() {
  const [selectedPeriod, setSelectedPeriod] = useState<'30d' | '90d' | 'all'>('30d');

  const stats = [
    { label: 'Total Commission Earned', value: '$0', icon: DollarSign },
    { label: 'Active Sales', value: '0', icon: TrendingUp },
    { label: 'Total Referrals', value: '0', icon: Users },
  ];

  const commissionRates = [
    { plan: 'Starter - $29/month', commission: '20%', amount: '$5.80' },
    { plan: 'Professional - $99/month', commission: '25%', amount: '$24.75' },
    { plan: 'Enterprise - Custom', commission: '30%', amount: 'Custom' }
  ];

  const sampleSales: Array<{ date: string; sales: number; commission: number }> = [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSelectTool={() => {}} onNavigateBlog={() => {}} />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="w-16 h-16 text-red-600" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Affiliate Program
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Earn recurring commissions by promoting PDFilio. Get 20-30% commission on every subscription sale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Apply Now
              </button>
              <button className="px-8 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                Download Resources
              </button>
            </div>
          </div>
        </section>

        {/* Commission Stats */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 text-center">
                  <Icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-4xl font-black text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Commission Rates */}
        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Competitive Commission Rates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {commissionRates.map((rate, index) => (
                <div key={index} className="bg-white rounded-xl p-8 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{rate.plan}</h3>
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-2">Commission Rate</p>
                    <p className="text-4xl font-black text-red-600">{rate.commission}</p>
                  </div>
                  <p className="text-gray-600 border-t border-gray-200 pt-4 mt-4">
                    Per sale: <span className="font-bold text-gray-900">{rate.amount}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Join */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Join Our Affiliate Program?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Recurring Commissions',
                description: 'Earn commissions every month as long as your referred customers remain active. Passive income at its best.'
              },
              {
                title: 'High Commission Rates',
                description: 'Earn 20-30% per sale, one of the highest rates in the industry. More sales = higher earning potential.'
              },
              {
                title: 'Premium Product',
                description: 'Promote a trusted, industry-leading PDF solution used by millions. Easy to recommend to your audience.'
              },
              {
                title: 'Marketing Materials',
                description: 'Get access to banners, landing pages, social media templates, and more to help you promote effectively.'
              },
              {
                title: 'Real-time Dashboard',
                description: 'Track your clicks, conversions, and earnings in real-time with our detailed analytics dashboard.'
              },
              {
                title: 'Dedicated Support',
                description: 'Our affiliate managers are here to help. Get personalized support and optimization strategies.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Marketing Materials */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 px-4 sm:px-6 lg:px-8 py-20 border-t-2 border-red-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Marketing Materials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Banner Ads',
                  description: '10+ professionally designed banners in various sizes (300x250, 728x90, 970x90)',
                  icon: Download
                },
                {
                  title: 'Social Media Templates',
                  description: 'Ready-to-use Instagram, Facebook, and LinkedIn post templates to promote PDFilio',
                  icon: TrendingUp
                },
                {
                  title: 'Email Templates',
                  description: 'Pre-written email templates you can customize and send to your audience',
                  icon: Users
                },
                {
                  title: 'Landing Pages',
                  description: 'Pre-built landing pages optimized for conversions that you can customize',
                  icon: BarChart3
                }
              ].map((material, index) => {
                const Icon = material.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-8 border border-gray-200">
                    <Icon className="w-12 h-12 text-red-600 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{material.title}</h3>
                    <p className="text-gray-600 mb-6">{material.description}</p>
                    <button className="text-red-600 font-semibold hover:text-red-700 transition-colors flex items-center gap-2">
                      Download <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sales Dashboard */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Your Sales (Last {selectedPeriod === '30d' ? '30 Days' : selectedPeriod === '90d' ? '90 Days' : 'All Time'})
          </h2>

          <div className="flex justify-center gap-4 mb-8">
            {['30d', '90d', 'all'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period as '30d' | '90d' | 'all')}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  selectedPeriod === period
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {period === '30d' ? 'Last 30 Days' : period === '90d' ? 'Last 90 Days' : 'All Time'}
              </button>
            ))}
          </div>

          {sampleSales.length === 0 ? (
            <div className="text-center bg-gray-50 rounded-xl p-12 border border-gray-200">
              <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-6">
                No sales yet. Start promoting your affiliate link to earn commissions!
              </p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Get Your Affiliate Link
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sampleSales.map((sale: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{sale.customer}</p>
                    <p className="text-gray-600 text-sm">{sale.plan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-bold">+${sale.commission}</p>
                    <p className="text-gray-600 text-sm">{sale.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Sign Up', description: 'Apply to become an affiliate and get approved in 24 hours' },
                { step: '2', title: 'Get Your Link', description: 'Receive your unique affiliate link and tracking ID' },
                { step: '3', title: 'Promote', description: 'Share your link on your website, blog, social media, or email' },
                { step: '4', title: 'Earn', description: 'Get 20-30% commission on every sale your link generates' }
              ].map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to earn?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our affiliate program today and start earning recurring commissions.
          </p>
          <button className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Apply to Affiliate Program
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>
      </main>
    </div>
  );
}
