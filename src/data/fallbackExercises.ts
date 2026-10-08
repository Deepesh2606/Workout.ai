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
  }
];
