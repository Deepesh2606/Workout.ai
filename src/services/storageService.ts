import { WorkoutDayPlan, WorkoutItem, WorkoutSet, RawExercise } from '../types/exercise';
import { FALLBACK_EXERCISES } from '../data/fallbackExercises';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const WORKOUT_PLANS_KEY = 'youcan_workout_plans_v2';
const ACTIVE_PLAN_ID_KEY = 'youcan_active_plan_id_v2';

// Helper to build a workout set
function s(id: string, n: number, reps: number, weight: number): WorkoutSet {
  return { id, setNumber: n, reps, weight, completed: false };
}

export const DEFAULT_PLANS: WorkoutDayPlan[] = [
  // ─────────────────────────────────────────────────────────────────────
  // DAY 1  –  Monday  –  Chest + Triceps + Abs
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'plan-d1-chest-tri',
    name: 'Monday – Chest & Triceps',
    dayLabel: 'Day 1 · Chest · Triceps · Abs',
    description: 'Horizontal pressing power, tricep isolation and core finisher.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'i1-bench',
        exerciseId: 'Barbell_Bench_Press_-_Medium_Grip',
        exercise: FALLBACK_EXERCISES[0],
        sets: [s('s1a',1,10,60), s('s1b',2,8,70), s('s1c',3,6,75), s('s1d',4,6,75)],
        restSeconds: 90,
      },
      {
        id: 'i1-incline',
        exerciseId: 'Incline_Dumbbell_Press',
        exercise: FALLBACK_EXERCISES[11],
        sets: [s('s2a',1,12,24), s('s2b',2,10,26), s('s2c',3,10,26)],
        restSeconds: 75,
      },
      {
        id: 'i1-dips',
        exerciseId: 'Dips_-_Triceps_Version',
        exercise: FALLBACK_EXERCISES[6],
        sets: [s('s3a',1,12,0), s('s3b',2,10,0), s('s3c',3,8,0)],
        restSeconds: 60,
      },
      {
        id: 'i1-pushdown',
        exerciseId: 'Tricep_Pushdown_Cable',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Tricep_Pushdown_Cable')!,
        sets: [s('s4a',1,15,20), s('s4b',2,12,22), s('s4c',3,12,22)],
        restSeconds: 60,
      },
      {
        id: 'i1-crunch',
        exerciseId: 'Cable_Crunch',
        exercise: FALLBACK_EXERCISES[14],
        sets: [s('s5a',1,20,15), s('s5b',2,15,18), s('s5c',3,15,18)],
        restSeconds: 45,
      },
      {
        id: 'i1-ab-wheel',
        exerciseId: 'Ab_Wheel_Rollout',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Ab_Wheel_Rollout')!,
        sets: [s('s6a',1,10,0), s('s6b',2,10,0), s('s6c',3,8,0)],
        restSeconds: 45,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // DAY 2  –  Tuesday  –  Back + Biceps + Forearms
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'plan-d2-back-bi',
    name: 'Tuesday – Back & Biceps',
    dayLabel: 'Day 2 · Back · Biceps · Forearms',
    description: 'Vertical & horizontal pulls, elbow flexion and forearm finisher.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'i2-pullup',
        exerciseId: 'Pullups',
        exercise: FALLBACK_EXERCISES[3],
        sets: [s('s7a',1,10,0), s('s7b',2,8,0), s('s7c',3,7,0)],
        restSeconds: 90,
      },
      {
        id: 'i2-row',
        exerciseId: 'Bent_Over_Barbell_Row',
        exercise: FALLBACK_EXERCISES[9],
        sets: [s('s8a',1,10,50), s('s8b',2,10,55), s('s8c',3,8,60)],
        restSeconds: 75,
      },
      {
        id: 'i2-curl',
        exerciseId: 'Dumbbell_Bicep_Curl',
        exercise: FALLBACK_EXERCISES[5],
        sets: [s('s9a',1,12,14), s('s9b',2,12,14), s('s9c',3,10,14)],
        restSeconds: 60,
      },
      {
        id: 'i2-hammer',
        exerciseId: 'Hammer_Curl',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Hammer_Curl')!,
        sets: [s('s10a',1,12,14), s('s10b',2,12,14), s('s10c',3,10,14)],
        restSeconds: 60,
      },
      {
        id: 'i2-wrist-curl',
        exerciseId: 'Barbell_Wrist_Curl',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Barbell_Wrist_Curl')!,
        sets: [s('s11a',1,20,20), s('s11b',2,20,20), s('s11c',3,15,22)],
        restSeconds: 45,
      },
      {
        id: 'i2-rev-curl',
        exerciseId: 'Reverse_Barbell_Curl',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Reverse_Barbell_Curl')!,
        sets: [s('s12a',1,15,15), s('s12b',2,15,15), s('s12c',3,12,17)],
        restSeconds: 45,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // DAY 3  –  Wednesday  –  Shoulders + Legs
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'plan-d3-shoulder-legs',
    name: 'Wednesday – Shoulders & Legs',
    dayLabel: 'Day 3 · Shoulders · Legs',
    description: 'Overhead pressing power combined with complete lower-body development.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'i3-ohp',
        exerciseId: 'Barbell_Overhead_Press',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Barbell_Overhead_Press')!,
        sets: [s('s13a',1,10,50), s('s13b',2,8,55), s('s13c',3,6,60)],
        restSeconds: 90,
      },
      {
        id: 'i3-lateral',
        exerciseId: 'Side_Lateral_Raise',
        exercise: FALLBACK_EXERCISES[13],
        sets: [s('s14a',1,15,10), s('s14b',2,15,10), s('s14c',3,12,12)],
        restSeconds: 60,
      },
      {
        id: 'i3-face-pull',
        exerciseId: 'Face_Pull',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Face_Pull')!,
        sets: [s('s15a',1,20,12), s('s15b',2,15,15), s('s15c',3,15,15)],
        restSeconds: 60,
      },
      {
        id: 'i3-squat',
        exerciseId: 'Barbell_Squat',
        exercise: FALLBACK_EXERCISES[1],
        sets: [s('s16a',1,10,80), s('s16b',2,8,90), s('s16c',3,8,90)],
        restSeconds: 120,
      },
      {
        id: 'i3-leg-press',
        exerciseId: 'Leg_Press',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Leg_Press')!,
        sets: [s('s17a',1,12,100), s('s17b',2,12,110), s('s17c',3,10,120)],
        restSeconds: 90,
      },
      {
        id: 'i3-leg-curl',
        exerciseId: 'Lying_Leg_Curl',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Lying_Leg_Curl')!,
        sets: [s('s18a',1,12,40), s('s18b',2,10,45), s('s18c',3,10,45)],
        restSeconds: 75,
      },
      {
        id: 'i3-calf',
        exerciseId: 'Standing_Calf_Raises',
        exercise: FALLBACK_EXERCISES[10],
        sets: [s('s19a',1,20,60), s('s19b',2,20,60), s('s19c',3,15,70)],
        restSeconds: 45,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // DAY 4  –  Thursday  –  Chest + Triceps + Forearms  (repeat wk 2)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'plan-d4-chest-tri-forearm',
    name: 'Thursday – Chest & Triceps',
    dayLabel: 'Day 4 · Chest · Triceps · Forearms',
    description: 'Second chest & triceps session this week — forearm finisher instead of abs.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'i4-bench',
        exerciseId: 'Barbell_Bench_Press_-_Medium_Grip',
        exercise: FALLBACK_EXERCISES[0],
        sets: [s('s20a',1,10,62), s('s20b',2,8,72), s('s20c',3,6,77), s('s20d',4,6,77)],
        restSeconds: 90,
      },
      {
        id: 'i4-incline',
        exerciseId: 'Incline_Dumbbell_Press',
        exercise: FALLBACK_EXERCISES[11],
        sets: [s('s21a',1,12,26), s('s21b',2,10,28), s('s21c',3,10,28)],
        restSeconds: 75,
      },
      {
        id: 'i4-skull',
        exerciseId: 'Skull_Crushers',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Skull_Crushers')!,
        sets: [s('s22a',1,12,30), s('s22b',2,10,32), s('s22c',3,10,32)],
        restSeconds: 60,
      },
      {
        id: 'i4-pushdown',
        exerciseId: 'Tricep_Pushdown_Cable',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Tricep_Pushdown_Cable')!,
        sets: [s('s23a',1,15,22), s('s23b',2,12,24), s('s23c',3,12,24)],
        restSeconds: 60,
      },
      {
        id: 'i4-wrist-curl',
        exerciseId: 'Barbell_Wrist_Curl',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Barbell_Wrist_Curl')!,
        sets: [s('s24a',1,20,20), s('s24b',2,20,20), s('s24c',3,15,22)],
        restSeconds: 45,
      },
      {
        id: 'i4-rev-curl',
        exerciseId: 'Reverse_Barbell_Curl',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Reverse_Barbell_Curl')!,
        sets: [s('s25a',1,15,15), s('s25b',2,15,15), s('s25c',3,12,17)],
        restSeconds: 45,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // DAY 5  –  Friday  –  Back + Biceps + Abs  (repeat wk 2)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'plan-d5-back-bi-abs',
    name: 'Friday – Back & Biceps',
    dayLabel: 'Day 5 · Back · Biceps · Abs',
    description: 'Second pull session this week — abs finisher replaces forearms.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'i5-pullup',
        exerciseId: 'Pullups',
        exercise: FALLBACK_EXERCISES[3],
        sets: [s('s26a',1,10,0), s('s26b',2,9,0), s('s26c',3,8,0)],
        restSeconds: 90,
      },
      {
        id: 'i5-deadlift',
        exerciseId: 'Barbell_Deadlift',
        exercise: FALLBACK_EXERCISES[2],
        sets: [s('s27a',1,6,100), s('s27b',2,5,110), s('s27c',3,4,120)],
        restSeconds: 120,
      },
      {
        id: 'i5-row',
        exerciseId: 'Bent_Over_Barbell_Row',
        exercise: FALLBACK_EXERCISES[9],
        sets: [s('s28a',1,10,55), s('s28b',2,10,60), s('s28c',3,8,62)],
        restSeconds: 75,
      },
      {
        id: 'i5-curl',
        exerciseId: 'Dumbbell_Bicep_Curl',
        exercise: FALLBACK_EXERCISES[5],
        sets: [s('s29a',1,12,14), s('s29b',2,12,14), s('s29c',3,10,14)],
        restSeconds: 60,
      },
      {
        id: 'i5-hanging',
        exerciseId: 'Hanging_Leg_Raise',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Hanging_Leg_Raise')!,
        sets: [s('s30a',1,15,0), s('s30b',2,12,0), s('s30c',3,10,0)],
        restSeconds: 45,
      },
      {
        id: 'i5-plank',
        exerciseId: 'Plank',
        exercise: FALLBACK_EXERCISES[8],
        sets: [s('s31a',1,60,0), s('s31b',2,60,0), s('s31c',3,45,0)],
        restSeconds: 45,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // DAY 6  –  Saturday  –  Shoulders + Legs  (repeat)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'plan-d6-shoulder-legs-2',
    name: 'Saturday – Shoulders & Legs',
    dayLabel: 'Day 6 · Shoulders · Legs',
    description: 'Second shoulder & leg session — push toward progressive overload.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'i6-ohp',
        exerciseId: 'Dumbbell_Shoulder_Press',
        exercise: FALLBACK_EXERCISES[4],
        sets: [s('s32a',1,10,20), s('s32b',2,8,22), s('s32c',3,8,24)],
        restSeconds: 90,
      },
      {
        id: 'i6-lateral',
        exerciseId: 'Side_Lateral_Raise',
        exercise: FALLBACK_EXERCISES[13],
        sets: [s('s33a',1,15,10), s('s33b',2,15,10), s('s33c',3,12,12)],
        restSeconds: 60,
      },
      {
        id: 'i6-face-pull',
        exerciseId: 'Face_Pull',
        exercise: FALLBACK_EXERCISES.find(e => e.id === 'Face_Pull')!,
        sets: [s('s34a',1,20,12), s('s34b',2,15,15), s('s34c',3,15,15)],
        restSeconds: 60,
      },
      {
        id: 'i6-squat',
        exerciseId: 'Barbell_Squat',
        exercise: FALLBACK_EXERCISES[1],
        sets: [s('s35a',1,10,85), s('s35b',2,8,95), s('s35c',3,8,95)],
        restSeconds: 120,
      },
      {
        id: 'i6-rdl',
        exerciseId: 'Romanian_Deadlift',
        exercise: FALLBACK_EXERCISES[12],
        sets: [s('s36a',1,10,70), s('s36b',2,10,75), s('s36c',3,8,80)],
        restSeconds: 90,
      },
      {
        id: 'i6-hip-thrust',
        exerciseId: 'Barbell_Hip_Thrust',
        exercise: FALLBACK_EXERCISES[7],
        sets: [s('s37a',1,12,80), s('s37b',2,12,90), s('s37c',3,10,95)],
        restSeconds: 75,
      },
      {
        id: 'i6-calf',
        exerciseId: 'Standing_Calf_Raises',
        exercise: FALLBACK_EXERCISES[10],
        sets: [s('s38a',1,20,65), s('s38b',2,20,65), s('s38c',3,15,75)],
        restSeconds: 45,
      },
    ],
  },
];

