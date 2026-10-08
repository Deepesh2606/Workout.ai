import { WorkoutDayPlan, WorkoutItem, RawExercise } from '../types/exercise';
import { FALLBACK_EXERCISES } from '../data/fallbackExercises';

const WORKOUT_PLANS_KEY = 'youcan_workout_plans_v1';
const ACTIVE_PLAN_ID_KEY = 'youcan_active_plan_id_v1';

export const DEFAULT_PLANS: WorkoutDayPlan[] = [
  {
    id: 'plan-push-a',
    name: 'Push Hypertrophy',
    dayLabel: 'Day 1 - Chest, Delts & Triceps',
    description: 'Targeted horizontal and vertical pressing for maximum upper body development.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'item-1',
        exerciseId: 'Barbell_Bench_Press_-_Medium_Grip',
        exercise: FALLBACK_EXERCISES[0],
        sets: [
          { id: 's1', setNumber: 1, reps: 10, weight: 60, completed: true },
          { id: 's2', setNumber: 2, reps: 8, weight: 70, completed: true },
          { id: 's3', setNumber: 3, reps: 6, weight: 75, completed: false },
          { id: 's4', setNumber: 4, reps: 6, weight: 75, completed: false },
        ],
        restSeconds: 90,
      },
      {
        id: 'item-2',
        exerciseId: 'Incline_Dumbbell_Press',
        exercise: FALLBACK_EXERCISES[11] || FALLBACK_EXERCISES[0],
        sets: [
          { id: 's5', setNumber: 1, reps: 12, weight: 24, completed: false },
          { id: 's6', setNumber: 2, reps: 10, weight: 26, completed: false },
          { id: 's7', setNumber: 3, reps: 10, weight: 26, completed: false },
        ],
        restSeconds: 75,
      },
      {
        id: 'item-3',
        exerciseId: 'Side_Lateral_Raise',
        exercise: FALLBACK_EXERCISES[13] || FALLBACK_EXERCISES[4],
        sets: [
          { id: 's8', setNumber: 1, reps: 15, weight: 10, completed: false },
          { id: 's9', setNumber: 2, reps: 15, weight: 10, completed: false },
          { id: 's10', setNumber: 3, reps: 12, weight: 12, completed: false },
        ],
        restSeconds: 60,
      },
      {
        id: 'item-4',
        exerciseId: 'Dips_-_Triceps_Version',
        exercise: FALLBACK_EXERCISES[6],
        sets: [
          { id: 's11', setNumber: 1, reps: 12, weight: 0, completed: false },
          { id: 's12', setNumber: 2, reps: 10, weight: 0, completed: false },
          { id: 's13', setNumber: 3, reps: 8, weight: 0, completed: false },
        ],
        restSeconds: 60,
      },
    ],
  },
  {
    id: 'plan-legs-b',
    name: 'Quad & Posterior Drive',
    dayLabel: 'Day 2 - Legs & Glutes',
    description: 'High mechanical tension lower body session with hip hinging and knee flexion.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'item-20',
        exerciseId: 'Barbell_Squat',
        exercise: FALLBACK_EXERCISES[1],
        sets: [
          { id: 's21', setNumber: 1, reps: 10, weight: 80, completed: false },
          { id: 's22', setNumber: 2, reps: 8, weight: 90, completed: false },
          { id: 's23', setNumber: 3, reps: 8, weight: 90, completed: false },
        ],
        restSeconds: 120,
      },
      {
        id: 'item-21',
        exerciseId: 'Romanian_Deadlift',
        exercise: FALLBACK_EXERCISES[12] || FALLBACK_EXERCISES[2],
        sets: [
          { id: 's24', setNumber: 1, reps: 10, weight: 70, completed: false },
          { id: 's25', setNumber: 2, reps: 10, weight: 70, completed: false },
          { id: 's26', setNumber: 3, reps: 8, weight: 75, completed: false },
        ],
        restSeconds: 90,
      },
      {
        id: 'item-22',
        exerciseId: 'Barbell_Hip_Thrust',
        exercise: FALLBACK_EXERCISES[7],
        sets: [
          { id: 's27', setNumber: 1, reps: 12, weight: 80, completed: false },
          { id: 's28', setNumber: 2, reps: 12, weight: 90, completed: false },
          { id: 's29', setNumber: 3, reps: 10, weight: 95, completed: false },
        ],
        restSeconds: 75,
      },
    ],
  },
  {
    id: 'plan-pull-c',
    name: 'Pull & Core Focus',
    dayLabel: 'Day 3 - Back, Biceps & Abs',
    description: 'Vertical & horizontal back contraction, elbow flexion and abdominal braces.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'item-30',
        exerciseId: 'Pullups',
        exercise: FALLBACK_EXERCISES[3],
        sets: [
          { id: 's31', setNumber: 1, reps: 10, weight: 0, completed: false },
          { id: 's32', setNumber: 2, reps: 8, weight: 0, completed: false },
          { id: 's33', setNumber: 3, reps: 7, weight: 0, completed: false },
        ],
        restSeconds: 90,
      },
      {
        id: 'item-31',
        exerciseId: 'Bent_Over_Barbell_Row',
        exercise: FALLBACK_EXERCISES[9],
        sets: [
          { id: 's34', setNumber: 1, reps: 10, weight: 50, completed: false },
          { id: 's35', setNumber: 2, reps: 10, weight: 55, completed: false },
          { id: 's36', setNumber: 3, reps: 8, weight: 60, completed: false },
        ],
        restSeconds: 75,
      },
      {
        id: 'item-32',
        exerciseId: 'Dumbbell_Bicep_Curl',
        exercise: FALLBACK_EXERCISES[5],
        sets: [
          { id: 's37', setNumber: 1, reps: 12, weight: 14, completed: false },
          { id: 's38', setNumber: 2, reps: 12, weight: 14, completed: false },
          { id: 's39', setNumber: 3, reps: 10, weight: 14, completed: false },
        ],
        restSeconds: 60,
      },
      {
        id: 'item-33',
        exerciseId: 'Plank',
        exercise: FALLBACK_EXERCISES[8],
        sets: [
          { id: 's40', setNumber: 1, reps: 60, weight: 0, completed: false },
          { id: 's41', setNumber: 2, reps: 45, weight: 0, completed: false },
        ],
        restSeconds: 45,
      },
    ],
  },
];

export function getStoredWorkoutPlans(): WorkoutDayPlan[] {
  try {
    const raw = localStorage.getItem(WORKOUT_PLANS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading workout plans from storage', err);
  }
  return DEFAULT_PLANS;
}

export function saveStoredWorkoutPlans(plans: WorkoutDayPlan[]): void {
  try {
    localStorage.setItem(WORKOUT_PLANS_KEY, JSON.stringify(plans));
  } catch (err) {
    console.error('Error saving workout plans to storage', err);
  }
}

export function getActivePlanId(plans: WorkoutDayPlan[]): string {
  try {
    const saved = localStorage.getItem(ACTIVE_PLAN_ID_KEY);
    if (saved && plans.some((p) => p.id === saved)) {
      return saved;
    }
  } catch {}
  return plans[0]?.id || '';
}

export function saveActivePlanId(planId: string): void {
  try {
    localStorage.setItem(ACTIVE_PLAN_ID_KEY, planId);
  } catch {}
}

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
