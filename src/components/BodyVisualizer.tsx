import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  Sparkles,
  Info,
  Eye,
  Activity,
  Layers,
  User,
  Tag,
} from 'lucide-react';
import {
  getBodyPaths,
  getViewBox,
  MUSCLE_METADATA,
  resolveExerciseMuscles,
  Muscle,
  BodyGender,
  BodySide,
  MuscleMeta,
} from '../data/muscleMap';

export interface BodyVisualizerProps {
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
  exerciseName?: string;
  heatmapData?: Array<{
    muscle: string;
    intensity: number; // 1 to 5
    exerciseCount: number;
    exercises: string[];
  }>;
  interactive?: boolean;
  onMuscleClick?: (muscle: string) => void;
  forceView?: 'anterior' | 'posterior';
  showDualView?: boolean;
  height?: number | string;
  defaultGender?: BodyGender;
  showLabels?: boolean;
}

// Callout label coordinates in SVG viewBox coordinate space
interface MuscleLabelPin {
  muscle: Muscle;
  name: string;
  x: number;
  y: number;
  side: BodySide;
}

const MUSCLE_PINS_MALE: MuscleLabelPin[] = [
  // Front View (male-front: 0 95 727 1280)
  { muscle: 'trapezius', name: 'Trapezoid / Traps', x: 290, y: 285, side: 'front' },
  { muscle: 'front-deltoid', name: 'Front Delt', x: 215, y: 350, side: 'front' },
  { muscle: 'deltoids', name: 'Side Delt', x: 510, y: 350, side: 'front' },
  { muscle: 'chest', name: 'Chest', x: 363, y: 395, side: 'front' },
  { muscle: 'biceps', name: 'Biceps', x: 190, y: 455, side: 'front' },
  { muscle: 'forearm', name: 'Forearms', x: 155, y: 560, side: 'front' },
  { muscle: 'abs', name: 'Abs / Core', x: 363, y: 525, side: 'front' },
  { muscle: 'obliques', name: 'Obliques', x: 445, y: 540, side: 'front' },
  { muscle: 'quadriceps', name: 'Quads', x: 363, y: 830, side: 'front' },
  { muscle: 'adductors', name: 'Adductors', x: 363, y: 740, side: 'front' },
  { muscle: 'tibialis', name: 'Tibialis', x: 363, y: 1120, side: 'front' },

  // Back View (male-back: 718 95 727 1280)
  { muscle: 'trapezius', name: 'Trapezoid / Traps', x: 1082, y: 340, side: 'back' },
  { muscle: 'rear-deltoid', name: 'Rear Delt', x: 950, y: 355, side: 'back' },
  { muscle: 'upper-back', name: 'Lats & Upper Back', x: 1082, y: 470, side: 'back' },
  { muscle: 'triceps', name: 'Triceps', x: 915, y: 460, side: 'back' },
  { muscle: 'lower-back', name: 'Lower Back', x: 1082, y: 585, side: 'back' },
  { muscle: 'gluteal', name: 'Glutes', x: 1082, y: 690, side: 'back' },
  { muscle: 'hamstring', name: 'Hamstrings', x: 1082, y: 840, side: 'back' },
  { muscle: 'calves', name: 'Calves', x: 1082, y: 1120, side: 'back' },
];

