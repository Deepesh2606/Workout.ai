import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import Model, { Muscle } from 'react-body-highlighter';
import { FREE_DB_TO_HIGHLIGHTER_MAP, getDominantBodyView } from '../data/muscleGroups';

const VALID_HIGHLIGHTER_MUSCLES = new Set<string>([
  'trapezius',
  'upper-back',
  'lower-back',
  'chest',
  'biceps',
  'triceps',
  'forearm',
  'back-deltoids',
  'front-deltoids',
  'abs',
  'obliques',
  'adductor',
  'abductors',
  'hamstring',
  'quadriceps',
  'calves',
  'gluteal',
  'head',
  'neck',
  'knees',
  'left-soleus',
  'right-soleus',
]);

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackView: 'anterior' | 'posterior';
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Body highlighter fallback triggered:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-400">
          <div className="w-16 h-16 rounded-full bg-[#182333] border border-[#27384E] flex items-center justify-center mb-2 text-[#FF334B]">
            <span className="font-mono text-xs font-bold uppercase">{this.props.fallbackView}</span>
          </div>
          <span className="text-xs text-slate-300 font-semibold">Anatomical Projection Loaded</span>
          <span className="text-[11px] text-slate-500 mt-0.5">Muscles highlighted in list view</span>
        </div>
      );
    }

    return this.props.children;
  }
}

interface BodyVisualizerProps {
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
  heatmapData?: Array<{
    muscle: Muscle;
    intensity: number; // 1 to 5
    exerciseCount: number;
    exercises: string[];
  }>;
  interactive?: boolean;
  onMuscleClick?: (muscle: string) => void;
  forceView?: 'anterior' | 'posterior';
  showDualView?: boolean;
  height?: number | string;
}

export const BodyVisualizer: React.FC<BodyVisualizerProps> = ({
  primaryMuscles = [],
  secondaryMuscles = [],
  heatmapData,
  forceView,
  showDualView = false,
  height = 340,
}) => {
  const dominantView = getDominantBodyView(primaryMuscles);
  const [activeView, setActiveView] = useState<'anterior' | 'posterior'>(
    forceView || dominantView
  );

  React.useEffect(() => {
    if (forceView) {
      setActiveView(forceView);
    }
  }, [forceView]);

  let modelData: Array<{ name: string; muscles: Muscle[]; frequency?: number }> = [];
  let highlightedColors: string[] = ['#FB923C', '#FF334B'];

  if (heatmapData && heatmapData.length > 0) {
    highlightedColors = [
      '#06B6D4',
      '#10B981',
      '#F59E0B',
      '#FB923C',
      '#FF334B',
    ];

    modelData = heatmapData
      .filter((item) => VALID_HIGHLIGHTER_MUSCLES.has(item.muscle))
      .map((item) => ({
        name: `${item.muscle} (${item.exerciseCount} exercises)`,
        muscles: [item.muscle],
        frequency: Math.max(1, Math.min(5, item.intensity)),
      }));
  } else {
    const primaryHighlighterMuscles: Muscle[] = [];
    primaryMuscles.forEach((m) => {
      const mapped = FREE_DB_TO_HIGHLIGHTER_MAP[m.toLowerCase()] || [];
      mapped.forEach((hm) => {
        if (
          VALID_HIGHLIGHTER_MUSCLES.has(hm) &&
          !primaryHighlighterMuscles.includes(hm as Muscle)
        ) {
          primaryHighlighterMuscles.push(hm as Muscle);
        }
      });
    });

    const secondaryHighlighterMuscles: Muscle[] = [];
    secondaryMuscles.forEach((m) => {
      const mapped = FREE_DB_TO_HIGHLIGHTER_MAP[m.toLowerCase()] || [];
      mapped.forEach((hm) => {
        if (
          VALID_HIGHLIGHTER_MUSCLES.has(hm) &&
          !primaryHighlighterMuscles.includes(hm as Muscle) &&
          !secondaryHighlighterMuscles.includes(hm as Muscle)
        ) {
          secondaryHighlighterMuscles.push(hm as Muscle);
        }
      });
    });

    if (secondaryHighlighterMuscles.length > 0) {
      modelData.push({
        name: 'Secondary Activation',
        muscles: secondaryHighlighterMuscles,
        frequency: 1,
      });
    }

    if (primaryHighlighterMuscles.length > 0) {
      modelData.push({
        name: 'Primary Target',
        muscles: primaryHighlighterMuscles,
        frequency: 2,
      });
    }
  }

  const renderSingleModel = (viewType: 'anterior' | 'posterior') => (
    <div className="relative flex flex-col items-center justify-center p-2 rounded-2xl bg-[#0F141C] border border-[#1E2633] overflow-hidden w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,51,75,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161D26]/90 border border-[#263142] text-[11px] font-mono tracking-wider uppercase text-slate-300 backdrop-blur-sm pointer-events-none">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            viewType === 'anterior' ? 'bg-[#FF334B]' : 'bg-[#38BDF8]'
          }`}
        />
        {viewType === 'anterior' ? 'Front View' : 'Back View'}
      </div>

      <div style={{ height }} className="w-full flex items-center justify-center py-2">
        <ModelErrorBoundary fallbackView={viewType}>
          <Model
            data={modelData}
            type={viewType}
            bodyColor="#1A2230"
            highlightedColors={highlightedColors}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            svgStyle={{
              height: '100%',
              width: '100%',
              maxHeight: '100%',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
            }}
          />
        </ModelErrorBoundary>
      </div>
    </div>
  );

  if (showDualView) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSingleModel('anterior')}
        {renderSingleModel('posterior')}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center gap-1 p-1 bg-[#121822] border border-[#1E2633] rounded-xl mb-3 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveView('anterior')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
            activeView === 'anterior'
              ? 'bg-[#FF334B] text-white shadow-[0_0_12px_rgba(255,51,75,0.4)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Front (Anterior)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveView('posterior')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
            activeView === 'posterior'
              ? 'bg-[#38BDF8] text-white shadow-[0_0_12px_rgba(56,189,248,0.4)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Back (Posterior)</span>
        </button>
      </div>

      <div className="w-full">{renderSingleModel(activeView)}</div>
    </div>
  );
};
