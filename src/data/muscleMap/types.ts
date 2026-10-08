/**
 * MuscleMap — Core Types & Muscle Definitions
 * Based on melihcolpan/MuscleMap SVG anatomy data
 */

export type Muscle =
  | 'abs' | 'biceps' | 'calves' | 'chest' | 'deltoids'
  | 'feet' | 'forearm' | 'gluteal' | 'hamstring' | 'hands'
  | 'head' | 'knees' | 'lower-back' | 'obliques' | 'quadriceps'
  | 'tibialis' | 'trapezius' | 'triceps' | 'upper-back'
  | 'rotator-cuff' | 'serratus' | 'rhomboids'
  // Sub-groups
  | 'ankles' | 'adductors' | 'neck' | 'hip-flexors'
  | 'upper-chest' | 'lower-chest' | 'inner-quad' | 'outer-quad'
  | 'upper-abs' | 'lower-abs' | 'front-deltoid' | 'rear-deltoid'
  | 'upper-trapezius' | 'lower-trapezius';

export type BodySlug = Muscle | 'hair';
export type MuscleSide = 'left' | 'right' | 'both';
export type BodySide = 'front' | 'back';
export type BodyGender = 'male' | 'female';

export interface BodyPartPathData {
  slug: BodySlug;
  common: string[];
  left: string[];
  right: string[];
}

export interface BodyViewBox {
  originX: number;
  originY: number;
  width: number;
  height: number;
}

/** Rich muscle information with anatomical and common terminology */
export interface MuscleMeta {
  id: Muscle;
  name: string; // Common display name (e.g. "Front Delt", "Trapezoid / Traps")
  anatomicalName: string; // Scientific anatomical name (e.g. "Anterior Deltoid", "Trapezius")
  aliasNames: string[]; // Aliases for matching (e.g. ["front delt", "front deltoid", "anterior deltoid"])
  parentGroup?: Muscle;
  bodySide: 'front' | 'back' | 'both';
  role: string; // Biomechanical action
}

