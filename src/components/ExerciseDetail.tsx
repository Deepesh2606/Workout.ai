import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Plus,
  Dumbbell,
  Layers,
  Sparkles,
  Check,
  Flame,
  Info,
} from 'lucide-react';
import { RawExercise, WorkoutDayPlan } from '../types/exercise';
import { getExerciseImageUrl } from '../services/exerciseService';
import { getExerciseFormGuide } from '../data/formGuides';
import { BodyVisualizer } from './BodyVisualizer';
import { FormGuideCard } from './FormGuideCard';

interface ExerciseDetailProps {
  exercise: RawExercise;
  onBack: () => void;
  backLabel?: string;
  workoutPlans: WorkoutDayPlan[];
  activePlanId: string;
  onAddExerciseToPlan: (planId: string, exercise: RawExercise, sets: number, reps: number) => void;
  onOpenMuscleGroup?: (muscle: string) => void;
}

export const ExerciseDetail: React.FC<ExerciseDetailProps> = ({
  exercise,
  onBack,
  backLabel,
  workoutPlans,
  activePlanId,
  onAddExerciseToPlan,
}) => {
  // Slideshow state
  const images = exercise.images && exercise.images.length > 0 ? exercise.images : [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Workout add state
  const [selectedPlanId, setSelectedPlanId] = useState(activePlanId || workoutPlans[0]?.id || '');
  const [setsCount, setSetsCount] = useState(3);
  const [repsCount, setRepsCount] = useState(10);
  const [addedToast, setAddedToast] = useState(false);

  // Sync selectedPlanId with activePlanId when it changes
  useEffect(() => {
    if (activePlanId) {
      setSelectedPlanId(activePlanId);
    }
  }, [activePlanId]);

  // Auto-looping slideshow
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 1400);

    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const formGuide = getExerciseFormGuide(exercise);

  const handleAddToPlan = () => {
    if (!selectedPlanId) return;
    onAddExerciseToPlan(selectedPlanId, exercise, setsCount, repsCount);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const currentPlan = workoutPlans.find((p) => p.id === selectedPlanId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="max-w-5xl mx-auto px-4 py-4 sm:py-6 space-y-6"
    >
      {/* Top Bar with Back Button & Title */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141B24] border border-[#232F3E] text-slate-300 hover:text-white hover:border-slate-500 transition-colors text-sm font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel || 'Back to Library'}</span>
        </button>

        <div className="flex items-center gap-2">
          {exercise.level && (
            <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#16202E] border border-[#26374D] text-cyan-400">
              {exercise.level}
            </span>
          )}
          {exercise.equipment && (
            <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#1C182A] border border-[#372852] text-fuchsia-400">
              {exercise.equipment}
            </span>
          )}
        </div>
      </div>

      {/* Main Hero Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {exercise.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-slate-400">
          <span className="text-slate-300 font-medium capitalize">
            {exercise.category || 'Strength'}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Targeting: <strong className="text-[#FF334B]">{exercise.primaryMuscles.join(', ')}</strong></span>
          {exercise.secondaryMuscles.length > 0 && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Assisted by: <strong className="text-[#FB923C]">{exercise.secondaryMuscles.join(', ')}</strong></span>
            </>
          )}
        </div>
      </div>

      {/* Grid: Left = Slideshow & Instructions; Right = Body Model & Add to Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Looping Image Slideshow */}
          <div className="relative rounded-2xl bg-[#0F141C] border border-[#1E2633] overflow-hidden group shadow-lg">
            <div className="relative aspect-[4/3] w-full bg-[#080B0F] flex items-center justify-center overflow-hidden">
              {images.length > 0 ? (
                <img
                  key={currentImageIndex}
                  src={getExerciseImageUrl(images[currentImageIndex])}
                  alt={`${exercise.name} position ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                  loading="eager"
                />
              ) : (
                <div className="text-slate-500 text-sm flex flex-col items-center gap-2">
                  <Dumbbell className="w-8 h-8 opacity-40" />
                  <span>No visual diagram available</span>
                </div>
              )}

              {/* Movement Phase Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B0F14]/85 border border-[#232F3E] text-xs font-mono text-slate-200 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FF334B] animate-pulse" />
                <span>
                  {currentImageIndex === 0
                    ? 'Phase 1: Starting Position'
                    : 'Phase 2: Peak Contraction'}
                </span>
              </div>

              {/* Controls Overlay at Bottom */}
              {images.length > 1 && (
                <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between px-3 py-2 rounded-xl bg-[#0B0F14]/80 border border-[#1E2633] backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg bg-[#19212D] text-slate-200 hover:text-white hover:bg-[#222E3E] transition cursor-pointer"
                      title={isPlaying ? 'Pause auto-loop' : 'Play auto-loop'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="p-1.5 rounded-lg bg-[#19212D] text-slate-200 hover:text-white hover:bg-[#222E3E] transition cursor-pointer"
                      title="Previous frame"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentImageIndex((prev) => (prev + 1) % images.length)
                      }
                      className="p-1.5 rounded-lg bg-[#19212D] text-slate-200 hover:text-white hover:bg-[#222E3E] transition cursor-pointer"
                      title="Next frame"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Frame Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCurrentImageIndex(idx);
                          setIsPlaying(false);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          currentImageIndex === idx
                            ? 'w-6 bg-[#FF334B]'
                            : 'w-2 bg-slate-600 hover:bg-slate-400'
                        }`}
                        aria-label={`Frame ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Guide Card: Iconic YouCan Red / Green Glow Toggle */}
          <FormGuideCard guide={formGuide} />

          {/* Step-by-Step Instructions */}
          <div className="p-5 rounded-2xl bg-[#0F141C] border border-[#1E2633] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Step-by-Step Execution
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {exercise.instructions.length} steps
              </span>
            </div>

            <ol className="space-y-3">
              {exercise.instructions.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#141B24]/70 border border-[#1E2837]"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#1D2736] border border-[#2A374A] text-slate-200 text-xs font-mono font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right Column (5 cols): Body Visualizer + Workout Planner Add */}
        <div className="lg:col-span-5 space-y-6">
          {/* Muscle Anatomy Diagram Card */}
          <div className="p-5 rounded-2xl bg-[#0F141C] border border-[#1E2633] space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FF334B]" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Target Muscle Heatmap
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                react-body-highlighter
              </span>
            </div>

            {/* Muscle Color Legend */}
            <div className="flex flex-wrap items-center gap-3 p-2.5 rounded-xl bg-[#141B24] border border-[#232F3E] text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF334B] shadow-[0_0_8px_#FF334B]" />
                <span className="font-medium text-slate-200">
                  Primary: {exercise.primaryMuscles.join(', ')}
                </span>
              </div>
              {exercise.secondaryMuscles.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FB923C] shadow-[0_0_8px_#FB923C]" />
                  <span className="font-medium text-slate-300">
                    Secondary: {exercise.secondaryMuscles.join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Body Diagram Model */}
            <BodyVisualizer
              primaryMuscles={exercise.primaryMuscles}
              secondaryMuscles={exercise.secondaryMuscles}
              height={380}
            />

            <div className="flex items-center gap-2 text-[11px] text-slate-400 p-2.5 rounded-lg bg-[#121822] border border-[#1E2633]">
              <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>
                Toggle Front / Back view above to observe anterior and posterior muscular load.
              </span>
            </div>
          </div>

          {/* Add to Workout Plan Card */}
          <div className="p-5 rounded-2xl bg-[#0F141C] border border-[#232E3E] space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF334B]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Add to Workout Plan
                </h3>
              </div>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            {workoutPlans.length > 0 ? (
              <div className="space-y-4">
                {/* Select Day Plan */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Target Day Routine
                  </label>
                  <select
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141B24] border border-[#2A374A] text-sm text-white focus:outline-none focus:border-[#FF334B] transition cursor-pointer"
                  >
                    {workoutPlans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} ({plan.items.length} exercises)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sets & Reps pickers */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Sets
                    </label>
                    <div className="flex items-center rounded-xl bg-[#141B24] border border-[#2A374A] p-1">
                      <button
                        type="button"
                        onClick={() => setSetsCount(Math.max(1, setsCount - 1))}
                        className="w-8 h-8 rounded-lg bg-[#1C2634] text-slate-200 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-mono font-bold text-sm text-white">
                        {setsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSetsCount(Math.min(10, setsCount + 1))}
                        className="w-8 h-8 rounded-lg bg-[#1C2634] text-slate-200 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Reps per Set
                    </label>
                    <div className="flex items-center rounded-xl bg-[#141B24] border border-[#2A374A] p-1">
                      <button
                        type="button"
                        onClick={() => setRepsCount(Math.max(1, repsCount - 1))}
                        className="w-8 h-8 rounded-lg bg-[#1C2634] text-slate-200 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-mono font-bold text-sm text-white">
                        {repsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setRepsCount(Math.min(50, repsCount + 1))}
                        className="w-8 h-8 rounded-lg bg-[#1C2634] text-slate-200 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add Button */}
                <button
                  type="button"
                  onClick={handleAddToPlan}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF334B] to-[#F97316] hover:opacity-95 text-white font-bold text-sm shadow-[0_0_20px_rgba(255,51,75,0.4)] flex items-center justify-center gap-2 transition cursor-pointer active:scale-[0.99]"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    Add to {currentPlan ? currentPlan.name : 'Workout'}
                  </span>
                </button>

                {addedToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-2 text-xs text-emerald-300"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>
                      Added {exercise.name} ({setsCount} sets × {repsCount} reps) to{' '}
                      <strong>{currentPlan?.name}</strong>!
                    </span>
                  </motion.div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No workout plans created yet. Head to Workout Builder to create your first day plan.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
