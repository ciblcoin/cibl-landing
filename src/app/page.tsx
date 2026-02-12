"use client"; // این خط را در ابتدای فایل اضافه کنید

import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient'; // فایل کلاینت را باید در پوشه services بسازید

// ... بقیه ایمپورت‌ها ...

export default function LandingPage() {
  const [stats, setStats] = useState({ totalPlayers: 0, totalVolume: 0, liveDuels: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      // دریافت تعداد کل بازیکنان
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      
      // دریافت مجموع مبالغ شرط‌بندی شده
      const { data: duels } = await supabase.from('duels').select('amount');
      const volume = duels?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

      setStats({
        totalPlayers: users || 0,
        totalVolume: volume,
        liveDuels: Math.floor(Math.random() * 10) + 2 // شبیه‌سازی دوئل‌های زنده
      });
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // آپدیت هر ۳۰ ثانیه
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      {/* Hero Section ... */}

      {/* Stats Bar */}
      <div className="bg-slate-900/80 border-y border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-white">{stats.totalPlayers}</div>
            <div className="text-slate-500 text-sm uppercase tracking-widest mt-1">Active Degens</div>
          </div>
          <div>
            <div className="text-4xl font-black text-[#FFD700] neon-glow">${stats.totalVolume.toLocaleString()}</div>
            <div className="text-slate-500 text-sm uppercase tracking-widest mt-1">Total Volume</div>
          </div>
          <div>
            <div className="text-4xl font-black text-green-500">{stats.liveDuels}</div>
            <div className="text-slate-500 text-sm uppercase tracking-widest mt-1">Duels Running Now</div>
          </div>
        </div>
      </div>

      {/* Features Grid ... */}
    </main>
  );
}


import React from 'react';
import { Download, Sword, Shield, Zap, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] hero-gradient -z-10" />

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black text-[#FFD700] tracking-tighter">CiBL</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
          <a href="#" className="hover:text-white transition">Whitepaper</a>
        </div>
        <button className="bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-bold border border-slate-700">
          Connect App
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 text-[#FFD700] px-4 py-1 rounded-full text-xs font-bold mb-6">
          LIVE ON SOLANA MAINNET
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
          CHAT. BET. <span className="text-[#FFD700] neon-glow">WIN.</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
          The world's first Social GambleFi wallet. Challenge your friends to 1-minute crypto duels directly inside the chat.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a 
            href="/downloads/cibl-latest.apk" 
            className="flex items-center gap-2 bg-[#FFD700] text-black px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition transform"
            download
          >
            <Download size={24} />
            DOWNLOAD APK
          </a>
          <div className="text-slate-500 text-sm italic">Supports Android 10+</div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Sword className="text-[#FFD700]" />}
          title="1-Min Duels"
          desc="Predict price movements in 60-second high-stakes matches."
        />
        <FeatureCard 
          icon={<Zap className="text-[#FFD700]" />}
          title="Instant Payouts"
          desc="Winnings are sent directly to your Solana wallet by our Smart Contract."
        />
        <FeatureCard 
          icon={<Shield className="text-[#FFD700]" />}
          title="0.6% Low Fees"
          desc="The most competitive fee structure in the GambleFi ecosystem."
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 text-center text-slate-600 text-sm">
        © 2024 CiBL Protocol. Built on Solana.
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-yellow-500/50 transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
