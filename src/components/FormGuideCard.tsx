import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, AlertTriangle, Wind, Clock, ShieldAlert } from 'lucide-react';
import { FormGuide } from '../data/formGuides';

interface FormGuideCardProps {
  guide: FormGuide;
}

export const FormGuideCard: React.FC<FormGuideCardProps> = ({ guide }) => {
  const [activeTab, setActiveTab] = useState<'correct' | 'mistakes'>('correct');

  const isCorrect = activeTab === 'correct';

  return (
    <div
      className={`rounded-2xl transition-all duration-300 p-5 bg-[#0F141C] border ${
        isCorrect
          ? 'border-emerald-500/80 shadow-[0_0_30px_rgba(16,185,129,0.22)]'
          : 'border-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.22)]'
      }`}
    >
      {/* Header and Toggle Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#1E2633]">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isCorrect ? 'bg-emerald-400' : 'bg-red-400'
              }`}
            />
            <h3 className="text-base font-bold text-white tracking-tight">
              Biomechanical Form Analysis
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            YouCan execution cues & injury prevention standards
          </p>
        </div>

        {/* Toggle Pills */}
        <div className="flex items-center p-1 bg-[#141B24] border border-[#232F3E] rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('correct')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isCorrect
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Correct Form</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mistakes')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              !isCorrect
                ? 'bg-red-500 text-white font-bold shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : 'text-slate-400 hover:text-red-400'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Common Mistakes</span>
          </button>
        </div>
      </div>

      {/* Content Area with smooth animation */}
      <AnimatePresence mode="wait">
        {isCorrect ? (
          <motion.div
            key="correct"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Form Cues */}
            <div className="space-y-3">
              {guide.correctForm.keyTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20"
                >
                  <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-emerald-300">
                        {tip.title}
                      </h4>
                      <span className="text-[11px] font-mono text-emerald-400/80 font-medium">
                        Cue: &ldquo;{tip.cue}&rdquo;
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Breathing & Tempo stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#141B24] border border-[#232F3E] flex items-start gap-2.5">
                <Wind className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Breathing Pattern
                  </span>
                  <p className="text-xs text-slate-200 mt-0.5 leading-snug">
                    {guide.correctForm.breathing}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#141B24] border border-[#232F3E] flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Target Tempo
                  </span>
                  <p className="text-xs text-slate-200 mt-0.5 leading-snug">
                    {guide.correctForm.tempo}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="mistakes"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Mistakes List */}
            <div className="space-y-3">
              {guide.commonMistakes.mistakes.map((mistake, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-red-950/20 border border-red-500/20"
                >
                  <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-red-300">
                        {mistake.title}
                      </h4>
                      <span className="text-[11px] font-mono text-red-400/80 font-medium">
                        Fix: {mistake.cue}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {mistake.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Risk Factor and Correction */}
            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-red-300">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Risk Assessment:</span>
                <span className="text-slate-300 font-normal">
                  {guide.commonMistakes.riskFactor}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 pt-1 border-t border-red-500/20">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Immediate Fix:</span>
                <span className="text-slate-200 font-normal">
                  {guide.commonMistakes.correction}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
