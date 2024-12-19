'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { InfoCard } from '@/components/InfoCard';
import { Fuel, Coins, TrendingUp } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { FuelRate, GoldRate, NepseData, News } from '@/types/database';

export default function Home() {
  const [fuelRates, setFuelRates] = useState<FuelRate | null>(null);
  const [goldRates, setGoldRates] = useState<GoldRate | null>(null);
  const [nepseData, setNepseData] = useState<NepseData | null>(null);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch fuel rates
      const { data: fuelData } = await supabase
        .from('fuel_rates')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      setFuelRates(fuelData);

      // Fetch gold rates
      const { data: goldData } = await supabase
        .from('gold_rates')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      setGoldRates(goldData);

      // Fetch NEPSE data
      const { data: nepseData } = await supabase
        .from('nepse_data')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      setNepseData(nepseData);

      // Fetch news
      const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (newsData) setNews(newsData);
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Nepal Day Recap</h1>
        <p className="text-gray-600">Your daily update on what&apos;s happening in Nepal</p>
      </motion.div>

      {/* Info Tiles Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Quick Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard 
            title="Fuel Rates" 
            subtitle="Current prices per liter"
            icon={<Fuel className="w-5 h-5" />}
            stats={[
              { label: 'Petrol', value: fuelRates?.petrol || 0, total: 200 },
              { label: 'Diesel', value: fuelRates?.diesel || 0, total: 200 }
            ]}
          />

          <InfoCard 
            title="Gold Rate" 
            subtitle="Price per tola"
            icon={<Coins className="w-5 h-5" />}
            stats={[
              { label: 'Fine Gold', value: goldRates?.fine_gold || 0, total: 150000 },
              { label: 'Tejabi Gold', value: goldRates?.tejabi_gold || 0, total: 150000 }
            ]}
          />

          <InfoCard 
            title="NEPSE" 
            subtitle="Market overview"
            icon={<TrendingUp className="w-5 h-5" />}
            mainStat={nepseData?.index?.toFixed(2)}
            stats={[
              { 
                label: 'Change', 
                value: nepseData?.change_percent || 0,
                total: 100
              }
            ]}
          />
        </div>
      </section>

      {/* News Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Today&apos;s Highlights</h2>
        <div className="space-y-6">
          {news.length > 0 ? (
            news.map((item) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose max-w-none bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </motion.article>
            ))
          ) : (
            <p className="text-gray-600">No news updates yet. Check back later!</p>
          )}
        </div>
      </section>
    </div>
  );
} 