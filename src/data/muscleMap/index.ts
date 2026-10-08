import { BodyGender, BodySide, BodyPartPathData, BodyViewBox, Muscle } from './types';
import { maleFrontPaths } from './male-front-paths';
import { maleBackPaths } from './male-back-paths';
import { femaleFrontPaths } from './female-front-paths';
import { femaleBackPaths } from './female-back-paths';

export * from './types';
export { maleFrontPaths, maleBackPaths, femaleFrontPaths, femaleBackPaths };

export const VIEW_BOXES: Record<string, BodyViewBox> = {
  'male-front': { originX: 0, originY: 95, width: 727, height: 1280 },
  'male-back': { originX: 718, originY: 95, width: 727, height: 1280 },
  'female-front': { originX: 0, originY: 0, width: 650, height: 1450 },
  'female-back': { originX: 823, originY: 0, width: 650, height: 1450 },
};

export function getBodyPaths(gender: BodyGender, side: BodySide): BodyPartPathData[] {
  const key = `${gender}-${side}`;
  switch (key) {
    case 'male-front':
      return maleFrontPaths;
    case 'male-back':
      return maleBackPaths;
    case 'female-front':
      return femaleFrontPaths;
    case 'female-back':
      return femaleBackPaths;
    default:
      return maleFrontPaths;
  }
}

export function getViewBox(gender: BodyGender, side: BodySide): BodyViewBox {
  return VIEW_BOXES[`${gender}-${side}`] ?? VIEW_BOXES['male-front'];
}

/**
 * Mapping from free-exercise-db muscle identifiers to MuscleMap muscles.
 * Supports granular sub-groups like 'front-deltoid' (Front Delt),
 * 'trapezius' (Trapezoid / Traps), 'upper-chest', 'inner-quad', etc.
 */
export const FREE_DB_TO_MUSCLEMAP: Record<string, Muscle[]> = {
  shoulders: ['front-deltoid', 'deltoids'],
  traps: ['trapezius', 'upper-trapezius'],
  chest: ['chest', 'upper-chest', 'lower-chest'],
  biceps: ['biceps'],
  triceps: ['triceps'],
  forearms: ['forearm'],
  abdominals: ['abs', 'upper-abs', 'lower-abs', 'obliques'],
  lats: ['upper-back'],
  'middle back': ['upper-back', 'rhomboids', 'trapezius'],
  'lower back': ['lower-back'],
  glutes: ['gluteal'],
  quadriceps: ['quadriceps', 'inner-quad', 'outer-quad'],
  hamstrings: ['hamstring'],
  calves: ['calves', 'tibialis'],
  adductors: ['adductors'],
  neck: ['neck', 'trapezius'],
};

/**
 * Resolve which muscles to highlight given an exercise's muscle keys & title.
 */
export function resolveExerciseMuscles(
  primaryMuscles: string[] = [],
  secondaryMuscles: string[] = [],
  exerciseName = ''
): { primary: Set<Muscle>; secondary: Set<Muscle> } {
  const primarySet = new Set<Muscle>();
  const secondarySet = new Set<Muscle>();
  const lowerName = exerciseName.toLowerCase();

  // Fine-tuned overrides based on exercise name keywords
  const isFrontDeltHeavy =
    lowerName.includes('front raise') ||
    lowerName.includes('military press') ||
    lowerName.includes('overhead press') ||
    lowerName.includes('shoulder press') ||
    lowerName.includes('incline');

  const isRearDeltHeavy =
    lowerName.includes('rear delt') ||
    lowerName.includes('reverse fly') ||
    lowerName.includes('face pull');

  const isTrapHeavy =
    lowerName.includes('shrug') ||
    lowerName.includes('upright row') ||
    lowerName.includes('high pull') ||
    lowerName.includes('farmer');

  const isUpperChest = lowerName.includes('incline');
  const isLowerChest = lowerName.includes('decline') || lowerName.includes('dip');

  primaryMuscles.forEach((pm) => {
    const mapped = FREE_DB_TO_MUSCLEMAP[pm.toLowerCase()] || [];
    mapped.forEach((m) => primarySet.add(m));

    if (pm.toLowerCase() === 'shoulders') {
      if (isFrontDeltHeavy) {
        primarySet.add('front-deltoid');
      }
      if (isRearDeltHeavy) {
        primarySet.add('rear-deltoid');
      }
    }
    if (pm.toLowerCase() === 'traps' || isTrapHeavy) {
      primarySet.add('trapezius');
      primarySet.add('upper-trapezius');
    }
    if (pm.toLowerCase() === 'chest') {
      if (isUpperChest) primarySet.add('upper-chest');
      if (isLowerChest) primarySet.add('lower-chest');
    }
  });

  secondaryMuscles.forEach((sm) => {
    const mapped = FREE_DB_TO_MUSCLEMAP[sm.toLowerCase()] || [];
    mapped.forEach((m) => {
      if (!primarySet.has(m)) secondarySet.add(m);
    });
  });

  return { primary: primarySet, secondary: secondarySet };
}
