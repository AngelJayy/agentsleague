"use client";

import React, { useState } from 'react';
import { Shield, Activity, Globe, Zap, BarChart3, Binary, RefreshCw, Layers, AlertTriangle } from 'lucide-react';

export default function ResilienceFlow() {
  const [telemetry, setTelemetry] = useState('');
  const [loading, setLoading] = useState(false);
  const [reasoningData, setReasoningData] = useState<any>(null);

  const runGlobalSimulation = async () => {
    setLoading(true);
    try {
      // Direct call to your Azure OpenAI / Search backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: telemetry }),
      });
      
      const data = await response.json();
      setReasoningData(data);
    } catch (error) {
      console.error("Simulation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-sans selection:bg-blue-500/30">
      {/* Navigation / Status Bar */}
      <nav className="border-b border-white/5 bg-[#05070a]/80 backdrop-blur-md sticky top-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter uppercase italic">ResilienceFlow <span className="text-blue-500">V2.5</span></h1>
              <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Azure Cognitive Supply Chain Orchestrator</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[9px] font-bold text-blue-400 uppercase tracking-widest">Azure_OpenAI: Active</div>
            <div className="px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Azure_Search: Online</div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        {/* Input: Early Warning Ingestion */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4 text-blue-400">
            <Globe className="w-4 h-4" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500/80">Early Warning Ingestion</h2>
          </div>
          <div className="relative group">
            <textarea 
              value={telemetry}
              onChange={(e) => setTelemetry(e.target.value)}
              placeholder="INPUT TELEMETRY: (e.g., Red Sea conflict escalation, semiconductor factory flooding...)"
              className="w-full h-48 bg-[#0a0f1a] border border-white/10 rounded-xl p-6 text-sm font-mono focus:border-blue-500/50 focus:ring-0 transition-all placeholder:text-gray-700 outline-none"
            />
            <button 
              onClick={runGlobalSimulation}
              disabled={loading || !telemetry}
              className="mt-4 w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold uppercase tracking-[0.3em] text-xs transition-all rounded-lg flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              {loading ? 'Processing Neural Logic...' : 'Run Global Simulation'}
            </button>
          </div>
        </section>

        {/* RESULTS: The 8-Point Reasoning Engine */}
        {reasoningData && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Top Row: Metrics, Heatmap, Monte Carlo, CI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#0a0f1a] border border-blue-500/30 p-6 rounded-xl">
                <h3 className="text-[10px] tracking-widest text-blue-400 uppercase mb-4 flex items-center gap-2">
                  <Shield className="w-3 h-3" /> Resilience Score
                </h3>
                <div className="text-5xl font-bold">{reasoningData.resilience_score}<span className="text-lg text-blue-500">/100</span></div>
                <div className="w-full bg-white/5 h-1.5 mt-4 rounded-full overflow-hidden">
                  <div style={{width: `${reasoningData.resilience_score}%`}} className="bg-blue-500 h-full shadow-[0_0_10px_#3b82f6]"></div>
                </div>
              </div>

              <div className="bg-[#0a0f1a] border border-red-500/30 p-6 rounded-xl">
                <h3 className="text-[10px] tracking-widest text-red-400 uppercase mb-4 flex items-center gap-2">
                   <AlertTriangle className="w-3 h-3" /> Risk Heatmap
                </h3>
                <ul className="space-y-2 text-[11px] text-gray-400 font-mono">
                  {reasoningData.heatmap.map((item: string, i: number) => <li key={i}>[!] {item}</li>)}
                </ul>
              </div>

              <div className="bg-[#0a0f1a] border border-purple-500/30 p-6 rounded-xl">
                <h3 className="text-[10px] tracking-widest text-purple-400 uppercase mb-4">Monte Carlo Simulation</h3>
                <p className="text-[12px] text-gray-400 leading-relaxed italic">"{reasoningData.monte_carlo}"</p>
              </div>

              <div className="bg-[#0a0f1a] border border-emerald-500/30 p-6 rounded-xl flex flex-col justify-between">
                <h3 className="text-[10px] tracking-widest text-emerald-400 uppercase mb-4">95% Confidence Interval</h3>
                <div className="text-xl font-mono text-emerald-400">{reasoningData.confidence_interval}</div>
              </div>
            </div>

            {/* Bottom Row: Deep Technical Reasoning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0a0f1a] border border-white/5 p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BarChart3 className="w-24 h-24" />
                </div>
                <h3 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">Financial & Hardware Pivot</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase mb-2">BOM Recalculation</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{reasoningData.bom_recalculation}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-[10px] text-blue-400 uppercase mb-2 flex items-center gap-2"><Binary className="w-3 h-3" /> Chip Redesign Suggestion</p>
                    <p className="text-xs font-mono text-white leading-relaxed">{reasoningData.chip_redesign}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0f1a] border border-white/5 p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Layers className="w-24 h-24" />
                </div>
                <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">Logistics & Strategy</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase mb-2">Sourcing Reroute Details</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{reasoningData.reroute_sourcing}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase mb-2">Long-Term Reshoring ROI</p>
                    <p className="text-sm text-white font-medium bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20 italic">
                      {reasoningData.reshoring_evaluation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 p-8 text-center">
        <div className="flex justify-center gap-8 text-[10px] text-gray-600 uppercase tracking-[0.4em]">
          <span>Data Moat: Synchronized</span>
          <span>Powered by Azure Cognitive Services</span>
        </div>
      </footer>
    </div>
  );
}
