import { RawExercise, MuscleGroupKey } from '../types/exercise';
import { FALLBACK_EXERCISES } from '../data/fallbackExercises';
import { MUSCLE_GROUPS } from '../data/muscleGroups';

const EXERCISE_CACHE_KEY = 'youcan_exercises_cache_v3';
const JSDELIVR_RAW_URL =
  'https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/dist/exercises.json';
const GITHUB_RAW_URL =
  'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const CDN_IMAGE_BASE =
  'https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/';

export function getExerciseImageUrl(imagePath?: string): string {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${CDN_IMAGE_BASE}${encodeURI(imagePath)}`;
}

export function getStoredExercisesSync(): RawExercise[] {
  try {
    const cached = localStorage.getItem(EXERCISE_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return FALLBACK_EXERCISES;
}

export async function fetchExercisesWithCache(): Promise<{
  exercises: RawExercise[];
  isFromCache: boolean;
}> {
  // 1. Check localStorage first
  try {
    const cached = localStorage.getItem(EXERCISE_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { exercises: parsed, isFromCache: true };
      }
    }
  } catch (err) {
    console.warn('Could not read exercises from localStorage', err);
  }

  // 2. Fetch from jsDelivr CDN (or GitHub fallback)
  try {
    let res = await fetch(JSDELIVR_RAW_URL, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      res = await fetch(GITHUB_RAW_URL, {
        headers: { Accept: 'application/json' },
      });
    }

    if (res.ok) {
      const data: RawExercise[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        try {
          localStorage.setItem(EXERCISE_CACHE_KEY, JSON.stringify(data));
        } catch (storageErr) {
          console.warn('Failed to cache exercises in localStorage', storageErr);
        }
        return { exercises: data, isFromCache: false };
      }
    }
  } catch (fetchErr) {
    console.warn('Error fetching free-exercise-db, using fallback:', fetchErr);
  }

  // 3. Fallback to bundled exercises
  return { exercises: FALLBACK_EXERCISES, isFromCache: false };
}

export async function syncExercisesBackground(
  onUpdate?: (fresh: RawExercise[]) => void
): Promise<void> {
  try {
    let res = await fetch(JSDELIVR_RAW_URL);
    if (!res.ok) {
      res = await fetch(GITHUB_RAW_URL);
    }
    if (!res.ok) return;

    const data: RawExercise[] = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      try {
        localStorage.setItem(EXERCISE_CACHE_KEY, JSON.stringify(data));
      } catch {}
      if (onUpdate) {
        onUpdate(data);
      }
    }
  } catch {
    // Ignore background refresh errors
  }
}

export function filterExercises(
  exercises: RawExercise[],
  options: {
    search?: string;
    muscleGroup?: MuscleGroupKey | null;
    equipment?: string;
    level?: string;
    mechanic?: string;
  }
): RawExercise[] {
  const { search, muscleGroup, equipment, level, mechanic } = options;

  let targetDbMuscles: string[] = [];
  if (muscleGroup) {
    const groupInfo = MUSCLE_GROUPS.find((g) => g.key === muscleGroup);
    if (groupInfo) {
      targetDbMuscles = groupInfo.dbMuscles.map((m) => m.toLowerCase());
    }
  }

  const query = search ? search.toLowerCase().trim() : '';

  return exercises.filter((ex) => {
    // Search query check
    if (query) {
      const matchName = ex.name.toLowerCase().includes(query);
      const matchPrimary = (ex.primaryMuscles || []).some((m) =>
        m.toLowerCase().includes(query)
      );
      const matchCategory = ex.category?.toLowerCase().includes(query);
      const matchEquip = ex.equipment?.toLowerCase().includes(query);
      if (!matchName && !matchPrimary && !matchCategory && !matchEquip) {
        return false;
      }
    }

    // Muscle group check
    if (muscleGroup && targetDbMuscles.length > 0) {
      const matchesMuscle = (ex.primaryMuscles || []).some((m) =>
        targetDbMuscles.includes(m.toLowerCase())
      );
      if (!matchesMuscle) {
        return false;
      }
    }

    // Equipment filter
    if (equipment && equipment !== 'all') {
      if ((ex.equipment || 'none').toLowerCase() !== equipment.toLowerCase()) {
        return false;
      }
    }

    // Level filter
    if (level && level !== 'all') {
      if ((ex.level || '').toLowerCase() !== level.toLowerCase()) {
        return false;
      }
    }

    // Mechanic filter
    if (mechanic && mechanic !== 'all') {
      if ((ex.mechanic || '').toLowerCase() !== mechanic.toLowerCase()) {
        return false;
      }
    }

    return true;
  });
}
