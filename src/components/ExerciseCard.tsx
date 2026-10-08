import React, { useState } from 'react';
import { Plus, Check, ChevronRight, Dumbbell } from 'lucide-react';
import { RawExercise } from '../types/exercise';
import { getExerciseImageUrl } from '../services/exerciseService';

interface ExerciseCardProps {
  exercise: RawExercise;
  onSelect: (exercise: RawExercise) => void;
  onQuickAdd?: (exercise: RawExercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onSelect,
  onQuickAdd,
}) => {
  const [imageError, setImageError] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const firstImage = exercise.images && exercise.images.length > 0 ? exercise.images[0] : null;
  const primaryMuscle = exercise.primaryMuscles[0] || 'General';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(exercise);
      setAddedAnim(true);
      setTimeout(() => setAddedAnim(false), 1600);
    }
  };

  return (
    <div
      onClick={() => onSelect(exercise)}
      className="group relative rounded-2xl bg-[#0F141C] border border-[#1E2633] hover:border-[#FF334B]/60 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col hover:shadow-[0_4px_24px_rgba(255,51,75,0.14)]"
    >
      {/* Exercise Image Thumbnail */}
      <div className="relative aspect-[16/10] w-full bg-[#080B0F] overflow-hidden flex items-center justify-center">
        {firstImage && !imageError ? (
          <img
            src={getExerciseImageUrl(firstImage)}
            alt={exercise.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 gap-1.5 p-4 text-center">
            <Dumbbell className="w-8 h-8 opacity-40 text-slate-400" />
            <span className="text-[11px] font-mono text-slate-400">Illustration Preview</span>
          </div>
        )}

        {/* Level badge */}
        {exercise.level && (
          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-[#0B0F14]/85 border border-[#232F3E] text-[10px] font-mono uppercase tracking-wider text-cyan-300 backdrop-blur-sm">
            {exercise.level}
          </div>
        )}

        {/* Quick Add Button */}
        {onQuickAdd && (
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
              addedAnim
                ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : 'bg-[#0B0F14]/80 border-[#232F3E] text-slate-200 hover:text-white hover:bg-[#FF334B] hover:border-[#FF334B] hover:shadow-[0_0_12px_rgba(255,51,75,0.4)]'
            }`}
            title="Quick add to current workout plan"
          >
            {addedAnim ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Primary Muscle & Category unboxed metadata */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span className="text-[#FF334B] font-semibold capitalize">{primaryMuscle}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="capitalize text-slate-400">{exercise.equipment || 'Body only'}</span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#FF334B] transition-colors line-clamp-1 mt-1">
            {exercise.name}
          </h3>
        </div>

        {/* Footer info: Secondary muscles or mechanic */}
        <div className="flex items-center justify-between pt-2 border-t border-[#19222E] text-xs text-slate-400">
          <span className="truncate max-w-[170px] text-[11px]">
            {exercise.secondaryMuscles.length > 0
              ? `Assists: ${exercise.secondaryMuscles.slice(0, 2).join(', ')}`
              : (exercise.mechanic ? `Type: ${exercise.mechanic}` : 'Precision targeting')}
          </span>
          <span className="flex items-center gap-0.5 text-xs font-semibold text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-transform">
            <span>Guide</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
