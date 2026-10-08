import { RawExercise } from '../types/exercise';

export interface FormCue {
  title: string;
  description: string;
  cue: string;
}

export interface FormGuide {
  correctForm: {
    keyTips: FormCue[];
    breathing: string;
    tempo: string;
  };
  commonMistakes: {
    mistakes: FormCue[];
    riskFactor: string;
    correction: string;
  };
}

const SPECIFIC_FORM_DATA: Record<string, FormGuide> = {
  // Barbell Bench Press & chest presses
  bench: {
    correctForm: {
      keyTips: [
        {
          title: 'Retract & Depress Scapulae',
          description: 'Pinch shoulder blades together and pin them into the bench to protect the rotator cuff.',
          cue: 'Tuck shoulders into your back pockets.',
        },
        {
          title: '45-Degree Elbow Angle',
          description: 'Keep elbows tucked at roughly 45 to 70 degrees from torso, rather than flared at 90 degrees.',
          cue: 'Create an arrow shape with your torso, not a T.',
        },
        {
          title: 'Full Range of Motion & Leg Drive',
          description: 'Touch lower sternum gently with control, driving heels firmly through the floor.',
          cue: 'Press the floor away with your feet as you press the bar.',
        },
      ],
      breathing: 'Inhale and brace diaphragm on the descent; exhale forcefully past the sticking point.',
      tempo: '2s controlled negative, 0.5s pause at chest, explosive 1s drive up.',
    },
    commonMistakes: {
      mistakes: [
        {
          title: 'Flaring Elbows at 90°',
          description: 'Over-flaring places extreme impingement stress on the anterior shoulder capsule.',
          cue: 'Tuck elbows closer to ribs.',
        },
        {
          title: 'Bouncing Bar off Sternum',
          description: 'Using ribs as a trampoline reduces pec recruitment and risks cartilage fractures.',
          cue: 'Pause momentarily on chest with muscle tension.',
        },
        {
          title: 'Lifting Hips off the Bench',
          description: 'Excessive hyperextension risks lumbar strain and disqualifies legitimate rep tension.',
          cue: 'Keep glutes glued to the pad at all times.',
        },
      ],
      riskFactor: 'High risk of rotator cuff tear and acromioclavicular (AC) joint impingement.',
      correction: 'Drop weight by 20%, tuck scapulae tightly, and focus on strict pectoral squeeze.',
    },
  },

  // Squats
  squat: {
    correctForm: {
      keyTips: [
        {
          title: 'Brace 360° Core & Neutral Spine',
          description: 'Inhale deep into abdomen using Valsalva brace; maintain natural lumbar curve.',
          cue: 'Tighten stomach as if preparing to take a punch.',
        },
        {
          title: 'Knees Tracking Over Toes',
          description: 'Drive knees outward in line with middle toes to activate glute medius and protect ligaments.',
          cue: 'Screw your feet into the ground.',
        },
        {
          title: 'Hit Parallel Depth',
          description: 'Crease of hip must descend at or just below top of knee joint for complete quad & glute activation.',
          cue: 'Sit between your hips, not back behind them.',
        },
      ],
      breathing: 'Deep intra-abdominal breath at top, hold through descent, exhale on ascent top third.',
      tempo: '3s eccentric descent, 1s stable in the hole, explosive ascent.',
    },
    commonMistakes: {
      mistakes: [
        {
          title: 'Knee Valgus (Knees Caving)',
          description: 'Knees collapsing inward puts lethal torsion on the ACL and meniscus.',
          cue: 'Actively push knees out against an imaginary mini-band.',
        },
        {
          title: 'Heels Rising Off Floor',
          description: 'Shifting weight to toes collapses thoracic stability and strains patellar tendons.',
          cue: 'Distribute balance through tripod foot (heel, big toe, pinky toe).',
        },
        {
          title: 'Butt Wink (Lumbar Flexion)',
          description: 'Pelvis tucking under at bottom rounds lower back under heavy spinal load.',
          cue: 'Work on ankle dorsiflexion and stop right at your active mobility threshold.',
        },
      ],
      riskFactor: 'Severe risk of lumbar disc herniation and patellar tendinopathy.',
      correction: 'Elevate heels with plates or squat shoes and drill hip mobility prior to loading.',
    },
  },

  // Deadlifts & Hip Hinges
  deadlift: {
    correctForm: {
      keyTips: [
        {
          title: 'Lock In Lats & Wedge Hips',
          description: 'Engage lats by pulling bar into shins; wedge hips down and forward into starting pocket.',
          cue: 'Bend the bar around your shins and squeeze oranges in armpits.',
        },
        {
          title: 'Push Floor Away (Leg Press)',
          description: 'Initiate by driving quads into the floor rather than yanking with upper back.',
          cue: 'Think of pushing the earth down, not lifting the bar up.',
        },
        {
          title: 'Keep Bar Glued to Body',
          description: 'Bar path should be a straight vertical line skimming shins and thighs.',
          cue: 'Shave your legs with the bar.',
        },
      ],
      breathing: 'Huge belly breath at setup, hold tension on pull, exhale at lockout.',
      tempo: '1s explosive concentric pull, 2s hinge back down under control.',
    },
    commonMistakes: {
      mistakes: [
        {
          title: 'Cat-Back (Spinal Rounding)',
          description: 'Pulling with rounded lower lumbar transfers sheer load directly into intervertebral discs.',
          cue: 'Reset setup: chest proud, hips hinged back, spine stiff like a steel rod.',
        },
        {
          title: 'Hyperextending at Lockout',
          description: 'Leaning backward at top crunches lumbar facet joints with zero extra glute benefit.',
          cue: 'Stand tall and squeeze glutes tight; do not lean backward.',
        },
        {
          title: 'Bar Drifting Away From Shins',
          description: 'Even 2 inches of forward drift exponentially increases torque on lower spine.',
          cue: 'Engage lats to drag the bar against clothing.',
        },
      ],
      riskFactor: 'Catastrophic lumbar disc rupture and hamstring muscle belly strains.',
      correction: 'Elevate bar onto blocks or switch to Romanian Deadlifts to master pure hip hinge.',
    },
  },

  // Pull-ups & Lat Pulldowns
  pullup: {
    correctForm: {
      keyTips: [
        {
          title: 'Initiate With Scapular Depression',
          description: 'Depress shoulders down before bending elbows to ensure latissimus dorsi prime mover recruitment.',
          cue: 'Pull shoulders away from ears before arms bend.',
        },
        {
          title: 'Drive Elbows Down and Back',
          description: 'Focus on leading with elbows towards back pockets rather than pulling with wrists/forearms.',
          cue: 'Drive elbows into ribs.',
        },
        {
          title: 'Full Dead-Hang to Chin Over Bar',
          description: 'Allow full overhead stretch at bottom, pull chest up toward bar at peak.',
          cue: 'Aim upper chest to bar, not just chin reaching up.',
        },
      ],
      breathing: 'Exhale during concentric pull upwards, inhale deeply during controlled descent.',
      tempo: '1s concentric pull, 1s isometric peak squeeze, 3s controlled lowering.',
    },
    commonMistakes: {
      mistakes: [
        {
          title: 'Kicking & Kipping Legs',
          description: 'Using swinging momentum transfers workload away from back muscles onto connective tissue.',
          cue: 'Cross ankles and squeeze glutes to keep lower body rigid.',
        },
        {
          title: 'Rounding Shoulders Forward at Top',
          description: 'Hunching forward at peak places anterior capsule under impingement and shuts off lats.',
          cue: 'Keep chest lifted proud and collarbones wide.',
        },
        {
          title: 'Partial Half-Reps',
          description: 'Cutting out bottom stretch loses the most hypertrophic portion of the movement.',
          cue: 'Lower fully until arms are straight before next rep.',
        },
      ],
      riskFactor: 'Biceps tendon irritation and shoulder anterior glide syndrome.',
      correction: 'Use resistance band assistance or slow eccentric negatives to build true full-range strength.',
    },
  },
};