// ─── Device ID ────────────────────────────────────────────────────────────────
// A stable anonymous identifier so plans are scoped per-device without auth.
const DEVICE_ID_KEY = 'hyperstate_device_id';
function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = `device-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

// ─── localStorage helpers (instant cache / offline fallback) ──────────────────
export function getStoredWorkoutPlans(): WorkoutDayPlan[] {
  try {
    const raw = localStorage.getItem(WORKOUT_PLANS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('[Storage] Error reading from localStorage', err);
  }
  return DEFAULT_PLANS;
}

export function saveStoredWorkoutPlans(plans: WorkoutDayPlan[]): void {
  try {
    localStorage.setItem(WORKOUT_PLANS_KEY, JSON.stringify(plans));
  } catch (err) {
    console.error('[Storage] Error writing to localStorage', err);
  }
  // Fire-and-forget sync to Supabase
  syncPlansToSupabase(plans).catch(console.error);
}

export function getActivePlanId(plans: WorkoutDayPlan[]): string {
  try {
    const saved = localStorage.getItem(ACTIVE_PLAN_ID_KEY);
    if (saved && plans.some((p) => p.id === saved)) return saved;
  } catch {}
  return plans[0]?.id || '';
}

export function saveActivePlanId(planId: string): void {
  try {
    localStorage.setItem(ACTIVE_PLAN_ID_KEY, planId);
  } catch {}
  // Sync active plan id to Supabase as well
  syncActivePlanIdToSupabase(planId).catch(console.error);
}

// ─── Supabase sync ────────────────────────────────────────────────────────────
// Table: workout_data
//   user_id       text  PRIMARY KEY
//   plans         jsonb
//   active_plan_id text
//   updated_at    timestamptz

const TABLE = 'workout_data';

export async function syncPlansToSupabase(plans: WorkoutDayPlan[]): Promise<void> {
  if (!isSupabaseConfigured) return;
  const userId = getDeviceId();
  const { error } = await supabase.from(TABLE).upsert(
    { user_id: userId, plans, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  );
  if (error) console.error('[Supabase] Failed to save plans:', error.message);
  else console.log('[Supabase] Plans saved ✓');
}

export async function syncActivePlanIdToSupabase(activePlanId: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  const userId = getDeviceId();
  const { error } = await supabase.from(TABLE).upsert(
    { user_id: userId, active_plan_id: activePlanId, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  );
  if (error) console.error('[Supabase] Failed to save active plan id:', error.message);
}

/**
 * Loads plans from Supabase. Falls back to localStorage / DEFAULT_PLANS.
 * Call this once on app boot (async).
 */
export async function loadPlansFromSupabase(): Promise<{
  plans: WorkoutDayPlan[];
  activePlanId: string;
}> {
  if (!isSupabaseConfigured) {
    const plans = getStoredWorkoutPlans();
    return { plans, activePlanId: getActivePlanId(plans) };
  }
  const userId = getDeviceId();
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('plans, active_plan_id')
      .eq('user_id', userId)
      .single();

    if (error || !data) throw error ?? new Error('No data');

    const plans: WorkoutDayPlan[] =
      Array.isArray(data.plans) && data.plans.length > 0 ? data.plans : DEFAULT_PLANS;
    const activePlanId: string =
      data.active_plan_id && plans.some((p) => p.id === data.active_plan_id)
        ? data.active_plan_id
        : plans[0]?.id ?? '';

    // Hydrate localStorage cache from remote data
    localStorage.setItem(WORKOUT_PLANS_KEY, JSON.stringify(plans));
    localStorage.setItem(ACTIVE_PLAN_ID_KEY, activePlanId);

    console.log('[Supabase] Plans loaded ✓');
    return { plans, activePlanId };
  } catch (err) {
    console.warn('[Supabase] Could not load from DB, using local cache:', err);
    const plans = getStoredWorkoutPlans();
    return { plans, activePlanId: getActivePlanId(plans) };
  }
}

// ─── addExerciseToPlan ────────────────────────────────────────────────────────
export function addExerciseToPlan(
  plans: WorkoutDayPlan[],
  planId: string,
  exercise: RawExercise,
  setsCount: number = 3,
  defaultReps: number = 10
): WorkoutDayPlan[] {
  return plans.map((plan) => {
    if (plan.id !== planId) return plan;

    const newItem: WorkoutItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      exerciseId: exercise.id,
      exercise,
      sets: Array.from({ length: setsCount }).map((_, i) => ({
        id: `set-${Date.now()}-${i}`,
        setNumber: i + 1,
        reps: defaultReps,
        weight: 20,
        completed: false,
      })),
      restSeconds: 60,
    };

    return {
      ...plan,
      items: [...plan.items, newItem],
      updatedAt: new Date().toISOString(),
    };
  });
}