export const MUSCLE_METADATA: Record<Muscle, MuscleMeta> = {
  'front-deltoid': {
    id: 'front-deltoid',
    name: 'Front Delt',
    anatomicalName: 'Anterior Deltoid',
    aliasNames: ['front delt', 'front deltoid', 'anterior deltoid', 'anterior delt', 'front shoulders'],
    parentGroup: 'deltoids',
    bodySide: 'front',
    role: 'Shoulder flexion & pressing power',
  },
  'deltoids': {
    id: 'deltoids',
    name: 'Side & Rear Delts',
    anatomicalName: 'Lateral & Posterior Deltoids',
    aliasNames: ['deltoids', 'delts', 'side delts', 'lateral delts', 'rear delts', 'shoulders'],
    bodySide: 'both',
    role: 'Shoulder abduction, rotation & 3D cap width',
  },
  'rear-deltoid': {
    id: 'rear-deltoid',
    name: 'Rear Delt',
    anatomicalName: 'Posterior Deltoid',
    aliasNames: ['rear delt', 'rear deltoid', 'posterior deltoid', 'posterior delt', 'back shoulders'],
    parentGroup: 'deltoids',
    bodySide: 'back',
    role: 'Shoulder horizontal abduction & postural integrity',
  },
  'trapezius': {
    id: 'trapezius',
    name: 'Trapezoid / Traps',
    anatomicalName: 'Trapezius',
    aliasNames: ['trapzoid', 'trapezoid', 'trapezius', 'traps', 'upper traps', 'middle traps'],
    bodySide: 'both',
    role: 'Scapular elevation, retraction & neck stabilization',
  },
  'upper-trapezius': {
    id: 'upper-trapezius',
    name: 'Upper Trapezoid',
    anatomicalName: 'Superior Trapezius',
    aliasNames: ['upper traps', 'upper trapezoid', 'neck traps'],
    parentGroup: 'trapezius',
    bodySide: 'back',
    role: 'Shoulder shrugging & cervical support',
  },
  'lower-trapezius': {
    id: 'lower-trapezius',
    name: 'Lower Trapezoid',
    anatomicalName: 'Inferior Trapezius',
    aliasNames: ['lower traps', 'lower trapezoid'],
    parentGroup: 'trapezius',
    bodySide: 'back',
    role: 'Scapular depression & overhead stability',
  },
  'chest': {
    id: 'chest',
    name: 'Chest',
    anatomicalName: 'Pectoralis Major',
    aliasNames: ['chest', 'pecs', 'pectorals', 'mid chest', 'sternal chest'],
    bodySide: 'front',
    role: 'Horizontal adduction & pressing force',
  },
  'upper-chest': {
    id: 'upper-chest',
    name: 'Upper Chest',
    anatomicalName: 'Clavicular Head of Pectoralis Major',
    aliasNames: ['upper chest', 'incline chest', 'clavicular pecs'],
    parentGroup: 'chest',
    bodySide: 'front',
    role: 'Incline pushing & upward humeral flexion',
  },
  'lower-chest': {
    id: 'lower-chest',
    name: 'Lower Chest',
    anatomicalName: 'Abdominal Head of Pectoralis Major',
    aliasNames: ['lower chest', 'decline chest', 'costal pecs'],
    parentGroup: 'chest',
    bodySide: 'front',
    role: 'Decline pushing & arm depression',
  },
  'biceps': {
    id: 'biceps',
    name: 'Biceps',
    anatomicalName: 'Biceps Brachii',
    aliasNames: ['biceps', 'bicep', 'biceps brachii', 'brachialis'],
    bodySide: 'front',
    role: 'Elbow flexion & forearm supination',
  },
  'triceps': {
    id: 'triceps',
    name: 'Triceps',
    anatomicalName: 'Triceps Brachii',
    aliasNames: ['triceps', 'tricep', 'triceps brachii', 'horseshoe'],
    bodySide: 'both',
    role: 'Elbow extension & lockout power',
  },
  'forearm': {
    id: 'forearm',
    name: 'Forearms',
    anatomicalName: 'Brachioradialis & Flexors',
    aliasNames: ['forearms', 'forearm', 'grip', 'brachioradialis'],
    bodySide: 'both',
    role: 'Grip strength, wrist flexion & extension',
  },
  'abs': {
    id: 'abs',
    name: 'Abs / Core',
    anatomicalName: 'Rectus Abdominis',
    aliasNames: ['abs', 'abdominals', 'six pack', 'core', 'rectus abdominis'],
    bodySide: 'front',
    role: 'Spine flexion & intra-abdominal pressure',
  },
  'upper-abs': {
    id: 'upper-abs',
    name: 'Upper Abs',
    anatomicalName: 'Superior Rectus Abdominis',
    aliasNames: ['upper abs', 'upper core'],
    parentGroup: 'abs',
    bodySide: 'front',
    role: 'Thoracic trunk flexion',
  },
  'lower-abs': {
    id: 'lower-abs',
    name: 'Lower Abs',
    anatomicalName: 'Inferior Rectus Abdominis',
    aliasNames: ['lower abs', 'lower core', 'pelvic brace'],
    parentGroup: 'abs',
    bodySide: 'front',
    role: 'Posterior pelvic tilt & leg elevation brace',
  },
  'obliques': {
    id: 'obliques',
    name: 'Obliques',
    anatomicalName: 'Internal & External Obliques',
    aliasNames: ['obliques', 'side abs', 'love handles', 'external obliques'],
    bodySide: 'front',
    role: 'Torso rotation & lateral trunk flexion',
  },
  'serratus': {
    id: 'serratus',
    name: 'Serratus Anterior',
    anatomicalName: 'Serratus Anterior',
    aliasNames: ['serratus', 'boxer muscle'],
    parentGroup: 'obliques',
    bodySide: 'front',
    role: 'Scapular protraction & upward rotation',
  },
  'upper-back': {
    id: 'upper-back',
    name: 'Lats & Upper Back',
    anatomicalName: 'Latissimus Dorsi & Rhomboids',
    aliasNames: ['upper back', 'middle back', 'lats', 'latissimus dorsi', 'rhomboids', 'teres major'],
    bodySide: 'back',
    role: 'V-taper pulling, arm adduction & row power',
  },
  'lower-back': {
    id: 'lower-back',
    name: 'Lower Back',
    anatomicalName: 'Erector Spinae',
    aliasNames: ['lower back', 'erector spinae', 'spinal erectors', 'lumbar'],
    bodySide: 'back',
    role: 'Spinal extension, posture & deadlift brace',
  },
  'gluteal': {
    id: 'gluteal',
    name: 'Glutes',
    anatomicalName: 'Gluteus Maximus & Medius',
    aliasNames: ['glutes', 'gluteal', 'butt', 'gluteus maximus', 'hips'],
    bodySide: 'back',
    role: 'Hip extension, sprinting propulsion & pelvic stability',
  },
  'quadriceps': {
    id: 'quadriceps',
    name: 'Quads',
    anatomicalName: 'Quadriceps Femoris',
    aliasNames: ['quadriceps', 'quads', 'front thighs', 'thighs', 'vastus lateralis'],
    bodySide: 'front',
    role: 'Knee extension & squat drive power',
  },
  'inner-quad': {
    id: 'inner-quad',
    name: 'Teardrop (Inner Quad)',
    anatomicalName: 'Vastus Medialis Oblique (VMO)',
    aliasNames: ['inner quad', 'vmo', 'teardrop'],
    parentGroup: 'quadriceps',
    bodySide: 'front',
    role: 'Terminal knee extension & patellar tracking',
  },
  'outer-quad': {
    id: 'outer-quad',
    name: 'Outer Quad Sweep',
    anatomicalName: 'Vastus Lateralis',
    aliasNames: ['outer quad', 'quad sweep', 'vastus lateralis'],
    parentGroup: 'quadriceps',
    bodySide: 'front',
    role: 'Thigh lateral mass & squat stabilization',
  },
  'hamstring': {
    id: 'hamstring',
    name: 'Hamstrings',
    anatomicalName: 'Biceps Femoris & Semitendinosus',
    aliasNames: ['hamstrings', 'hamstring', 'back of thighs', 'biceps femoris'],
    bodySide: 'back',
    role: 'Knee flexion, hip hinge & sprint deceleration',
  },
  'calves': {
    id: 'calves',
    name: 'Calves',
    anatomicalName: 'Gastrocnemius & Soleus',
    aliasNames: ['calves', 'calf', 'gastrocnemius', 'soleus'],
    bodySide: 'both',
    role: 'Plantar flexion, jumping & ankle stability',
  },
  'tibialis': {
    id: 'tibialis',
    name: 'Tibialis (Shins)',
    anatomicalName: 'Tibialis Anterior',
    aliasNames: ['tibialis', 'shins', 'shin'],
    bodySide: 'front',
    role: 'Dorsiflexion, deceleration & shin splint resilience',
  },
  'adductors': {
    id: 'adductors',
    name: 'Adductors',
    anatomicalName: 'Adductor Magnus & Longus',
    aliasNames: ['adductors', 'adductor', 'inner thighs', 'groin'],
    bodySide: 'front',
    role: 'Leg adduction & deep squat stabilization',
  },
  'hip-flexors': {
    id: 'hip-flexors',
    name: 'Hip Flexors',
    anatomicalName: 'Iliopsoas & Rectus Femoris',
    aliasNames: ['hip flexors', 'psoas', 'iliopsoas'],
    parentGroup: 'quadriceps',
    bodySide: 'front',
    role: 'Hip flexion & running stride',
  },
  'neck': {
    id: 'neck',
    name: 'Neck',
    anatomicalName: 'Sternocleidomastoid & Splenius',
    aliasNames: ['neck', 'cervical'],
    bodySide: 'both',
    role: 'Cervical rotation & head posture',
  },
  'head': {
    id: 'head',
    name: 'Head',
    anatomicalName: 'Cranium',
    aliasNames: ['head'],
    bodySide: 'both',
    role: 'Anatomical orientation reference',
  },
  'hands': {
    id: 'hands',
    name: 'Hands',
    anatomicalName: 'Manus & Digits',
    aliasNames: ['hands', 'grip'],
    bodySide: 'both',
    role: 'Tactile grip & holding',
  },
  'knees': {
    id: 'knees',
    name: 'Knees',
    anatomicalName: 'Patellar Joint',
    aliasNames: ['knees', 'patella'],
    bodySide: 'front',
    role: 'Leg hinge joint',
  },
  'feet': {
    id: 'feet',
    name: 'Feet',
    anatomicalName: 'Pes & Plantar Surface',
    aliasNames: ['feet', 'foot'],
    bodySide: 'both',
    role: 'Ground force transfer & balance base',
  },
  'ankles': {
    id: 'ankles',
    name: 'Ankles',
    anatomicalName: 'Talocrural Joint',
    aliasNames: ['ankles', 'ankle'],
    bodySide: 'both',
    role: 'Multiaxial foot joint',
  },
  'rotator-cuff': {
    id: 'rotator-cuff',
    name: 'Rotator Cuff',
    anatomicalName: 'Supraspinatus, Infraspinatus & Teres Minor',
    aliasNames: ['rotator cuff', 'infraspinatus', 'supraspinatus'],
    bodySide: 'back',
    role: 'Glenohumeral joint stabilization',
  },
  'rhomboids': {
    id: 'rhomboids',
    name: 'Rhomboids',
    anatomicalName: 'Rhomboid Major & Minor',
    aliasNames: ['rhomboids', 'rhomboid'],
    bodySide: 'back',
    role: 'Scapular retraction & posture',
  },
};
