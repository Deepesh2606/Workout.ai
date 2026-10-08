export type MuscleGroupKey =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'legs'
  | 'glutes'
  | 'abs';

export interface RawExercise {
  id: string;
  name: string;
  force?: string | null;
  level: 'beginner' | 'intermediate' | 'expert' | string;
  mechanic?: 'compound' | 'isolation' | string | null;
  equipment?: string | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  reps: number;
  weight?: number;
  completed?: boolean;
}

export interface WorkoutItem {
  id: string;
  exerciseId: string;
  exercise: RawExercise;
  sets: WorkoutSet[];
  notes?: string;
  restSeconds?: number;
}

export interface WorkoutDayPlan {
  id: string;
  name: string;
  dayLabel: string;
  description?: string;
  items: WorkoutItem[];
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = 'home' | 'exercises' | 'detail' | 'builder' | 'heatmap';
