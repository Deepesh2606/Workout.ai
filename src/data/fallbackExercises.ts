import { RawExercise } from '../types/exercise';

export const FALLBACK_EXERCISES: RawExercise[] = [
  {
    id: 'Barbell_Bench_Press_-_Medium_Grip',
    name: 'Barbell Bench Press',
    force: 'push',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'barbell',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    instructions: [
      'Lie back on a flat bench. Using a medium width grip, lift the bar from the rack and hold it straight over you with your arms locked.',
      'From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest.',
      'After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles.',
      'Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then begin coming down slowly again.'
    ],
    category: 'strength',
    images: [
      'Barbell_Bench_Press_-_Medium_Grip/0.jpg',
      'Barbell_Bench_Press_-_Medium_Grip/1.jpg'
    ]
  },
  {
    id: 'Barbell_Squat',
    name: 'Barbell Full Squat',
    force: 'push',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'barbell',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: ['glutes', 'hamstrings', 'calves', 'lower back'],
    instructions: [
      'This exercise is best performed inside a squat rack for safety purposes. Step under the bar and place it across the back of your shoulders.',
      'Hold on to the bar using both arms and lift it off the rack by pushing with your legs and straightening your torso.',
      'Step away from the rack and position your legs using a shoulder-width stance with the toes slightly pointed out. Keep your head up.',
      'Begin to slowly lower the bar by bending the knees and sitting back with your hips. Continue down until the angle between the upper leg and calves is slightly less than 90-degrees.',
      'Begin to raise the bar as you exhale by pushing the floor with the heel of your foot as you straighten the legs again and return to starting position.'
    ],
    category: 'strength',
    images: ['Barbell_Squat/0.jpg', 'Barbell_Squat/1.jpg']
  },
  {
    id: 'Barbell_Deadlift',
    name: 'Barbell Deadlift',
    force: 'pull',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'barbell',
    primaryMuscles: ['lower back'],
    secondaryMuscles: ['glutes', 'hamstrings', 'quadriceps', 'traps', 'forearms'],
    instructions: [
      'Stand facing the barbell with feet hip-width apart and toes pointing straight ahead.',
      'Bend at your hips and knees to grasp the bar with an overhand or alternate grip, hands shoulder-width apart.',
      'Keep your back straight, chest up, and pull your shoulder blades down and back.',
      'Drive through your heels and extend your hips and knees simultaneously to lift the bar, keeping it close to your shins.',
      'Stand tall at the top by squeezing your glutes, then return the bar to the ground by hinging at the hips under full control.'
    ],
    category: 'strength',
    images: ['Barbell_Deadlift/0.jpg', 'Barbell_Deadlift/1.jpg']
  },
  {
    id: 'Pullups',
    name: 'Pull-Up',
    force: 'pull',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'body only',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['biceps', 'middle back', 'shoulders'],
    instructions: [
      'Grab the pull-up bar with the palms facing forward using the prescribed grip (wider than shoulder width).',
      'As you have both arms extended in front of you holding the bar, bring your torso back around 30 degrees while creating a curvature on your lower back and sticking your chest out.',
      'Pull your torso up until the bar touches your upper chest by drawing the shoulders and the upper arms down and back. Exhale as you perform this portion of the movement.',
      'After a second at the contracted position, lower your torso back to the starting position until your arms and lats are fully extended.'
    ],
    category: 'strength',
    images: ['Pullups/0.jpg', 'Pullups/1.jpg']
  },
  {
    id: 'Dumbbell_Shoulder_Press',
    name: 'Dumbbell Shoulder Press',
    force: 'push',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'dumbbell',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'traps'],
    instructions: [
      'While sitting on a utility bench with back support, pick up the dumbbells and raise them to shoulder height.',
      'Rotate your wrists so that the palms of your hands are facing forward. This is your starting position.',
      'As you exhale, push the dumbbells upward until they touch at the top.',
      'After a brief pause at the top contracted position, slowly lower the weights back to the starting position as you inhale.'
    ],
    category: 'strength',
    images: ['Dumbbell_Shoulder_Press/0.jpg', 'Dumbbell_Shoulder_Press/1.jpg']
  },
  {
    id: 'Dumbbell_Bicep_Curl',
    name: 'Dumbbell Bicep Curl',
    force: 'pull',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'dumbbell',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    instructions: [
      'Stand up straight with a dumbbell in each hand held at arm\'s length. Keep your elbows close to your torso.',
      'While holding the upper arm stationary, curl the weights while contracting the biceps as you breathe out.',
      'Continue the movement until your biceps are fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a second.',
      'Slowly begin to bring the dumbbells back to starting position as your breathe in.'
    ],
    category: 'strength',
    images: ['Dumbbell_Bicep_Curl/0.jpg', 'Dumbbell_Bicep_Curl/1.jpg']
  },
  {
    id: 'Dips_-_Triceps_Version',
    name: 'Parallel Bar Triceps Dip',
    force: 'push',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'body only',
    primaryMuscles: ['triceps'],
    secondaryMuscles: ['chest', 'shoulders'],
    instructions: [
      'Hold your body at arms length above the parallel bars. Lock your elbows.',
      'While breathing in, lower yourself slowly with your torso upright and elbows close to your body until there is a 90 degree angle between upper arm and forearm.',
      'Exhale and push your torso back up using your triceps to bring your body back to the starting position.'
    ],
    category: 'strength',
    images: ['Dips_-_Triceps_Version/0.jpg', 'Dips_-_Triceps_Version/1.jpg']
  },
  {
    id: 'Barbell_Hip_Thrust',
    name: 'Barbell Hip Thrust',
    force: 'push',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'barbell',
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings', 'quadriceps'],
    instructions: [
      'Sit on the ground with your back against a bench and a padded barbell resting across your hips.',
      'Plant your feet firmly on the floor hip-width apart with knees bent at approximately 90 degrees.',
      'Drive through your heels to extend your hips upward until your thighs and torso form a straight horizontal line.',
      'Squeeze your glutes tightly at the top for a two-second pause before descending back under control.'
    ],
    category: 'strength',
    images: ['Barbell_Hip_Thrust/0.jpg', 'Barbell_Hip_Thrust/1.jpg']
  },
  {
    id: 'Plank',
    name: 'Plank Hold',
    force: 'pull',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'body only',
    primaryMuscles: ['abdominals'],
    secondaryMuscles: ['shoulders', 'glutes', 'lower back'],
    instructions: [
      'Get into a prone position on the floor, supporting your weight on your forearms and your toes.',
      'Your elbows should be directly beneath your shoulders with forearms parallel.',
      'Maintain a straight line through your body from your shoulders to your heels by flexing abdominal muscles and glutes.',
      'Hold this position for the prescribed duration while maintaining slow, deep breathing.'
    ],
    category: 'strength',
    images: ['Plank/0.jpg', 'Plank/1.jpg']
  },
  {
    id: 'Bent_Over_Barbell_Row',
    name: 'Bent Over Barbell Row',
    force: 'pull',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'barbell',
    primaryMuscles: ['middle back'],
    secondaryMuscles: ['biceps', 'lats', 'shoulders'],
    instructions: [
      'Holding a barbell with a pronated grip, bend your knees slightly and bring your torso forward by bending at the waist.',
      'Keep your back straight until it is almost parallel to the floor, with arms hanging perpendicular to the floor.',
      'While keeping the torso stationary, lift the barbell towards your lower sternum as you exhale.',
      'At the top contracted position, squeeze the back muscles and hold for a brief pause before lowering slowly.'
    ],
    category: 'strength',
    images: ['Bent_Over_Barbell_Row/0.jpg', 'Bent_Over_Barbell_Row/1.jpg']
  },
  {
    id: 'Standing_Calf_Raises',
    name: 'Standing Calf Raise',
    force: 'push',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'machine',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    instructions: [
      'Adjust the padded lever of the calf raise machine to fit your height.',
      'Place your shoulders under the pads and position the balls of your feet on the calf block with heels extending off.',
      'Raise your heels as high as possible by flexing the calf muscles and extending ankles. Hold contraction at top.',
      'Lower heels slowly down below the block level for a deep calf stretch.'
    ],
    category: 'strength',
    images: ['Standing_Calf_Raises/0.jpg', 'Standing_Calf_Raises/1.jpg']
  },
  {
    id: 'Incline_Dumbbell_Press',
    name: 'Incline Dumbbell Press',
    force: 'push',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'dumbbell',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    instructions: [
      'Lie back on an incline bench set to 30-45 degrees with a dumbbell in each hand atop your thighs.',
      'Raise the dumbbells to shoulder level using your thighs to propel them up.',
      'Rotate wrists forward so palms face away from you, and press dumbbells up until arms are extended overhead.',
      'Slowly lower the weights down to upper chest level with control, feeling a deep stretch in the upper pectorals.'
    ],
    category: 'strength',
    images: ['Incline_Dumbbell_Press/0.jpg', 'Incline_Dumbbell_Press/1.jpg']
  },
  {
    id: 'Romanian_Deadlift',
    name: 'Romanian Deadlift (RDL)',
    force: 'pull',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'barbell',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['glutes', 'lower back'],
    instructions: [
      'Hold a barbell at hip level with a shoulder-width grip. Keep your knees slightly unlocked but fixed.',
      'Hinge backward at your hips, sending your glutes toward the back wall while keeping the bar close to your legs.',
      'Descend until you feel a deep hamstring stretch just below knee level, maintaining a rigid spine.',
      'Drive hips forward forcefully to return to the starting standing position, contracting your glutes at the top.'
    ],
    category: 'strength',
    images: ['Romanian_Deadlift/0.jpg', 'Romanian_Deadlift/1.jpg']
  },
  {
    id: 'Side_Lateral_Raise',
    name: 'Dumbbell Lateral Raise',
    force: 'push',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'dumbbell',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['traps'],
    instructions: [
      'Stand with dumbbells at sides, palms facing inward and slight bend in elbows.',
      'Raise the dumbbells out to the sides until your arms are parallel to the floor.',
      'Ensure you lead with your elbows and keep wrists neutral, pinkies slightly higher than thumbs.',
      'Pause at the peak for a split second, then lower with a strict 2-second negative tempo.'
    ],
    category: 'strength',
    images: ['Side_Lateral_Raise/0.jpg', 'Side_Lateral_Raise/1.jpg']
  },
  {
    id: 'Cable_Crunch',
    name: 'Kneeling Cable Crunch',
    force: 'pull',
    level: 'intermediate',
    mechanic: 'isolation',
    equipment: 'cable',
    primaryMuscles: ['abdominals'],
    secondaryMuscles: [],
    instructions: [
      'Kneel below a high cable pulley with a rope attachment held next to your ears.',
      'Fix hips in place and flex through your spine to bring your elbows down toward your knees.',
      'Exhale and contract the abdominal wall forcefully at the bottom of the movement.',
      'Slowly uncurl and return to starting position, maintaining abdominal tension throughout.'
    ],
    category: 'strength',
    images: ['Cable_Crunch/0.jpg', 'Cable_Crunch/1.jpg']
  },
  {
    id: 'Barbell_Wrist_Curl',
    name: 'Barbell Wrist Curl',
    force: 'pull',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'barbell',
    primaryMuscles: ['forearms'],
    secondaryMuscles: [],
    instructions: [
      'Sit on a bench and hold a barbell with an underhand (supinated) grip, wrists hanging off the edge of your knees.',
      'Let the barbell roll down to your fingertips to maximise the stretch.',
      'Curl the barbell back up by flexing your wrists and squeezing the forearm flexors at the top.',
      'Lower under control and repeat for the prescribed reps without swinging the arms.'
    ],
    category: 'strength',
    images: ['Barbell_Wrist_Curl/0.jpg', 'Barbell_Wrist_Curl/1.jpg']
  },
  {
    id: 'Reverse_Barbell_Curl',
    name: 'Reverse Barbell Curl',
    force: 'pull',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'barbell',
    primaryMuscles: ['forearms'],
    secondaryMuscles: ['biceps'],
    instructions: [
      'Stand holding a barbell with a pronated (overhand) shoulder-width grip, arms fully extended.',
      'Keeping upper arms pinned to your sides, curl the bar upward by flexing wrists and elbows.',
      'Raise until forearms are perpendicular to the floor and brachioradialis is fully contracted.',
      'Lower the bar back slowly in 2-3 seconds, resisting gravity, and repeat.'
    ],
    category: 'strength',
    images: ['Reverse_Barbell_Curl/0.jpg', 'Reverse_Barbell_Curl/1.jpg']
  },
  {
    id: 'Hanging_Leg_Raise',
    name: 'Hanging Leg Raise',
    force: 'pull',
    level: 'intermediate',
    mechanic: 'isolation',
    equipment: 'body only',
    primaryMuscles: ['abdominals'],
    secondaryMuscles: ['hip flexors'],
    instructions: [
      'Hang from a pull-up bar with an overhand grip, arms fully extended and shoulders packed.',
      'Engage your core and tuck your pelvis slightly to eliminate the lower-back arch.',
      'Raise your legs straight up until they are parallel to the floor or beyond.',
      'Lower your legs slowly with control, avoiding any swinging momentum.'
    ],
    category: 'strength',
    images: ['Hanging_Leg_Raise/0.jpg', 'Hanging_Leg_Raise/1.jpg']
  },
  {
    id: 'Tricep_Pushdown_Cable',
    name: 'Cable Tricep Pushdown',
    force: 'push',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'cable',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    instructions: [
      'Stand in front of a high cable machine and grip a straight bar with an overhand grip.',
      'Keep elbows tucked close to your sides and upper arms stationary throughout.',
      'Push the bar down until arms are fully extended and triceps are squeezed hard.',
      'Let the bar return slowly to the start position under full control, feeling the stretch at the top.'
    ],
    category: 'strength',
    images: ['Tricep_Pushdown_Cable/0.jpg', 'Tricep_Pushdown_Cable/1.jpg']
  },
  {
    id: 'Barbell_Overhead_Press',
    name: 'Barbell Overhead Press',
    force: 'push',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'barbell',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'traps'],
    instructions: [
      'Stand with feet shoulder-width apart, gripping the barbell just outside shoulder width at collarbone level.',
      'Brace your core, squeeze your glutes, and press the bar straight overhead until arms are locked out.',
      'At the top, shrug your traps slightly to achieve a strong lockout position.',
      'Lower the bar back to collarbone level in a controlled manner, keeping elbows slightly forward.'
    ],
    category: 'strength',
    images: ['Barbell_Overhead_Press/0.jpg', 'Barbell_Overhead_Press/1.jpg']
  },
  {
    id: 'Leg_Press',
    name: 'Leg Press',
    force: 'push',
    level: 'beginner',
    mechanic: 'compound',
    equipment: 'machine',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: ['glutes', 'hamstrings', 'calves'],
    instructions: [
      'Sit in the leg press machine and place your feet shoulder-width apart on the platform.',
      'Disengage the safety handles and lower the platform by bending your knees to approximately 90 degrees.',
      'Push through your heels and extend your legs to press the platform back up, without locking out your knees.',
      'Control the descent on every rep, maintaining constant tension on the quads.'
    ],
    category: 'strength',
    images: ['Leg_Press/0.jpg', 'Leg_Press/1.jpg']
  },
  {
    id: 'Lying_Leg_Curl',
    name: 'Lying Leg Curl',
    force: 'pull',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'machine',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['calves'],
    instructions: [
      'Lie face down on the leg curl machine with ankles under the padded lever and knees just off the edge.',
      'Curl your legs up toward your glutes as far as possible by flexing the hamstrings.',
      'Squeeze at the peak contraction for a second, then slowly lower back to the starting position.',
      'Avoid lifting your hips off the bench or using momentum to swing the weight.'
    ],
    category: 'strength',
    images: ['Lying_Leg_Curl/0.jpg', 'Lying_Leg_Curl/1.jpg']
  },
  {
    id: 'Ab_Wheel_Rollout',
    name: 'Ab Wheel Rollout',
    force: 'pull',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'other',
    primaryMuscles: ['abdominals'],
    secondaryMuscles: ['lower back', 'shoulders'],
    instructions: [
      'Kneel on a mat and grip an ab wheel with both hands directly under your shoulders.',
      'Brace your core hard and slowly roll the wheel forward until your body is nearly parallel to the floor.',
      'Pause briefly at full extension, then contract your abs to pull the wheel back to the starting position.',
      'Do not allow your hips to sag or lower back to arch during the movement.'
    ],
    category: 'strength',
    images: ['Ab_Wheel_Rollout/0.jpg', 'Ab_Wheel_Rollout/1.jpg']
  },
  {
    id: 'Skull_Crushers',
    name: 'EZ-Bar Skull Crusher',
    force: 'push',
    level: 'intermediate',
    mechanic: 'isolation',
    equipment: 'e-z curl bar',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    instructions: [
      'Lie flat on a bench and hold an EZ-curl bar with a narrow overhand grip above your forehead, arms extended.',
      'Keeping your upper arms vertical and elbows fixed, lower the bar toward your forehead or just above it.',
      'Pause at the bottom for a full tricep stretch without touching your forehead.',
      'Press the bar back up by extending your elbows, squeezing your triceps hard at lockout.'
    ],
    category: 'strength',
    images: ['Skull_Crushers/0.jpg', 'Skull_Crushers/1.jpg']
  },
  {
    id: 'Hammer_Curl',
    name: 'Dumbbell Hammer Curl',
    force: 'pull',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'dumbbell',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    instructions: [
      'Stand holding a dumbbell in each hand with a neutral (hammer) grip, palms facing each other.',
      'Keep your upper arms stationary and curl the weight forward while contracting the biceps.',
      'Continue until the dumbbells are at shoulder level and the brachialis is fully contracted.',
      'Slowly lower back to the starting position as you inhale, maintaining the neutral wrist position.'
    ],
    category: 'strength',
    images: ['Hammer_Curl/0.jpg', 'Hammer_Curl/1.jpg']
  },
  {
    id: 'Face_Pull',
    name: 'Cable Face Pull',
    force: 'pull',
    level: 'beginner',
    mechanic: 'compound',
    equipment: 'cable',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['traps', 'biceps'],
    instructions: [
      'Set a cable pulley at head height and attach a rope. Grasp both ends with an overhand grip.',
      'Step back to create tension and position your body with arms extended in front of you.',
      'Pull the rope toward your face, driving your elbows back and out to the sides.',
      'At peak contraction your hands should be beside your ears. Squeeze rear delts and hold briefly.'
    ],
    category: 'strength',
    images: ['Face_Pull/0.jpg', 'Face_Pull/1.jpg']
  }
];
