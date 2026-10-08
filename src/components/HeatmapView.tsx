import React, { useState, useMemo } from 'react';
import { Muscle, MUSCLE_METADATA } from '../data/muscleMap';
import {
  Flame,
  Activity,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { WorkoutDayPlan } from '../types/exercise';
import { FREE_DB_TO_HIGHLIGHTER_MAP } from '../data/muscleGroups';
import { BodyVisualizer } from './BodyVisualizer';

interface HeatmapViewProps {
  plans: WorkoutDayPlan[];
  activePlanId: string;
  onSelectPlanId: (id: string) => void;
  onGoToBuilder: () => void;
  onSelectExercise: (exerciseId: string) => void;
}

interface MuscleActivationStat {
  muscle: Muscle;
  totalScore: number;
  intensity: number; // 1 to 5
  exercises: { name: string; sets: number; isPrimary: boolean }[];
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({
  plans,
  activePlanId,
  onSelectPlanId,
  onGoToBuilder,
}) => {
  const currentPlan = plans.find((p) => p.id === activePlanId) || plans[0];
  const [selectedMuscleStat, setSelectedMuscleStat] = useState<MuscleActivationStat | null>(null);

  // Compute muscle activation aggregation
  const heatmapStats = useMemo(() => {
    if (!currentPlan || currentPlan.items.length === 0) return [];

    const muscleScoreMap: Record<
      string,
      {
        totalScore: number;
        exercises: { name: string; sets: number; isPrimary: boolean }[];
      }
    > = {};

    currentPlan.items.forEach((item) => {
      const setsCount = item.sets?.length || 3;
      const ex = item.exercise;

      // Primary muscles: 2 points per set
      (ex.primaryMuscles || []).forEach((pm) => {
        const highlighterMuscles = FREE_DB_TO_HIGHLIGHTER_MAP[pm.toLowerCase()] || [];
        highlighterMuscles.forEach((hm) => {
          if (!muscleScoreMap[hm]) {
            muscleScoreMap[hm] = { totalScore: 0, exercises: [] };
          }
          muscleScoreMap[hm].totalScore += setsCount * 2;
          muscleScoreMap[hm].exercises.push({
            name: ex.name,
            sets: setsCount,
            isPrimary: true,
          });
        });
      });

      // Secondary muscles: 1 point per set
      (ex.secondaryMuscles || []).forEach((sm) => {
        const highlighterMuscles = FREE_DB_TO_HIGHLIGHTER_MAP[sm.toLowerCase()] || [];
        highlighterMuscles.forEach((hm) => {
          if (!muscleScoreMap[hm]) {
            muscleScoreMap[hm] = { totalScore: 0, exercises: [] };
          }
          muscleScoreMap[hm].totalScore += setsCount * 1;
          muscleScoreMap[hm].exercises.push({
            name: ex.name,
            sets: setsCount,
            isPrimary: false,
          });
        });
      });
    });

    // Find maximum score to normalize to 1..5 scale
    const rawScores = Object.values(muscleScoreMap).map((v) => v.totalScore);
    const maxScore = rawScores.length > 0 ? Math.max(...rawScores, 1) : 1;

    const stats: MuscleActivationStat[] = Object.entries(muscleScoreMap).map(([muscle, val]) => {
      // Normalize score into 1 to 5
      const ratio = val.totalScore / maxScore;
      let intensity = 1;
      if (ratio > 0.8) intensity = 5;
      else if (ratio > 0.6) intensity = 4;
      else if (ratio > 0.35) intensity = 3;
      else if (ratio > 0.15) intensity = 2;
      else intensity = 1;

      return {
        muscle: muscle as Muscle,
        totalScore: val.totalScore,
        intensity,
        exercises: val.exercises,
      };
    });

    // Sort descending by total score
    stats.sort((a, b) => b.totalScore - a.totalScore);
    return stats;
  }, [currentPlan]);

  // Transform for BodyVisualizer
  const visualizerHeatmapData = useMemo(() => {
    return heatmapStats.map((stat) => ({
      muscle: stat.muscle,
      intensity: stat.intensity,
      exerciseCount: stat.exercises.length,
      exercises: stat.exercises.map((e) => e.name),
    }));
  }, [heatmapStats]);

  // Overall workout statistics
  const totalSets = useMemo(() => {
    return currentPlan?.items.reduce((acc, it) => acc + (it.sets?.length || 0), 0) || 0;
  }, [currentPlan]);

  const totalExercises = currentPlan?.items.length || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 space-y-6">
      {/* Header and Plan Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E2633]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF334B] shadow-[0_0_10px_#FF334B]" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Full Body Muscle Heatmap
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Volumetric workload & biomechanical strain across your current routine
          </p>
        </div>

        {/* Plan Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {plans.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                onSelectPlanId(p.id);
                setSelectedMuscleStat(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border ${
                p.id === currentPlan?.id
                  ? 'bg-[#FF334B] border-[#FF334B] text-white shadow-[0_0_15px_rgba(255,51,75,0.35)]'
                  : 'bg-[#121822] border-[#222E3E] text-slate-400 hover:text-white hover:border-slate-500'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {currentPlan && currentPlan.items.length > 0 ? (
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#0F141C] border border-[#1E2633]">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Total Movements
              </span>
              <p className="text-xl font-bold text-white mt-1 font-mono">
                {totalExercises} exercises
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F141C] border border-[#1E2633]">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Session Volume
              </span>
              <p className="text-xl font-bold text-[#FF334B] mt-1 font-mono">
                {totalSets} working sets
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F141C] border border-[#1E2633]">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Targeted Muscle Groups
              </span>
              <p className="text-xl font-bold text-emerald-400 mt-1 font-mono">
                {heatmapStats.length} zones
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F141C] border border-[#1E2633] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Routine Status
                </span>
                <p className="text-sm font-semibold text-cyan-400 mt-1">
                  Ready to Train
                </p>
              </div>
              <button
                type="button"
                onClick={onGoToBuilder}
                className="px-2.5 py-1.5 rounded-lg bg-[#192433] hover:bg-[#25364C] text-slate-200 text-xs font-medium transition cursor-pointer flex items-center gap-1"
              >
                <span>Edit</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Main Grid: Body Model Heatmap on Left; Muscle Breakdown on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visualizer Models (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-[#0F141C] border border-[#1E2633] shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2633] mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#FF334B]" />
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Dual Anatomical Heatmap
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Front & Back Projection
                  </span>
                </div>

                {/* Heatmap Legend */}
                <div className="p-3 rounded-xl bg-[#141B24] border border-[#232F3E] mb-4">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Activation Intensity Scale
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-semibold">
                    <div className="py-1 rounded bg-[#06B6D4]/25 text-[#06B6D4] border border-[#06B6D4]/40">
                      Tier 1: Light
                    </div>
                    <div className="py-1 rounded bg-[#10B981]/25 text-[#10B981] border border-[#10B981]/40">
                      Tier 2: Mod
                    </div>
                    <div className="py-1 rounded bg-[#F59E0B]/25 text-[#F59E0B] border border-[#F59E0B]/40">
                      Tier 3: Core
                    </div>
                    <div className="py-1 rounded bg-[#FB923C]/25 text-[#FB923C] border border-[#FB923C]/40">
                      Tier 4: Heavy
                    </div>
                    <div className="py-1 rounded bg-[#FF334B]/25 text-[#FF334B] border border-[#FF334B]/40">
                      Tier 5: Peak
                    </div>
                  </div>
                </div>

                {/* Body Visualizer with Dual View Side by Side */}
                <BodyVisualizer
                  heatmapData={visualizerHeatmapData}
                  showDualView={true}
                  height={340}
                />
              </div>
            </div>

            {/* Muscle Breakdown & Exercise Contributor List (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-[#0F141C] border border-[#1E2633] space-y-4 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Muscle Load Ranking
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {heatmapStats.length} loaded
                  </span>
                </div>

                <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                  {heatmapStats.map((stat) => {
                    const isSelected = selectedMuscleStat?.muscle === stat.muscle;
                    return (
                      <div
                        key={stat.muscle}
                        onClick={() =>
                          setSelectedMuscleStat(isSelected ? null : stat)
                        }
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#182333] border-[#FF334B] ring-1 ring-[#FF334B]'
                            : 'bg-[#141B24] border-[#222E3E] hover:border-slate-500 hover:bg-[#18202B]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  stat.intensity === 5
                                    ? '#FF334B'
                                    : stat.intensity === 4
                                    ? '#FB923C'
                                    : stat.intensity === 3
                                    ? '#F59E0B'
                                    : stat.intensity === 2
                                    ? '#10B981'
                                    : '#06B6D4',
                              }}
                            />
                            <div>
                              <h4 className="text-sm font-semibold text-white">
                                {MUSCLE_METADATA[stat.muscle as Muscle]?.name || stat.muscle}
                              </h4>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {MUSCLE_METADATA[stat.muscle as Muscle]?.anatomicalName || ''}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="text-slate-400">
                              {stat.exercises.length} moves
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-[#202C3D] text-[#FF334B] font-bold">
                              Lvl {stat.intensity}
                            </span>
                          </div>
                        </div>

                        {/* Contributor exercises dropdown when clicked */}
                        {isSelected && (
                          <div className="mt-3 pt-2.5 border-t border-[#222E3E] space-y-1.5 text-xs">
                            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                              Contributing Exercises:
                            </span>
                            {stat.exercises.map((ex, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between text-slate-300 py-0.5"
                              >
                                <span className="flex items-center gap-1.5">
                                  <CheckCircle className="w-3 h-3 text-[#FF334B]" />
                                  <span className="truncate max-w-[200px]">{ex.name}</span>
                                </span>
                                <span className="font-mono text-slate-400">
                                  {ex.sets} sets {ex.isPrimary ? '(primary)' : '(assisting)'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-[#121822] border border-[#1E2633] text-xs text-slate-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Tap any muscle card above to view which exercises and sets are driving that muscle&apos;s training volume.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#0F141C] border border-[#1E2633] space-y-4">
          <Layers className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Exercises in this Routine</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Add exercises from the library or load a preset plan to generate your muscle activation heatmap.
          </p>
          <button
            type="button"
            onClick={onGoToBuilder}
            className="px-5 py-2.5 rounded-xl bg-[#FF334B] text-white font-bold text-sm shadow-[0_0_15px_rgba(255,51,75,0.4)] hover:bg-[#e0263e] transition cursor-pointer"
          >
            Open Workout Builder
          </button>
        </div>
      )}
    </div>
  );
};