export function getExerciseFormGuide(exercise: RawExercise): FormGuide {
  const nameLower = exercise.name.toLowerCase();
  const primary = (exercise.primaryMuscles[0] || '').toLowerCase();
  const equipment = (exercise.equipment || '').toLowerCase();

  // Match specific known patterns
  if (nameLower.includes('bench') || nameLower.includes('press') && primary === 'chest') {
    return SPECIFIC_FORM_DATA.bench;
  }
  if (nameLower.includes('squat') || nameLower.includes('leg press')) {
    return SPECIFIC_FORM_DATA.squat;
  }
  if (nameLower.includes('deadlift') || nameLower.includes('romanian') || nameLower.includes('good morning')) {
    return SPECIFIC_FORM_DATA.deadlift;
  }
  if (nameLower.includes('pull-up') || nameLower.includes('chin-up') || nameLower.includes('lat pulldown') || nameLower.includes('pulldown')) {
    return SPECIFIC_FORM_DATA.pullup;
  }

  // Domain-intelligent generator based on muscle group and exercise details
  if (primary.includes('chest')) {
    return {
      correctForm: {
        keyTips: [
          {
            title: 'Scapular Stability',
            description: 'Keep shoulder blades retracted and pinned down to isolate chest fibers.',
            cue: 'Chest proud, shoulders back and down.',
          },
          {
            title: 'Peak Contraction Squeeze',
            description: 'Focus on squeezing biceps together across the chest at the apex of movement.',
            cue: 'Bring your inner elbows toward each other.',
          },
          {
            title: 'Controlled Eccentric',
            description: 'Resist the weight on the lowering phase to maximize stretch-mediated hypertrophy.',
            cue: 'Count 2-3 seconds down before pressing.',
          },
        ],
        breathing: 'Inhale on the stretch/descent; exhale forcefully as you drive into peak contraction.',
        tempo: '2s eccentric, 1s pause at stretch, 1s powerful contraction.',
      },
      commonMistakes: {
        mistakes: [
          {
            title: 'Shoulders Rolling Forward',
            description: 'Protracted shoulders shift load to front deltoids and strain rotator cuffs.',
            cue: 'Keep chest higher than your shoulders throughout.',
          },
          {
            title: 'Bouncing or Chopping Motion',
            description: 'Using rapid bounces removes muscle tension and increases tendon shear.',
            cue: 'Stop half an inch before joint lockout and maintain continuous tension.',
          },
          {
            title: 'Flaring Elbows Too Wide',
            description: 'Perpendicular angles stress acromion joint capsule unnecessarily.',
            cue: 'Keep elbows at approximately 60 degrees from torso.',
          },
        ],
        riskFactor: 'Anterior shoulder tendonitis and pectoral tear risk under heavy loading.',
        correction: 'Reduce working weight, tighten shoulder blades against back, and move at a controlled cadence.',
      },
    };
  }

  if (primary.includes('back') || primary.includes('lats') || primary.includes('traps')) {
    return {
      correctForm: {
        keyTips: [
          {
            title: 'Initiate From Back, Not Arms',
            description: 'Retract scapulae first so back musculature takes the load rather than biceps.',
            cue: 'Think of hands as hooks and pull with elbows.',
          },
          {
            title: 'Chest Tall & Spine Neutral',
            description: 'Avoid spinal hunching by maintaining an active core brace throughout each rep.',
            cue: 'Proud chest facing straight forward.',
          },
          {
            title: 'Full Stretch at Extension',
            description: 'Allow latissimus dorsi to stretch fully forward before initiating the pull.',
            cue: 'Feel the ribs expand as lats lengthen.',
          },
        ],
        breathing: 'Inhale during the stretch/extension; exhale as you pull and squeeze shoulder blades.',
        tempo: '2-3s controlled stretch, 1s explosive pull, 1s hard isometric squeeze.',
      },
      commonMistakes: {
        mistakes: [
          {
            title: 'Torso Momentum & Rocking',
            description: 'Swinging the torso back and forth cheats the back muscles out of mechanical tension.',
            cue: 'Keep torso stationary and isolated; move only arms and shoulder blades.',
          },
          {
            title: 'Incomplete Range of Motion',
            description: 'Shortchanging the lockout squeeze limits latissimus and rhomboid fiber recruitment.',
            cue: 'Drive elbows back past your ribcage on every rep.',
          },
          {
            title: 'Rounding the Upper Back',
            description: 'Slumping shoulders forward disengages traps and strains spinal erectors.',
            cue: 'Depress scapulae downward.',
          },
        ],
        riskFactor: 'Cervical neck strain and lower back hyperextension.',
        correction: 'Lower weight by 15%, lock hips in place, and pause for a 1-second squeeze on contraction.',
      },
    };
  }

  if (primary.includes('biceps') || primary.includes('triceps') || primary.includes('forearms')) {
    return {
      correctForm: {
        keyTips: [
          {
            title: 'Pin Elbows in Fixed Position',
            description: 'Elbows should act as a stable hinge and remain pinned to your sides without drifting.',
            cue: 'Glue elbows to your ribs like hinges.',
          },
          {
            title: 'Full Range Contraction & Lockout',
            description: 'Contract fully at the apex and allow a complete stretch at the bottom without resting.',
            cue: 'Squeeze the muscle hard at the peak for one full second.',
          },
          {
            title: 'Neutral Wrists',
            description: 'Keep wrists straight and aligned with forearms to prevent carpal strain.',
            cue: 'Solid knuckles, no backward wrist bend.',
          },
        ],
        breathing: 'Inhale on the lengthening phase; exhale smoothly through the contraction.',
        tempo: '2s eccentric descent, 1s peak squeeze at top.',
      },
      commonMistakes: {
        mistakes: [
          {
            title: 'Swinging Torso & Hips',
            description: 'Using hip drive turns an isolation arm movement into a sloppy full-body swing.',
            cue: 'Stand against a wall or brace core tight to eliminate body sway.',
          },
          {
            title: 'Drifting Elbows Forward',
            description: 'Moving elbows forward recruits front deltoids and takes tension off the arm muscles.',
            cue: 'Keep elbows tucked back and down.',
          },
          {
            title: 'Dropping the Weight Quickly',
            description: 'Gravity does the eccentric work when dropping the weight, missing 50% of muscle growth stimulus.',
            cue: 'Fight the weight down smoothly.',
          },
        ],
        riskFactor: 'Distal biceps tendonitis and medial/lateral epicondylitis (tennis/golfer elbow).',
        correction: 'Strip ego weight, stand firm, and maintain deliberate continuous muscular tension.',
      },
    };
  }

  if (primary.includes('quadriceps') || primary.includes('hamstring') || primary.includes('calves') || primary.includes('glutes')) {
    return {
      correctForm: {
        keyTips: [
          {
            title: 'Root Feet & Maintain Knee Alignment',
            description: 'Distribute weight evenly through whole foot and track knees over second toe.',
            cue: 'Spread toes and grip the floor with tripod balance.',
          },
          {
            title: 'Control Depth & Pelvic Alignment',
            description: 'Reach deep active range without allowing pelvis to tuck or lower back to round.',
            cue: 'Move through your hips while keeping spine rigid.',
          },
          {
            title: 'Squeeze Target Muscle at Lockout',
            description: 'Contract glutes and quads firmly at the peak of the repetition.',
            cue: 'Lock knees softly, squeeze glutes hard.',
          },
        ],
        breathing: 'Inhale and brace core during descent; exhale as you push into lockout.',
        tempo: '3s controlled descent, 1s explosive drive up.',
      },
      commonMistakes: {
        mistakes: [
          {
            title: 'Knees Caving Inward',
            description: 'Internal rotation stresses knee ligaments and indicates weak glute medius activation.',
            cue: 'Drive knees outward against external rotational pressure.',
          },
          {
            title: 'Heels Popping Off Floor',
            description: 'Shifting weight forward overloads the patella tendon and reduces hamstring involvement.',
            cue: 'Drive force straight down through the center of your heels.',
          },
          {
            title: 'Rushing Through Reps',
            description: 'Bouncing at bottom puts dangerous ballistic shock on joints.',
            cue: 'Control the descent with intent.',
          },
        ],
        riskFactor: 'Patellar tendon inflammation and lower back compression.',
        correction: 'Warm up hips with glute bridges and focus on controlled tempo with flat stable footwear.',
      },
    };
  }

  // Default core / general
  return {
    correctForm: {
      keyTips: [
        {
          title: '360° Core Brace',
          description: 'Draw navel in slightly while expanding ribs outward to create solid cylinder of pressure.',
          cue: 'Brace as if taking a punch.',
        },
        {
          title: 'Controlled Cadence',
          description: 'Execute each rep with deliberate muscular control rather than momentum.',
          cue: 'Command the weight, do not let it command you.',
        },
        {
          title: 'Full Muscle Stretch & Squeeze',
          description: 'Travel through complete active range of motion for optimal fiber recruitment.',
          cue: 'Reach full extension, then contract hard.',
        },
      ],
      breathing: 'Inhale during preparation and lengthening; exhale during the exertion phase.',
      tempo: '2s eccentric, 1s hold, 1s concentric.',
    },
    commonMistakes: {
      mistakes: [
        {
          title: 'Using Inertia and Momentum',
          description: 'Jerking or swinging the body eliminates muscular work and stresses joint capsules.',
          cue: 'Pause for 1 second at the midpoint to verify muscle tension.',
        },
        {
          title: 'Holding Breath (Hypoxia)',
          description: 'Failing to breathe spikes blood pressure without enhancing muscular recruitment.',
          cue: 'Rhythmic audible breathing on every repetition.',
        },
        {
          title: 'Compromised Spine Alignment',
          description: 'Twisting or hyperextending outside the exercise plane risks spinal subluxation.',
          cue: 'Keep eyes focused forward and spine aligned with hips.',
        },
      ],
      riskFactor: 'Excessive connective tissue wear and ligamentous strain.',
      correction: 'Focus on perfect form over repetition count, pausing when technique begins to break down.',
    },
  };
}
