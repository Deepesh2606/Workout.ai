import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Check,
  Flame,
  Search,
  Timer,
  Clock,
  Dumbbell,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { WorkoutDayPlan, RawExercise, WorkoutItem } from '../types/exercise';
import { getExerciseImageUrl } from '../services/exerciseService';

interface WorkoutBuilderProps {
  plans: WorkoutDayPlan[];
  activePlanId: string;
  allExercises: RawExercise[];
  onSelectPlanId: (id: string) => void;
  onUpdatePlans: (updatedPlans: WorkoutDayPlan[]) => void;
  onViewHeatmap: () => void;
  onSelectExerciseDetail: (exercise: RawExercise) => void;
}

export const WorkoutBuilder: React.FC<WorkoutBuilderProps> = ({
  plans,
  activePlanId,
  allExercises,
  onSelectPlanId,
  onUpdatePlans,
  onViewHeatmap,
  onSelectExerciseDetail,
}) => {
  const currentPlan = plans.find((p) => p.id === activePlanId) || plans[0];

  // Quick Exercise Picker modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // New plan modal / inline
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanDay, setNewPlanDay] = useState('');

  // Rest Timer state
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer interval effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerRemaining !== null && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerRemaining]);

  const handleStartTimer = (seconds: number) => {
    setTimerSeconds(seconds);
    setTimerRemaining(seconds);
    setIsTimerRunning(true);
  };

  // Mutators for current plan
  const updateCurrentPlan = (updatedPlan: WorkoutDayPlan) => {
    const updated = plans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p));
    onUpdatePlans(updated);
  };

  const handleAddSet = (itemId: string) => {
    if (!currentPlan) return;
    const items = currentPlan.items.map((item) => {
      if (item.id !== itemId) return item;
      const lastSet = item.sets[item.sets.length - 1];
      const newSetNumber = (lastSet ? lastSet.setNumber : 0) + 1;
      const newSet = {
        id: `set-${Date.now()}-${newSetNumber}`,
        setNumber: newSetNumber,
        reps: lastSet ? lastSet.reps : 10,
        weight: lastSet ? lastSet.weight : 20,
        completed: false,
      };
      return {
        ...item,
        sets: [...item.sets, newSet],
      };
    });
    updateCurrentPlan({ ...currentPlan, items, updatedAt: new Date().toISOString() });
  };

  const handleRemoveSet = (itemId: string, setId: string) => {
    if (!currentPlan) return;
    const items = currentPlan.items.map((item) => {
      if (item.id !== itemId) return item;
      const filtered = item.sets.filter((s) => s.id !== setId);
      // Renumber sets
      const renumbered = filtered.map((s, idx) => ({ ...s, setNumber: idx + 1 }));
      return { ...item, sets: renumbered };
    });
    updateCurrentPlan({ ...currentPlan, items, updatedAt: new Date().toISOString() });
  };

  const handleUpdateSet = (
    itemId: string,
    setId: string,
    field: 'reps' | 'weight' | 'completed',
    value: number | boolean
  ) => {
    if (!currentPlan) return;
    const items = currentPlan.items.map((item) => {
      if (item.id !== itemId) return item;
      const sets = item.sets.map((s) => (s.id === setId ? { ...s, [field]: value } : s));
      return { ...item, sets };
    });
    updateCurrentPlan({ ...currentPlan, items, updatedAt: new Date().toISOString() });
  };

  const handleRemoveItem = (itemId: string) => {
    if (!currentPlan) return;
    const items = currentPlan.items.filter((item) => item.id !== itemId);
    updateCurrentPlan({ ...currentPlan, items, updatedAt: new Date().toISOString() });
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    if (!currentPlan) return;
    const newItems = [...currentPlan.items];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    updateCurrentPlan({ ...currentPlan, items: newItems, updatedAt: new Date().toISOString() });
  };

  const handleAddExerciseToCurrentPlan = (exercise: RawExercise) => {
    if (!currentPlan) return;
    const newItem: WorkoutItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      exerciseId: exercise.id,
      exercise,
      sets: [
        { id: `s-${Date.now()}-1`, setNumber: 1, reps: 10, weight: 20, completed: false },
        { id: `s-${Date.now()}-2`, setNumber: 2, reps: 10, weight: 20, completed: false },
        { id: `s-${Date.now()}-3`, setNumber: 3, reps: 10, weight: 20, completed: false },
      ],
      restSeconds: 60,
    };
    updateCurrentPlan({
      ...currentPlan,
      items: [...currentPlan.items, newItem],
      updatedAt: new Date().toISOString(),
    });
    setShowAddModal(false);
  };

  const handleCreateNewPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanName.trim()) return;
    const newPlan: WorkoutDayPlan = {
      id: `plan-${Date.now()}`,
      name: newPlanName.trim(),
      dayLabel: newPlanDay.trim() || 'Custom Training Day',
      description: 'Custom targeted workout regimen.',
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onUpdatePlans([...plans, newPlan]);
    onSelectPlanId(newPlan.id);
    setNewPlanName('');
    setNewPlanDay('');
    setShowNewPlanModal(false);
  };

  const handleDeletePlan = (planId: string) => {
    if (plans.length <= 1) {
      return;
    }
    const filtered = plans.filter((p) => p.id !== planId);
    onUpdatePlans(filtered);
    if (activePlanId === planId) {
      onSelectPlanId(filtered[0].id);
    }
  };

  // Filtered exercises for add modal
  const filteredModalExercises = allExercises
    .filter((ex) =>
      searchQuery
        ? ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ex.primaryMuscles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()))
        : true
    )
    .slice(0, 30);

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 space-y-6">
      {/* Header and Plans Nav */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2633]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981]" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Workout Day Planner
            </h1>
            <span className="ml-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold tracking-wide uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Supabase Connected
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build custom day routines, log sets & reps — automatically synced to Supabase database & offline cache
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onViewHeatmap}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF334B] to-[#F97316] text-white text-xs font-bold shadow-[0_0_15px_rgba(255,51,75,0.35)] flex items-center gap-2 hover:opacity-95 transition cursor-pointer"
          >
            <Flame className="w-4 h-4" />
            <span>View Muscle Heatmap</span>
          </button>

          <button
            type="button"
            onClick={() => setShowNewPlanModal(true)}
            className="px-3 py-2 rounded-xl bg-[#141C26] border border-[#233144] hover:border-slate-400 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Day Plan</span>
          </button>
        </div>
      </div>

      {/* Day Plan Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {plans.map((p) => (
          <div key={p.id} className="flex items-center">
            <button
              type="button"
              onClick={() => onSelectPlanId(p.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-2 border ${
                p.id === currentPlan?.id
                  ? 'bg-[#182333] border-[#10B981] text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-[#0F141C] border-[#1E2633] text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{p.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#090D12] text-slate-400 font-mono">
                {p.items.length}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Active Plan Dashboard */}
      {currentPlan && (
        <div className="p-5 rounded-2xl bg-[#0F141C] border border-[#1E2633] space-y-5">
          {/* Plan Info and Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E2633]">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {currentPlan.name}
                </h2>
                <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-[#16202E] border border-[#223348]">
                  {currentPlan.dayLabel}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {currentPlan.description || 'Targeted training routine.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-[0_0_12px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Exercise</span>
              </button>

              {plans.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeletePlan(currentPlan.id)}
                  className="p-2 rounded-xl bg-[#161C26] hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-[#232F3E] transition cursor-pointer"
                  title="Delete routine"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Integrated Rest Timer Banner */}
          <div className="p-3 rounded-xl bg-[#121924] border border-[#202C3D] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Timer className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Inter-Set Rest Timer
                </span>
                <span className="text-base font-mono font-bold text-white">
                  {timerRemaining !== null
                    ? `${Math.floor(timerRemaining / 60)}:${(timerRemaining % 60)
                        .toString()
                        .padStart(2, '0')}`
                    : `${timerSeconds}s ready`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {[45, 60, 90, 120].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => handleStartTimer(sec)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                    timerSeconds === sec
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-[#182331] text-slate-300 hover:text-white'
                  }`}
                >
                  {sec}s
                </button>
              ))}

              {isTimerRunning ? (
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(false)}
                  className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold transition cursor-pointer"
                  title="Pause timer"
                >
                  <Pause className="w-3.5 h-3.5" />
                </button>
              ) : timerRemaining !== null && timerRemaining > 0 ? (
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(true)}
                  className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold transition cursor-pointer"
                  title="Resume timer"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
              ) : null}

              {timerRemaining !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerRemaining(null);
                  }}
                  className="p-1.5 rounded-lg bg-[#1D2838] text-slate-400 hover:text-white transition cursor-pointer"
                  title="Reset timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Exercise Items List */}
          {currentPlan.items.length > 0 ? (
            <div className="space-y-4">
              {currentPlan.items.map((item, itemIdx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#141B24] border border-[#202B3B] space-y-3 transition-colors hover:border-[#2C3B52]"
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Image Thumbnail */}
                      <div
                        onClick={() => onSelectExerciseDetail(item.exercise)}
                        className="w-14 h-14 rounded-lg bg-[#0B0F14] border border-[#243142] overflow-hidden flex-shrink-0 cursor-pointer flex items-center justify-center group"
                      >
                        {item.exercise.images?.[0] ? (
                          <img
                            src={getExerciseImageUrl(item.exercise.images[0])}
                            alt={item.exercise.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-200"
                          />
                        ) : (
                          <Dumbbell className="w-6 h-6 text-slate-500" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-[#1C2634] text-slate-300 font-mono text-xs flex items-center justify-center font-bold">
                            {itemIdx + 1}
                          </span>
                          <h3
                            onClick={() => onSelectExerciseDetail(item.exercise)}
                            className="text-sm sm:text-base font-bold text-white hover:text-[#FF334B] cursor-pointer transition-colors"
                          >
                            {item.exercise.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                          <span className="text-[#FF334B] capitalize font-medium">
                            {item.exercise.primaryMuscles.join(', ')}
                          </span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="capitalize">{item.exercise.equipment || 'Body only'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ordering and remove controls */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={itemIdx === 0}
                        onClick={() => handleMoveItem(itemIdx, 'up')}
                        className="p-1 rounded-lg bg-[#192330] text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                        title="Move up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={itemIdx === currentPlan.items.length - 1}
                        onClick={() => handleMoveItem(itemIdx, 'down')}
                        className="p-1 rounded-lg bg-[#192330] text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                        title="Move down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 rounded-lg bg-[#192330] text-slate-400 hover:text-red-400 transition cursor-pointer ml-1"
                        title="Remove from routine"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Sets Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#202C3D] text-[11px] font-mono text-slate-400 uppercase">
                          <th className="py-1.5 px-2 w-12">Set</th>
                          <th className="py-1.5 px-2">Weight (kg/lbs)</th>
                          <th className="py-1.5 px-2">Reps</th>
                          <th className="py-1.5 px-2 text-center w-16">Done</th>
                          <th className="py-1.5 px-2 text-right w-12">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1D2736]">
                        {item.sets.map((set) => (
                          <tr
                            key={set.id}
                            className={`transition-colors ${
                              set.completed ? 'bg-emerald-950/20' : ''
                            }`}
                          >
                            <td className="py-2 px-2 font-mono font-bold text-slate-300">
                              #{set.setNumber}
                            </td>
                            <td className="py-2 px-2">
                              <input
                                type="number"
                                min="0"
                                max="999"
                                step="2.5"
                                value={set.weight ?? 0}
                                onChange={(e) =>
                                  handleUpdateSet(
                                    item.id,
                                    set.id,
                                    'weight',
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className="w-20 px-2 py-1 rounded-lg bg-[#0F141C] border border-[#29364A] text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <input
                                type="number"
                                min="1"
                                max="200"
                                value={set.reps}
                                onChange={(e) =>
                                  handleUpdateSet(
                                    item.id,
                                    set.id,
                                    'reps',
                                    parseInt(e.target.value, 10) || 1
                                  )
                                }
                                className="w-16 px-2 py-1 rounded-lg bg-[#0F141C] border border-[#29364A] text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                              />
                            </td>
                            <td className="py-2 px-2 text-center">
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateSet(
                                    item.id,
                                    set.id,
                                    'completed',
                                    !set.completed
                                  )
                                }
                                className={`w-6 h-6 rounded-md border flex items-center justify-center mx-auto transition cursor-pointer ${
                                  set.completed
                                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                                    : 'bg-[#182331] border-[#2B3B50] text-slate-500 hover:border-slate-400'
                                }`}
                              >
                                {set.completed && <Check className="w-3.5 h-3.5" />}
                              </button>
                            </td>
                            <td className="py-2 px-2 text-right">
                              {item.sets.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSet(item.id, set.id)}
                                  className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                                  title="Delete set"
                                >
                                  ×
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Add Set button */}
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleAddSet(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#1B2533] hover:bg-[#253448] text-slate-200 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-emerald-400" />
                      <span>Add Set</span>
                    </button>

                    <span className="text-[11px] font-mono text-slate-400">
                      Total sets:{' '}
                      <strong className="text-white">{item.sets.length}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl bg-[#121822] border border-[#1E2633] space-y-3">
              <Dumbbell className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">This Routine is Empty</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Tap &ldquo;Add Exercise&rdquo; above to select exercises from the library, or browse by muscle group on the Home page.
              </p>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-[0_0_12px_rgba(16,185,129,0.4)] cursor-pointer"
              >
                Browse & Add Moves
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick Exercise Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#0F141C] border border-[#232F3E] shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#1E2633] flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Add Exercise to Routine</h3>
                <p className="text-xs text-slate-400">
                  Target: {currentPlan?.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-[#1E2633]">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search 800+ movements (e.g., bench, squat, bicep)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141B24] border border-[#243346] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF334B]"
                  autoFocus
                />
              </div>
            </div>

            {/* Exercise List */}
            <div className="p-4 overflow-y-auto flex-1 space-y-2">
              {filteredModalExercises.map((ex) => (
                <div
                  key={ex.id}
                  className="p-3 rounded-xl bg-[#141B24] border border-[#1E2837] hover:border-[#FF334B]/50 flex items-center justify-between gap-3 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#0B0F14] overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {ex.images?.[0] ? (
                        <img
                          src={getExerciseImageUrl(ex.images[0])}
                          alt={ex.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Dumbbell className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {ex.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="text-[#FF334B] font-semibold capitalize">
                          {ex.primaryMuscles.join(', ')}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="capitalize">{ex.equipment || 'Body only'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddExerciseToCurrentPlan(ex)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-[0_0_10px_rgba(16,185,129,0.3)] transition cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Day Plan Modal */}
      {showNewPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0F141C] border border-[#232F3E] p-5 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Create New Day Routine</h3>
            <form onSubmit={handleCreateNewPlan} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Routine Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Upper Body Hypertrophy"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141B24] border border-[#26374D] text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Day Label (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thursday - Shoulders & Arms"
                  value={newPlanDay}
                  onChange={(e) => setNewPlanDay(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141B24] border border-[#26374D] text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPlanModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-[0_0_12px_rgba(16,185,129,0.4)] cursor-pointer"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
