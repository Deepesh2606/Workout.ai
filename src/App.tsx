import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Activity,
  Dumbbell,
  CheckCircle2,
} from 'lucide-react';
import {
  RawExercise,
  MuscleGroupKey,
  WorkoutDayPlan,
  ViewMode,
} from './types/exercise';
import {
  fetchExercisesWithCache,
  syncExercisesBackground,
  filterExercises,
  getStoredExercisesSync,
} from './services/exerciseService';
import {
  getStoredWorkoutPlans,
  saveStoredWorkoutPlans,
  getActivePlanId,
  saveActivePlanId,
  addExerciseToPlan,
  loadPlansFromSupabase,
} from './services/storageService';
import { MUSCLE_GROUPS } from './data/muscleGroups';
import { Navbar } from './components/Navbar';
import { MuscleGrid } from './components/MuscleGrid';
import { ExerciseCard } from './components/ExerciseCard';
import { ExerciseDetail } from './components/ExerciseDetail';
import { WorkoutBuilder } from './components/WorkoutBuilder';
import { HeatmapView } from './components/HeatmapView';

export default function App() {
  // Exercise database state - initialized immediately from cache or fallback so UI never hangs
  const [exercises, setExercises] = useState<RawExercise[]>(() =>
    getStoredExercisesSync()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isCached, setIsCached] = useState(true);

  // Navigation & selection state
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [previousView, setPreviousView] = useState<ViewMode>('exercises');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroupKey | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<RawExercise | null>(null);

  // Smooth page loading & transition state
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Filter state for Exercise catalog
  const [searchQuery, setSearchQuery] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [mechanicFilter, setMechanicFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(24);

  // Workout plans state
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutDayPlan[]>(() =>
    getStoredWorkoutPlans()
  );
  const [activePlanId, setActivePlanId] = useState<string>(() =>
    getActivePlanId(getStoredWorkoutPlans())
  );

  // Initial load
  useEffect(() => {
    async function initData() {
      // Load exercises
      const { exercises: loaded, isFromCache } = await fetchExercisesWithCache();
      if (loaded && loaded.length > 0) {
        setExercises(loaded);
        setIsCached(isFromCache);
      }
      // Background silent exercise sync
      syncExercisesBackground((fresh) => {
        if (fresh && fresh.length > 0) setExercises(fresh);
      });

      // Load workout plans from Supabase (falls back to localStorage if offline)
      const { plans: remotePlans, activePlanId: remoteActiveId } =
        await loadPlansFromSupabase();
      setWorkoutPlans(remotePlans);
      setActivePlanId(remoteActiveId);
    }

    initData();
  }, []);

  // Save workout plans whenever they change
  const handleUpdatePlans = (updated: WorkoutDayPlan[]) => {
    setWorkoutPlans(updated);
    saveStoredWorkoutPlans(updated);
  };

  const handleSelectPlanId = (id: string) => {
    setActivePlanId(id);
    saveActivePlanId(id);
  };

  const handleAddExerciseToPlanDirect = (
    planId: string,
    exercise: RawExercise,
    setsCount: number = 3,
    repsCount: number = 10
  ) => {
    const updated = addExerciseToPlan(workoutPlans, planId, exercise, setsCount, repsCount);
    handleUpdatePlans(updated);
  };

  // Smooth page switching handler
  const navigateToView = (newView: ViewMode, beforeNavigate?: () => void) => {
    if (newView === currentView && !beforeNavigate) return;

    if (beforeNavigate) beforeNavigate();

    setIsPageTransitioning(true);
    setTransitionProgress(40);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const t1 = setTimeout(() => {
      setTransitionProgress(80);
      setCurrentView(newView);
    }, 110);

    const t2 = setTimeout(() => {
      setTransitionProgress(100);
    }, 220);

    const t3 = setTimeout(() => {
      setIsPageTransitioning(false);
      setTransitionProgress(0);
    }, 320);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  // Home: clicking a muscle group triggers filtering into Exercises view
  const handleSelectMuscleGroup = (key: MuscleGroupKey) => {
    navigateToView('exercises', () => {
      setSelectedMuscle(key);
      setVisibleCount(24);
    });
  };

  const handleOpenExerciseDetail = (exercise: RawExercise) => {
    navigateToView('detail', () => {
      if (currentView !== 'detail') {
        setPreviousView(currentView);
      }
      setSelectedExercise(exercise);
    });
  };

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return filterExercises(exercises, {
      search: searchQuery,
      muscleGroup: selectedMuscle,
      equipment: equipmentFilter,
      level: levelFilter,
      mechanic: mechanicFilter,
    });
  }, [
    exercises,
    searchQuery,
    selectedMuscle,
    equipmentFilter,
    levelFilter,
    mechanicFilter,
  ]);

  // Featured sample exercises for Home
  const featuredExercises = useMemo(() => {
    if (exercises.length === 0) return [];
    return exercises.slice(0, 6);
  }, [exercises]);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-100 flex flex-col font-sans pb-20 md:pb-8 selection:bg-[#FF334B] selection:text-white relative">
      {/* Top Global Smooth Loading Progress Bar */}
      {(isPageTransitioning || transitionProgress > 0) && (
        <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF334B] via-[#FB923C] to-[#10B981] shadow-[0_0_12px_rgba(255,51,75,0.9)] transition-all duration-150 ease-out"
            style={{
              width: `${transitionProgress}%`,
              opacity: transitionProgress === 100 ? 0 : 1,
            }}
          />
        </div>
      )}

      {/* Subtle Floating Page Switching Pill */}
      {isPageTransitioning && (
        <div className="fixed bottom-6 right-6 z-50 px-3.5 py-1.5 rounded-full bg-[#0F141C]/90 border border-[#232F3E] text-slate-200 text-xs font-mono shadow-2xl flex items-center gap-2 backdrop-blur-md pointer-events-none animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-[#FF334B] animate-ping" />
          <span>Switching view...</span>
        </div>
      )}

      {/* Top and Mobile Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => navigateToView(view)}
        workoutPlanCount={workoutPlans.reduce(
          (acc, p) => acc + (p.items?.length || 0),
          0
        )}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {isLoading ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF334B] to-[#F97316] flex items-center justify-center animate-pulse shadow-[0_0_25px_rgba(255,51,75,0.5)]">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white tracking-wide">
                Loading Exercise Visualizer
              </h3>
              <p className="text-xs text-slate-400">
                Fetching biomechanical dataset from free-exercise-db...
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-full"
            >
            {/* VIEW 1: HOME */}
            {currentView === 'home' && (
              <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
                {/* Hero Banner */}
                <div className="relative rounded-3xl bg-gradient-to-b from-[#131A26] to-[#0E131B] border border-[#202C3D] p-6 sm:p-10 overflow-hidden shadow-2xl">
                  {/* Neon Glow accents */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF334B]/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182333] border border-[#26374D] text-xs text-[#FF334B] font-mono tracking-wide">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Interactive Muscle Anatomy & HyperState Biomechanics</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                      Master Your Form.{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF334B] via-[#FB923C] to-[#10B981]">
                        Visualize Every Fiber.
                      </span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      Explore over 800+ resistance exercises with dual-view body diagrams, start/end looping animations, and HyperState biomechanical cues.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          navigateToView('exercises', () => setSelectedMuscle(null))
                        }
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF334B] to-[#F97316] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,51,75,0.4)] hover:opacity-95 transition cursor-pointer flex items-center gap-2"
                      >
                        <Dumbbell className="w-4 h-4" />
                        <span>Browse 800+ Movements</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateToView('heatmap')}
                        className="px-5 py-3 rounded-xl bg-[#141D29] border border-[#26364D] hover:border-slate-400 text-slate-200 font-bold text-sm transition cursor-pointer flex items-center gap-2"
                      >
                        <Flame className="w-4 h-4 text-[#FF334B]" />
                        <span>Full Body Heatmap</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section 1: Muscle Groups Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-[#FF334B]" />
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          Target Muscle Groups
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                        Select a muscle group to filter exercises & inspect anatomy
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigateToView('exercises', () => setSelectedMuscle(null))
                      }
                      className="text-xs font-semibold text-[#FF334B] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <MuscleGrid
                    exercises={exercises}
                    selectedMuscle={selectedMuscle}
                    onSelectMuscle={handleSelectMuscleGroup}
                  />
                </div>

                {/* Section 2: Quick Features Highlight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    onClick={() => navigateToView('heatmap')}
                    className="p-5 rounded-2xl bg-[#0F141C] border border-[#1E2633] hover:border-[#FF334B]/60 transition-all cursor-pointer group space-y-2.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FF334B]/15 border border-[#FF334B]/30 flex items-center justify-center text-[#FF334B]">
                      <Flame className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#FF334B] transition-colors">
                      Full Body Muscle Heatmap
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Visualize cumulative training volume across your entire day plan with dynamic 5-tier heat density.
                    </p>
                  </div>

                  <div
                    onClick={() => navigateToView('builder')}
                    className="p-5 rounded-2xl bg-[#0F141C] border border-[#1E2633] hover:border-[#10B981]/60 transition-all cursor-pointer group space-y-2.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      Routine Builder & Rest Timer
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Organize day routines, log sets, reps, and track rest cadence. Stored safely in localStorage.
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      if (exercises[0]) handleOpenExerciseDetail(exercises[0]);
                    }}
                    className="p-5 rounded-2xl bg-[#0F141C] border border-[#1E2633] hover:border-cyan-500/60 transition-all cursor-pointer group space-y-2.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      HyperState Form & Mistake Cues
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Glow-bordered biomechanical analysis for proper execution, breathing tempo, and injury avoidance.
                    </p>
                  </div>
                </div>

                {/* Section 3: Popular Movements Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        Core Foundation Movements
                      </h3>
                      <p className="text-xs text-slate-400">
                        Top compound and isolation exercises
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {featuredExercises.map((ex) => (
                      <ExerciseCard
                        key={ex.id}
                        exercise={ex}
                        onSelect={handleOpenExerciseDetail}
                        onQuickAdd={(item) =>
                          handleAddExerciseToPlanDirect(activePlanId, item, 3, 10)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: EXERCISES LIBRARY */}
            {currentView === 'exercises' && (
              <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
                {/* Header & Search */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Exercise Library
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                        {filteredExercises.length} movements available in database
                      </p>
                    </div>

                    {/* Reset Filters */}
                    {(selectedMuscle ||
                      equipmentFilter !== 'all' ||
                      levelFilter !== 'all' ||
                      searchQuery) && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedMuscle(null);
                          setEquipmentFilter('all');
                          setLevelFilter('all');
                          setSearchQuery('');
                        }}
                        className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-[#141C26] border border-[#243346] text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Filters</span>
                      </button>
                    )}
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search exercises by name, muscle, or equipment..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#0F141C] border border-[#1E2633] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF334B] shadow-inner"
                    />
                  </div>

                  {/* Muscle Groups Horizontal Filter Bar */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                    <button
                      type="button"
                      onClick={() => setSelectedMuscle(null)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        selectedMuscle === null
                          ? 'bg-[#FF334B] text-white shadow-[0_0_12px_rgba(255,51,75,0.4)]'
                          : 'bg-[#121822] text-slate-400 hover:text-white border border-[#1E2633]'
                      }`}
                    >
                      All Muscles
                    </button>

                    {MUSCLE_GROUPS.map((mg) => (
                      <button
                        key={mg.key}
                        type="button"
                        onClick={() =>
                          setSelectedMuscle(selectedMuscle === mg.key ? null : mg.key)
                        }
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border ${
                          selectedMuscle === mg.key
                            ? 'bg-[#182333] border-[#FF334B] text-white shadow-[0_0_10px_rgba(255,51,75,0.3)]'
                            : 'bg-[#121822] border-[#1E2633] text-slate-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: mg.colorHex }}
                        />
                        <span>{mg.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Secondary Dropdown Filters: Equipment & Level */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Equipment:</span>
                      </span>
                      <select
                        value={equipmentFilter}
                        onChange={(e) => setEquipmentFilter(e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-[#121822] border border-[#1E2633] text-xs text-white focus:outline-none focus:border-[#FF334B] cursor-pointer"
                      >
                        <option value="all">All Equipment</option>
                        <option value="body only">Body Only</option>
                        <option value="barbell">Barbell</option>
                        <option value="dumbbell">Dumbbell</option>
                        <option value="cable">Cable</option>
                        <option value="machine">Machine</option>
                        <option value="kettlebells">Kettlebells</option>
                        <option value="bands">Bands</option>
                        <option value="e-z curl bar">E-Z Curl Bar</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Level:</span>
                      <select
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-[#121822] border border-[#1E2633] text-xs text-white focus:outline-none focus:border-[#FF334B] cursor-pointer"
                      >
                        <option value="all">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Exercises Grid */}
                {filteredExercises.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredExercises.slice(0, visibleCount).map((ex) => (
                        <ExerciseCard
                          key={ex.id}
                          exercise={ex}
                          onSelect={handleOpenExerciseDetail}
                          onQuickAdd={(item) =>
                            handleAddExerciseToPlanDirect(activePlanId, item, 3, 10)
                          }
                        />
                      ))}
                    </div>

                    {/* Load More Button */}
                    {visibleCount < filteredExercises.length && (
                      <div className="text-center pt-4">
                        <button
                          type="button"
                          onClick={() => setVisibleCount((prev) => prev + 24)}
                          className="px-6 py-2.5 rounded-xl bg-[#141C26] hover:bg-[#1C2837] border border-[#243346] text-white text-xs font-bold transition cursor-pointer"
                        >
                          Load More Movements ({filteredExercises.length - visibleCount} remaining)
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-12 text-center rounded-2xl bg-[#0F141C] border border-[#1E2633] space-y-3">
                    <Layers className="w-10 h-10 text-slate-600 mx-auto" />
                    <h3 className="text-base font-bold text-white">No Exercises Match Filters</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Try clearing your search query or selecting a different muscle group.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMuscle(null);
                        setEquipmentFilter('all');
                        setLevelFilter('all');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#FF334B] text-white font-bold text-xs shadow-[0_0_12px_rgba(255,51,75,0.4)] cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 3: EXERCISE DETAIL */}
            {currentView === 'detail' && selectedExercise && (
              <ExerciseDetail
                exercise={selectedExercise}
                onBack={() => {
                  navigateToView(previousView || 'exercises');
                }}
                backLabel={
                  previousView === 'builder'
                    ? 'Back to Routine Planner'
                    : previousView === 'heatmap'
                    ? 'Back to Heatmap'
                    : 'Back to Exercise Library'
                }
                workoutPlans={workoutPlans}
                activePlanId={activePlanId}
                onAddExerciseToPlan={handleAddExerciseToPlanDirect}
                onOpenMuscleGroup={(muscle) => {
                  const matched = MUSCLE_GROUPS.find((g) =>
                    g.dbMuscles.includes(muscle.toLowerCase())
                  );
                  if (matched) {
                    navigateToView('exercises', () => setSelectedMuscle(matched.key));
                  }
                }}
              />
            )}

            {/* VIEW 4: WORKOUT BUILDER */}
            {currentView === 'builder' && (
              <WorkoutBuilder
                plans={workoutPlans}
                activePlanId={activePlanId}
                allExercises={exercises}
                onSelectPlanId={handleSelectPlanId}
                onUpdatePlans={handleUpdatePlans}
                onViewHeatmap={() => navigateToView('heatmap')}
                onSelectExerciseDetail={handleOpenExerciseDetail}
              />
            )}

            {/* VIEW 5: FULL BODY HEATMAP */}
            {currentView === 'heatmap' && (
              <HeatmapView
                plans={workoutPlans}
                activePlanId={activePlanId}
                onSelectPlanId={handleSelectPlanId}
                onGoToBuilder={() => navigateToView('builder')}
                onSelectExercise={(id) => {
                  const found = exercises.find((e) => e.id === id);
                  if (found) handleOpenExerciseDetail(found);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}
      </main>
    </div>
  );
}