export const BodyVisualizer: React.FC<BodyVisualizerProps> = ({
  primaryMuscles = [],
  secondaryMuscles = [],
  exerciseName = '',
  heatmapData,
  interactive = true,
  onMuscleClick,
  forceView,
  showDualView = false,
  height = 380,
  defaultGender = 'male',
  showLabels = true,
}) => {
  // Determine dominant viewing angle from muscles
  const dominantSide: BodySide = useMemo(() => {
    if (forceView) return forceView === 'posterior' ? 'back' : 'front';
    const posteriorMuscles = new Set([
      'middle back',
      'lats',
      'lower back',
      'traps',
      'triceps',
      'glutes',
      'hamstrings',
      'rear-deltoid',
      'upper-back',
    ]);
    const isBackDominant = primaryMuscles.some((m) =>
      posteriorMuscles.has(m.toLowerCase())
    );
    return isBackDominant ? 'back' : 'front';
  }, [primaryMuscles, forceView]);

  const [activeSide, setActiveSide] = useState<BodySide>(dominantSide);
  const [gender, setGender] = useState<BodyGender>(defaultGender);
  const [hoveredMuscle, setHoveredMuscle] = useState<Muscle | null>(null);
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle | null>(null);
  const [showPins, setShowPins] = useState<boolean>(showLabels);

  React.useEffect(() => {
    if (forceView) {
      setActiveSide(forceView === 'posterior' ? 'back' : 'front');
    }
  }, [forceView]);

  // Resolve active muscles for Exercise Mode
  const { primary: primaryActiveSet, secondary: secondaryActiveSet } = useMemo(() => {
    return resolveExerciseMuscles(primaryMuscles, secondaryMuscles, exerciseName);
  }, [primaryMuscles, secondaryMuscles, exerciseName]);

  // Build heatmap lookup map
  const heatmapMap = useMemo(() => {
    const map = new Map<Muscle, { intensity: number; count: number; exercises: string[] }>();
    if (!heatmapData) return map;

    heatmapData.forEach((item) => {
      // Find matching MuscleMap muscle
      const raw = item.muscle.toLowerCase().trim();
      const match = (Object.keys(MUSCLE_METADATA) as Muscle[]).find(
        (m) =>
          m === raw ||
          MUSCLE_METADATA[m].name.toLowerCase() === raw ||
          MUSCLE_METADATA[m].aliasNames.some((a) => a.toLowerCase() === raw)
      );

      if (match) {
        map.set(match, {
          intensity: item.intensity,
          count: item.exerciseCount,
          exercises: item.exercises,
        });
      } else {
        // Fallback for compound muscle terms
        if (raw.includes('shoulder')) {
          map.set('front-deltoid', { intensity: item.intensity, count: item.exerciseCount, exercises: item.exercises });
          map.set('deltoids', { intensity: item.intensity, count: item.exerciseCount, exercises: item.exercises });
        }
        if (raw.includes('trap')) {
          map.set('trapezius', { intensity: item.intensity, count: item.exerciseCount, exercises: item.exercises });
        }
        if (raw.includes('chest')) {
          map.set('chest', { intensity: item.intensity, count: item.exerciseCount, exercises: item.exercises });
        }
      }
    });

    return map;
  }, [heatmapData]);

  // List of all currently active muscles (for badges and legends)
  const activeMusclesList = useMemo(() => {
    const list: Array<{
      muscle: Muscle;
      meta: MuscleMeta;
      status: 'primary' | 'secondary' | 'heatmap';
      intensity?: number;
      exerciseCount?: number;
    }> = [];

    if (heatmapData && heatmapData.length > 0) {
      heatmapMap.forEach((data, muscle) => {
        list.push({
          muscle,
          meta: MUSCLE_METADATA[muscle] || {
            id: muscle,
            name: muscle,
            anatomicalName: muscle,
            aliasNames: [muscle],
            bodySide: 'both',
            role: 'Biomechanics activation',
          },
          status: 'heatmap',
          intensity: data.intensity,
          exerciseCount: data.count,
        });
      });
      list.sort((a, b) => (b.intensity || 0) - (a.intensity || 0));
    } else {
      primaryActiveSet.forEach((m) => {
        if (MUSCLE_METADATA[m]) {
          list.push({ muscle: m, meta: MUSCLE_METADATA[m], status: 'primary' });
        }
      });
      secondaryActiveSet.forEach((m) => {
        if (MUSCLE_METADATA[m] && !primaryActiveSet.has(m)) {
          list.push({ muscle: m, meta: MUSCLE_METADATA[m], status: 'secondary' });
        }
      });
    }

    return list;
  }, [heatmapData, heatmapMap, primaryActiveSet, secondaryActiveSet]);

  // Color resolver for SVG path
  const getMuscleColor = (muscle: Muscle): { fill: string; stroke: string; glow: boolean; opacity: number } => {
    const isHovered = hoveredMuscle === muscle;
    const isSelected = selectedMuscle === muscle;

    // Heatmap mode
    if (heatmapData && heatmapData.length > 0) {
      const data = heatmapMap.get(muscle);
      if (data) {
        const tierColors = ['#06B6D4', '#10B981', '#F59E0B', '#FB923C', '#FF334B'];
        const color = tierColors[Math.min(Math.max(data.intensity - 1, 0), 4)];
        return {
          fill: color,
          stroke: isHovered || isSelected ? '#FFFFFF' : '#0B0F14',
          glow: true,
          opacity: isHovered ? 1 : 0.9,
        };
      }
    } else {
      // Exercise mode
      if (primaryActiveSet.has(muscle)) {
        return {
          fill: '#FF334B',
          stroke: isHovered || isSelected ? '#FFFFFF' : '#850011',
          glow: true,
          opacity: isHovered ? 1 : 0.95,
        };
      }
      if (secondaryActiveSet.has(muscle)) {
        return {
          fill: '#FB923C',
          stroke: isHovered || isSelected ? '#FFFFFF' : '#7C2D12',
          glow: true,
          opacity: isHovered ? 1 : 0.85,
        };
      }
    }

    // Default un-highlighted body part
    if (isHovered || isSelected) {
      return {
        fill: '#38BDF8',
        stroke: '#FFFFFF',
        glow: true,
        opacity: 0.8,
      };
    }

    return {
      fill: '#182333',
      stroke: '#243346',
      glow: false,
      opacity: 0.9,
    };
  };

  const currentHoverMeta = hoveredMuscle ? MUSCLE_METADATA[hoveredMuscle] : null;

  // Single body diagram renderer
  const renderBodySVG = (side: BodySide) => {
    const viewBox = getViewBox(gender, side);
    const bodyParts = getBodyPaths(gender, side);
    const visiblePins = MUSCLE_PINS_MALE.filter((p) => p.side === side && gender === 'male');

    return (
      <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
        <svg
          viewBox={`${viewBox.originX} ${viewBox.originY} ${viewBox.width} ${viewBox.height}`}
          className="w-full h-full max-h-full transition-all duration-300"
          style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.45))' }}
        >
          <defs>
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="hoverGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
            </radialGradient>
          </defs>

          {bodyParts.map((part) => {
            const muscle = part.slug as Muscle;
            const isCosmetic = part.slug === 'hair' || part.slug === 'head';
            const { fill, stroke, glow, opacity } = getMuscleColor(muscle);
            const isHovered = hoveredMuscle === muscle;
            const allPathDs = [...part.common, ...part.left, ...part.right];

            return (
              <g
                key={`${side}-${part.slug}`}
                id={`muscle-${part.slug}`}
                className={`${!isCosmetic && interactive ? 'cursor-pointer' : ''} transition-all duration-200`}
                onMouseEnter={() => {
                  if (!isCosmetic && interactive) setHoveredMuscle(muscle);
                }}
                onMouseLeave={() => {
                  if (hoveredMuscle === muscle) setHoveredMuscle(null);
                }}
                onClick={() => {
                  if (!isCosmetic && interactive) {
                    setSelectedMuscle(muscle === selectedMuscle ? null : muscle);
                    if (onMuscleClick) onMuscleClick(muscle);
                  }
                }}
              >
                {allPathDs.map((d, idx) => (
                  <path
                    key={idx}
                    d={d}
                    fill={isCosmetic ? '#111823' : fill}
                    stroke={isCosmetic ? '#1E293B' : stroke}
                    strokeWidth={isHovered ? 2.5 : 1}
                    fillOpacity={isCosmetic ? 0.7 : opacity}
                    filter={glow ? 'url(#neon-glow)' : undefined}
                    className="transition-colors duration-200"
                  />
                ))}
              </g>
            );
          })}

          {/* Interactive Anatomical Callout Pins */}
          {showPins &&
            visiblePins.map((pin) => {
              const isHighlight =
                primaryActiveSet.has(pin.muscle) ||
                secondaryActiveSet.has(pin.muscle) ||
                heatmapMap.has(pin.muscle);
              const isHover = hoveredMuscle === pin.muscle;

              return (
                <g
                  key={`${pin.side}-${pin.muscle}-${pin.x}`}
                  className="cursor-pointer transition-all duration-200 group/pin"
                  onMouseEnter={() => setHoveredMuscle(pin.muscle)}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  onClick={() => {
                    setSelectedMuscle(pin.muscle === selectedMuscle ? null : pin.muscle);
                    if (onMuscleClick) onMuscleClick(pin.muscle);
                  }}
                >
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={isHover ? 9 : isHighlight ? 7 : 5}
                    fill={isHighlight ? '#FF334B' : isHover ? '#38BDF8' : '#223247'}
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                    className="transition-all duration-200 shadow-md"
                  />
                  {isHighlight && (
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r={13}
                      fill="none"
                      stroke="#FF334B"
                      strokeWidth={1.5}
                      opacity={0.6}
                      className="animate-ping"
                    />
                  )}
                  {/* Label tooltip tag in SVG */}
                  {(isHighlight || isHover) && (
                    <g transform={`translate(${pin.x}, ${pin.y - 14})`}>
                      <rect
                        x="-48"
                        y="-18"
                        width="96"
                        height="20"
                        rx="6"
                        fill="#090E17"
                        stroke={isHighlight ? '#FF334B' : '#38BDF8'}
                        strokeWidth="1"
                        opacity={0.92}
                      />
                      <text
                        x="0"
                        y="-5"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        {pin.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
        </svg>

        {/* Floating View Indicator Badge */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-[#0F141C]/85 border border-[#232F3E] text-[10px] font-mono tracking-wider text-slate-300 backdrop-blur-sm shadow-sm flex items-center gap-1.5 pointer-events-none">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              side === 'front' ? 'bg-[#FF334B]' : 'bg-cyan-400'
            }`}
          />
          <span className="uppercase">{side === 'front' ? 'Anterior (Front)' : 'Posterior (Back)'}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full rounded-2xl bg-[#090D13] border border-[#1E2633] overflow-hidden flex flex-col shadow-2xl relative">
      {/* Top Controls Toolbar */}
      <div className="p-3 bg-[#0D131C] border-b border-[#1E2633] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: View Mode Controls */}
        <div className="flex items-center gap-2">
          {!showDualView && (
            <div className="flex items-center rounded-xl bg-[#141B24] border border-[#233144] p-0.5">
              <button
                type="button"
                onClick={() => setActiveSide('front')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                  activeSide === 'front'
                    ? 'bg-[#FF334B] text-white shadow-[0_0_10px_rgba(255,51,75,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Front View
              </button>
              <button
                type="button"
                onClick={() => setActiveSide('back')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                  activeSide === 'back'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Back View
              </button>
            </div>
          )}

          {/* Gender toggle */}
          <div className="flex items-center rounded-xl bg-[#141B24] border border-[#233144] p-0.5">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                gender === 'male'
                  ? 'bg-[#1E2A3A] text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Male anatomy model"
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                gender === 'female'
                  ? 'bg-[#1E2A3A] text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Female anatomy model"
            >
              Female
            </button>
          </div>
        </div>

        {/* Right: Labels Toggle & Attribution */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPins((prev) => !prev)}
            className={`px-2.5 py-1.5 rounded-xl border font-medium text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
              showPins
                ? 'bg-[#192333] border-cyan-500/60 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-[#141B24] border-[#233144] text-slate-400 hover:text-white'
            }`}
            title="Toggle anatomical named callout markers"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Anatomical Labels: {showPins ? 'ON' : 'OFF'}</span>
          </button>

          <span className="text-[10px] font-mono text-slate-400 px-2 py-1 rounded bg-[#121822] border border-[#202C3D] hidden sm:inline">
            MuscleMap SDK
          </span>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div
        className="w-full relative flex items-center justify-center p-2 sm:p-4 bg-radial from-[#121926] to-[#080C12]"
        style={{ minHeight: height, height: height }}
      >
        {showDualView ? (
          /* Dual View (Front and Back side-by-side) */
          <div className="w-full h-full grid grid-cols-2 gap-2 sm:gap-4">
            <div className="h-full rounded-xl bg-[#0B0F15] border border-[#1B2533] p-1">
              {renderBodySVG('front')}
            </div>
            <div className="h-full rounded-xl bg-[#0B0F15] border border-[#1B2533] p-1">
              {renderBodySVG('back')}
            </div>
          </div>
        ) : (
          /* Single Selected View */
          <div className="w-full h-full max-w-md mx-auto">
            {renderBodySVG(activeSide)}
          </div>
        )}

        {/* Interactive Hover HUD Overlay (Bottom-left/center) */}
        {currentHoverMeta && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 max-w-sm w-[90%] p-3 rounded-xl bg-[#0B1017]/95 border border-[#38BDF8]/60 shadow-[0_0_20px_rgba(56,189,248,0.25)] backdrop-blur-md transition-all z-20 space-y-1 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span>{currentHoverMeta.name}</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-300 uppercase px-1.5 py-0.5 rounded bg-[#132235] border border-[#1E3654]">
                {currentHoverMeta.anatomicalName}
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug">
              {currentHoverMeta.role}
            </p>

            {/* Engagement Status */}
            <div className="pt-1 flex items-center gap-2 text-[10px]">
              {primaryActiveSet.has(currentHoverMeta.id) && (
                <span className="text-[#FF334B] font-bold flex items-center gap-1">
                  ● Primary Target Movement
                </span>
              )}
              {secondaryActiveSet.has(currentHoverMeta.id) && (
                <span className="text-[#FB923C] font-semibold flex items-center gap-1">
                  ● Secondary Stabilizer
                </span>
              )}
              {heatmapMap.has(currentHoverMeta.id) && (
                <span className="text-emerald-400 font-semibold font-mono">
                  Level {heatmapMap.get(currentHoverMeta.id)?.intensity} Activation ({heatmapMap.get(currentHoverMeta.id)?.count} exercises)
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Active Muscle Names Legend & Badges Bar (Front Delt, Trapezoid, etc.) */}
      <div className="p-3.5 bg-[#0C1118] border-t border-[#1E2633] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#FF334B]" />
            <span className="text-xs font-bold text-white tracking-tight">
              Anatomical Target Groups
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Hover or tap any badge to highlight on body
          </span>
        </div>

        {activeMusclesList.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 max-h-24 overflow-y-auto pr-1">
            {activeMusclesList.map((item) => {
              const isHover = hoveredMuscle === item.muscle;
              const isPrimary = item.status === 'primary';
              const isHeatmap = item.status === 'heatmap';

              return (
                <button
                  key={item.muscle}
                  type="button"
                  onMouseEnter={() => setHoveredMuscle(item.muscle)}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  onClick={() => {
                    setSelectedMuscle(item.muscle === selectedMuscle ? null : item.muscle);
                    if (onMuscleClick) onMuscleClick(item.muscle);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                    isHover
                      ? 'bg-[#1C2D42] border-[#38BDF8] text-white shadow-[0_0_12px_rgba(56,189,248,0.4)] scale-105'
                      : isPrimary
                      ? 'bg-[#FF334B]/15 border-[#FF334B]/40 text-white hover:border-[#FF334B]'
                      : isHeatmap
                      ? 'bg-[#141D29] border-[#223145] text-slate-200 hover:border-emerald-400'
                      : 'bg-[#FB923C]/15 border-[#FB923C]/40 text-slate-200 hover:border-[#FB923C]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPrimary
                        ? 'bg-[#FF334B] shadow-[0_0_6px_#FF334B]'
                        : isHeatmap
                        ? 'bg-emerald-400 shadow-[0_0_6px_#10B981]'
                        : 'bg-[#FB923C] shadow-[0_0_6px_#FB923C]'
                    }`}
                  />
                  <span>{item.meta.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ({item.meta.anatomicalName})
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-slate-400 py-1 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select an exercise or routine to visualize targeted muscle groups.</span>
          </div>
        )}
      </div>
    </div>
  );
};
