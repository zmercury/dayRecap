'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';

interface FormData {
  petrol?: number;
  diesel?: number;
  fine_gold?: number;
  tejabi_gold?: number;
  index?: number;
  change?: number;
  change_percent?: number;
  title?: string;
  content?: string;
}

export default function AdminPanel() {
  const [message, setMessage] = useState('');

  const updateFuelRates = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from('fuel_rates')
        .upsert({
          petrol: Number(formData.get('petrol')),
          diesel: Number(formData.get('diesel')),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setMessage('Fuel rates updated successfully!');
    } catch (error) {
      setMessage('Error updating fuel rates');
      console.error(error);
    }
  };

  const updateGoldRates = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from('gold_rates')
        .upsert({
          fine_gold: Number(formData.get('fine_gold')),
          tejabi_gold: Number(formData.get('tejabi_gold')),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setMessage('Gold rates updated successfully!');
    } catch (error) {
      setMessage('Error updating gold rates');
      console.error(error);
    }
  };

  const updateNepseData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from('nepse_data')
        .upsert({
          index: Number(formData.get('index')),
          change: Number(formData.get('change')),
          change_percent: Number(formData.get('change_percent')),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setMessage('NEPSE data updated successfully!');
    } catch (error) {
      setMessage('Error updating NEPSE data');
      console.error(error);
    }
  };

  const addNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from('news')
        .insert({
          title: formData.get('title'),
          content: formData.get('content'),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setMessage('News added successfully!');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setMessage('Error adding news');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Fuel Rates Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Update Fuel Rates</h2>
          <form onSubmit={updateFuelRates} className="space-y-4">
            <div>
              <label className="block mb-1">Petrol (Rs./liter)</label>
              <input type="number" name="petrol" step="0.01" required
                className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Diesel (Rs./liter)</label>
              <input type="number" name="diesel" step="0.01" required
                className="w-full p-2 border rounded" />
            </div>
            <button type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Update Fuel Rates
            </button>
          </form>
        </div>

        {/* Gold Rates Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Update Gold Rates</h2>
          <form onSubmit={updateGoldRates} className="space-y-4">
            <div>
              <label className="block mb-1">Fine Gold (Rs./tola)</label>
              <input type="number" name="fine_gold" step="0.01" required
                className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Tejabi Gold (Rs./tola)</label>
              <input type="number" name="tejabi_gold" step="0.01" required
                className="w-full p-2 border rounded" />
            </div>
            <button type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Update Gold Rates
            </button>
          </form>
        </div>

        {/* NEPSE Data Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Update NEPSE Data</h2>
          <form onSubmit={updateNepseData} className="space-y-4">
            <div>
              <label className="block mb-1">Index Points</label>
              <input type="number" name="index" step="0.01" required
                className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Change</label>
              <input type="number" name="change" step="0.01" required
                className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Change Percentage</label>
              <input type="number" name="change_percent" step="0.01" required
                className="w-full p-2 border rounded" />
            </div>
            <button type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Update NEPSE Data
            </button>
          </form>
        </div>

        {/* News Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add News</h2>
          <form onSubmit={addNews} className="space-y-4">
            <div>
              <label className="block mb-1">Title</label>
              <input type="text" name="title" required
                className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Content</label>
              <textarea name="content" required rows={4}
                className="w-full p-2 border rounded" />
            </div>
            <button type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add News
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 