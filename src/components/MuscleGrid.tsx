import React from 'react';
import {
  Flame,
  Shield,
  Maximize2,
  Zap,
  TrendingUp,
  Dumbbell,
  Activity,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { MUSCLE_GROUPS, MuscleGroupInfo } from '../data/muscleGroups';
import { MuscleGroupKey, RawExercise } from '../types/exercise';

interface MuscleGridProps {
  exercises: RawExercise[];
  selectedMuscle: MuscleGroupKey | null;
  onSelectMuscle: (key: MuscleGroupKey) => void;
}

const ICON_COMPONENTS: Record<string, React.ElementType> = {
  Flame,
  Shield,
  Maximize2,
  Zap,
  TrendingUp,
  Dumbbell,
  Activity,
  Compass,
};

export const MuscleGrid: React.FC<MuscleGridProps> = ({
  exercises,
  selectedMuscle,
  onSelectMuscle,
}) => {
  // Compute exercise counts for each muscle group
  const getExerciseCount = (group: MuscleGroupInfo) => {
    const targetMuscles = group.dbMuscles.map((m) => m.toLowerCase());
    return exercises.filter((ex) =>
      ex.primaryMuscles.some((m) => targetMuscles.includes(m.toLowerCase()))
    ).length;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {MUSCLE_GROUPS.map((group) => {
        const Icon = ICON_COMPONENTS[group.iconName] || Dumbbell;
        const count = getExerciseCount(group);
        const isSelected = selectedMuscle === group.key;

        return (
          <div
            key={group.key}
            onClick={() => onSelectMuscle(group.key)}
            className={`group relative p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between border ${
              isSelected
                ? 'bg-[#151D29] border-[#FF334B] shadow-[0_0_24px_rgba(255,51,75,0.3)] ring-1 ring-[#FF334B]'
                : 'bg-[#0F141C] border-[#1E2633] hover:border-[#2C394C] hover:bg-[#131A24] hover:shadow-lg'
            }`}
          >
            {/* Subtle background glow from muscle color */}
            <div
              className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity"
              style={{ backgroundColor: group.colorHex }}
            />

            <div>
              {/* Icon & Count Header */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${group.colorHex}20`,
                    color: group.colorHex,
                    border: `1px solid ${group.colorHex}40`,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span className="text-[11px] font-mono text-slate-400 bg-[#161E28] px-2 py-0.5 rounded-md border border-[#222E3E]">
                  {count} moves
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF334B] transition-colors">
                {group.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1 leading-snug">
                {group.tagline}
              </p>
            </div>

            {/* Bottom Target Muscles & Action Link */}
            <div className="mt-4 pt-3 border-t border-[#1C2533] flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase">
                {group.viewDefault === 'anterior' ? 'Anterior' : 'Posterior'}
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF334B]" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
