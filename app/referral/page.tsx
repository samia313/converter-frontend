'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import { Copy, Share2, Users, Gift, TrendingUp, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ReferralPage() {
  const [referralCode] = useState('REF_USER_' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [copied, setCopied] = useState(false);
  const [referralLink] = useState(`https://pdfilio.com?ref=${referralCode}`);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Total Referrals', value: '0', icon: Users },
    { label: 'Credits Earned', value: '0', icon: Gift },
    { label: 'Active Referrals', value: '0', icon: TrendingUp },
  ];

  const referrals: Array<{ date: string; name: string; commission: number }> = [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSelectTool={() => {}} onNavigateBlog={() => {}} />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Gift className="w-16 h-16 text-red-600" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Earn Credits by Referring Friends
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get rewards when your friends sign up and use PDFilio. The more friends you refer, the more you earn!
            </p>
          </div>
        </section>

        {/* Referral Stats */}
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

        {/* Share Referral Code Section */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 px-4 sm:px-6 lg:px-8 py-20 border-t-2 border-red-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Share Your Referral Code
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Referral Code */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Referral Code</h3>
                <div className="flex items-center gap-2 mb-6">
                  <code className="flex-1 bg-gray-100 px-4 py-3 rounded-lg text-gray-900 font-mono font-bold">
                    {referralCode}
                  </code>
                  <button
                    onClick={handleCopyCode}
                    className={`p-3 rounded-lg transition-colors ${
                      copied
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm">
                  Share this code with friends. They get 10% off their first month, and you get 500 credits!
                </p>
              </div>

              {/* Referral Link */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Referral Link</h3>
                <div className="flex items-center gap-2 mb-6">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 bg-gray-100 px-4 py-3 rounded-lg text-gray-600 font-mono text-sm overflow-x-auto"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`p-3 rounded-lg transition-colors flex-shrink-0 ${
                      copied
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm">
                  Share this link directly with friends. One click and they're ready to use PDFilio!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How Referrals Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Share Code', description: 'Send your referral code to friends via email, social media, or messaging' },
              { step: '2', title: 'Friends Sign Up', description: 'Your friends use your code and get 10% off their first month' },
              { step: '3', title: 'Activate Account', description: 'Once they activate their account, you receive 500 credits' },
              { step: '4', title: 'Use Your Credits', description: 'Use credits to upgrade your account or purchase premium features' }
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
        </section>

        {/* Share via Email */}
        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Mail className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Invite Friends via Email
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your friends' email addresses and we'll send them your referral link automatically.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="friend@example.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Invite
              </button>
            </form>
          </div>
        </section>

        {/* Referrals List */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Your Referrals
          </h2>
          {referrals.length === 0 ? (
            <div className="text-center bg-gray-50 rounded-xl p-12 border border-gray-200">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-6">
                You haven't made any referrals yet. Start sharing your code to earn credits!
              </p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Copy Referral Code
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.map((referral: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{referral.name}</p>
                    <p className="text-gray-600 text-sm">{referral.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-bold">+500 credits</p>
                    <p className="text-gray-600 text-sm">{referral.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Rewards Tier */}
        <section className="bg-gradient-to-r from-red-50 to-orange-50 px-4 sm:px-6 lg:px-8 py-20 border-t-2 border-red-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Rewards Tiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { tier: 'Bronze', referrals: '1-5', bonus: '5% bonus credits', color: 'from-yellow-100 to-orange-100' },
                { tier: 'Silver', referrals: '6-15', bonus: '10% bonus credits', color: 'from-gray-100 to-blue-100' },
                { tier: 'Gold', referrals: '16+', bonus: '20% bonus credits', color: 'from-yellow-100 to-yellow-200' }
              ].map((tier, index) => (
                <div key={index} className={`bg-gradient-to-br ${tier.color} rounded-xl p-8 border border-gray-200 text-center`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.tier}</h3>
                  <p className="text-gray-600 mb-4">{tier.referrals} Referrals</p>
                  <p className="text-lg font-bold text-red-600">{tier.bonus}</p>
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
            Start sharing your referral code today and watch the credits roll in!
          </p>
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Copy & Share Referral Code
          </button>
        </section>
      </main>
    </div>
  );
}
