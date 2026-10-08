import { MuscleGroupKey } from '../types/exercise';

export interface MuscleGroupInfo {
  key: MuscleGroupKey;
  name: string;
  tagline: string;
  dbMuscles: string[]; // matches free-exercise-db primaryMuscles
  highlighterMuscles: string[]; // matches react-body-highlighter
  viewDefault: 'anterior' | 'posterior';
  colorHex: string;
  iconName: string;
  benefits: string[];
}

export const MUSCLE_GROUPS: MuscleGroupInfo[] = [
  {
    key: 'chest',
    name: 'Chest',
    tagline: 'Pectorals & pushing power',
    dbMuscles: ['chest'],
    highlighterMuscles: ['chest'],
    viewDefault: 'anterior',
    colorHex: '#FF334B',
    iconName: 'Flame',
    benefits: ['Upper body push strength', 'Shoulder stability', 'Pectoral hypertrophy'],
  },
  {
    key: 'back',
    name: 'Back',
    tagline: 'Lats, traps & spine erectors',
    dbMuscles: ['middle back', 'lower back', 'lats', 'traps'],
    highlighterMuscles: ['upper-back', 'lower-back', 'trapezius'],
    viewDefault: 'posterior',
    colorHex: '#38BDF8',
    iconName: 'Shield',
    benefits: ['V-taper silhouette', 'Spinal posture', 'Pulling force & grip'],
  },
  {
    key: 'shoulders',
    name: 'Shoulders',
    tagline: 'Deltoids & overhead stability',
    dbMuscles: ['shoulders'],
    highlighterMuscles: ['front-deltoids', 'back-deltoids'],
    viewDefault: 'anterior',
    colorHex: '#F59E0B',
    iconName: 'Maximize2',
    benefits: ['Shoulder width', 'Overhead strength', 'Rotator cuff health'],
  },
  {
    key: 'biceps',
    name: 'Biceps',
    tagline: 'Arm flexors & forearms',
    dbMuscles: ['biceps', 'forearms'],
    highlighterMuscles: ['biceps', 'forearm'],
    viewDefault: 'anterior',
    colorHex: '#EC4899',
    iconName: 'Zap',
    benefits: ['Arm size & peak', 'Pulling flexion', 'Grip endurance'],
  },
  {
    key: 'triceps',
    name: 'Triceps',
    tagline: 'Arm extension & pressing lockout',
    dbMuscles: ['triceps'],
    highlighterMuscles: ['triceps'],
    viewDefault: 'posterior',
    colorHex: '#A855F7',
    iconName: 'TrendingUp',
    benefits: ['60% of total arm mass', 'Bench lockout power', 'Elbow resilience'],
  },
  {
    key: 'legs',
    name: 'Legs',
    tagline: 'Quads, hamstrings & calves',
    dbMuscles: ['quadriceps', 'hamstrings', 'calves', 'adductors', 'abductors'],
    highlighterMuscles: ['quadriceps', 'hamstring', 'calves', 'adductor', 'abductors'],
    viewDefault: 'anterior',
    colorHex: '#10B981',
    iconName: 'Dumbbell',
    benefits: ['Total body power', 'Metabolic burn', 'Athletic explosiveness'],
  },
  {
    key: 'glutes',
    name: 'Glutes',
    tagline: 'Maximus, medius & hip drive',
    dbMuscles: ['glutes'],
    highlighterMuscles: ['gluteal'],
    viewDefault: 'posterior',
    colorHex: '#FB923C',
    iconName: 'Activity',
    benefits: ['Hip extension drive', 'Lower back relief', 'Sprinting speed'],
  },
  {
    key: 'abs',
    name: 'Abs',
    tagline: 'Core, rectus & obliques',
    dbMuscles: ['abdominals'],
    highlighterMuscles: ['abs', 'obliques'],
    viewDefault: 'anterior',
    colorHex: '#06B6D4',
    iconName: 'Compass',
    benefits: ['Core brace stabilization', 'Anti-rotation control', 'Spine protection'],
  },
];

// Mapping helper from free-exercise-db muscle string to react-body-highlighter Muscle identifiers
export const FREE_DB_TO_HIGHLIGHTER_MAP: Record<string, string[]> = {
  abdominals: ['abs', 'obliques'],
  chest: ['chest'],
  biceps: ['biceps'],
  triceps: ['triceps'],
  shoulders: ['front-deltoids', 'back-deltoids'],
  'middle back': ['upper-back'],
  lats: ['upper-back'],
  'lower back': ['lower-back'],
  traps: ['trapezius'],
  forearms: ['forearm'],
  glutes: ['gluteal'],
  hamstrings: ['hamstring'],
  quadriceps: ['quadriceps'],
  calves: ['calves'],
  adductors: ['adductor'],
  abductors: ['abductors'],
  neck: ['neck'],
};

// Posterior-focused muscles helper
const POSTERIOR_DOMINANT = new Set([
  'middle back',
  'lats',
  'lower back',
  'traps',
  'triceps',
  'glutes',
  'hamstrings',
]);

export function getDominantBodyView(primaryMuscles: string[]): 'anterior' | 'posterior' {
  if (!primaryMuscles || primaryMuscles.length === 0) return 'anterior';
  const posteriorCount = primaryMuscles.filter((m) =>
    POSTERIOR_DOMINANT.has(m.toLowerCase())
  ).length;
  return posteriorCount > primaryMuscles.length / 2 ? 'posterior' : 'anterior';
}
