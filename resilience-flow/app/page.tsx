'use client';
import React, { useState } from 'react';

export default function ResilienceFlow() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);

  const runGlobalSimulation = () => {
    if (!userInput) return;
    setLoading(true);
    setTimeout(() => {
      const seed = userInput.length;
      setMetrics({
        outfall: `${Math.floor((seed % 15) + 5)} Days`,
        revenue: `-$${(seed * 0.18 + Math.random()).toFixed(1)}M`
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-slate-100 p-8 font-mono">
      <h1 className="text-2xl font-black italic mb-8 border-b border-slate-800 pb-4">
        RESILIENCEFLOW <span className="text-blue-400">V2.0</span>
      </h1>
      <textarea 
        className="w-full bg-[#0a0f1a] border border-slate-800 p-4 rounded-xl mb-4 h-32 outline-none"
        placeholder="Ingest crisis (e.g. Suez Canal blockage)..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={runGlobalSimulation} className="w-full bg-blue-600 py-4 rounded-xl font-bold uppercase mb-10 tracking-widest hover:bg-blue-500">
        {loading ? "Analyzing..." : "Run Global Simulation"}
      </button>

      {metrics && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#1a0f14] border border-red-500/20 p-6 rounded-xl text-center">
            <p className="text-[10px] text-red-400 font-bold uppercase mb-2">Stock Outfall</p>
            <p className="text-4xl font-black">{metrics.outfall}</p>
          </div>
          <div className="bg-[#1a140f] border border-orange-500/20 p-6 rounded-xl text-center">
            <p className="text-[10px] text-orange-400 font-bold uppercase mb-2">Revenue Hit</p>
            <p className="text-4xl font-black">{metrics.revenue}</p>
          </div>
        </div>
      )}
    </div>
  );
}
