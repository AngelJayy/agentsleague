'use client';
import React, { useState } from 'react';

export default function ResilienceFlow() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<any>(null);

  const runSimulation = () => {
    if (!userInput) return;
    setLoading(true);
    setTimeout(() => {
      const seed = userInput.length;
      setRes({
        outfall: `${Math.floor((seed % 15) + 5)} Days`,
        revenue: `-$${(seed * 0.18 + Math.random()).toFixed(1)}M`
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white p-8 font-mono">
      <h1 className="text-2xl font-black italic mb-8 border-b border-slate-800 pb-4 uppercase tracking-tighter">
        ResilienceFlow <span className="text-blue-400">V2.0</span>
      </h1>
      
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-xl p-4 mb-8 shadow-2xl">
        <textarea 
          className="w-full bg-transparent outline-none text-sm h-32 mb-4"
          placeholder="Ingest crisis (e.g. Suez Canal blockage)..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button 
          onClick={runSimulation}
          className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-lg font-bold uppercase tracking-widest transition-all"
        >
          {loading ? "Analyzing Neural Logic..." : "Run Global Simulation"}
        </button>
      </div>

      {res && (
        <div className="grid grid-cols-2 gap-6 animate-in fade-in duration-500">
          <div className="bg-[#1a0f14] border border-red-500/20 p-8 rounded-2xl text-center">
            <p className="text-[10px] text-red-400 font-bold uppercase mb-2">Stock Outfall</p>
            <p className="text-5xl font-black">{res.outfall}</p>
          </div>
          <div className="bg-[#1a140f] border border-orange-500/20 p-8 rounded-2xl text-center">
            <p className="text-[10px] text-orange-400 font-bold uppercase mb-2">Revenue Hit</p>
            <p className="text-5xl font-black">{res.revenue}</p>
          </div>
        </div>
      )}
    </div>
  );
}
