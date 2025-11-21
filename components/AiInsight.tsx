import React, { useState, useEffect } from 'react';
import { Sparkles, Loader, RefreshCw } from 'lucide-react';
import { generateStudentInsight } from '../services/geminiService';

export const AiInsight: React.FC = () => {
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInsight = async () => {
    setLoading(true);
    // Simulated context data to send to Gemini
    const context = "Total Students: 1234. Attendance Avg: 92% (Up 2%). Math Scores: Stable. English Scores: Down 5%. Grade 10 showing highest truancy.";
    
    const result = await generateStudentInsight(context);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-300 opacity-10 rounded-full -ml-10 -mb-10 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Sparkles className="w-5 h-5 text-accent-300" />
                    </div>
                    <h3 className="font-bold text-lg tracking-wide">Gemini AI Insights</h3>
                </div>
                <button 
                    onClick={fetchInsight} 
                    disabled={loading}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <div className="flex-1 flex items-center">
                {loading ? (
                    <div className="flex items-center gap-2 text-blue-100 animate-pulse">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Analyzing student data trends...</span>
                    </div>
                ) : (
                    <p className="text-blue-50 leading-relaxed font-medium">
                        "{insight}"
                    </p>
                )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-blue-200">
                <span>Based on live metrics</span>
                <span className="bg-white/10 px-2 py-1 rounded text-accent-200 font-semibold">BETA</span>
            </div>
        </div>
    </div>
  );
};