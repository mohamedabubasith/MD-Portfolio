import React from 'react';

export type VisKind = 'graph' | 'wave' | 'bars' | 'pulse' | 'dots' | 'grid';

export const VIS_TYPES: readonly VisKind[] = ['graph', 'wave', 'bars', 'pulse', 'dots', 'grid'];

interface Props {
  kind: string;
  color?: string;
  bright?: string;
}

/* Generative telemetry-style SVG visuals used on work cards. */
const ProjectVis: React.FC<Props> = ({ kind, color = '#8B7CFF', bright = '#4AD8C7' }) => {
  if (kind === 'graph') return (
    <svg viewBox="0 0 400 100" preserveAspectRatio="none">
      <g stroke={color} strokeOpacity="0.55" strokeWidth="0.6" fill="none">
        <path d="M0,50 L60,30 L120,60 L180,20 L240,45 L300,15 L360,50 L400,35" />
        <path d="M0,70 L60,80 L120,45 L180,70 L240,65 L300,80 L360,40 L400,65" opacity="0.5" />
      </g>
      {[[60, 30], [120, 60], [180, 20], [240, 45], [300, 15], [360, 50]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2.5" fill={bright} />
          <circle cx={x} cy={y} r="6" fill={color} fillOpacity="0.18">
            <animate attributeName="r" values="4;10;4" dur={(2 + i * 0.2) + 's'} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur={(2 + i * 0.2) + 's'} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
  if (kind === 'wave') return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      <path d="M0,50 Q25,15 50,50 T100,50 T150,50 T200,50" stroke={color} strokeWidth="1" fill="none">
        <animate attributeName="d" dur="3s" repeatCount="indefinite"
          values="M0,50 Q25,15 50,50 T100,50 T150,50 T200,50;M0,50 Q25,85 50,50 T100,50 T150,50 T200,50;M0,50 Q25,15 50,50 T100,50 T150,50 T200,50" />
      </path>
      <path d="M0,50 Q25,70 50,50 T100,50 T150,50 T200,50" stroke={color} strokeOpacity="0.4" strokeWidth="0.7" fill="none">
        <animate attributeName="d" dur="4s" repeatCount="indefinite"
          values="M0,50 Q25,70 50,50 T100,50 T150,50 T200,50;M0,50 Q25,25 50,50 T100,50 T150,50 T200,50;M0,50 Q25,70 50,50 T100,50 T150,50 T200,50" />
      </path>
    </svg>
  );
  if (kind === 'bars') return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      {Array.from({ length: 28 }).map((_, i) => {
        const h = 20 + Math.sin(i * 0.6) * 20 + (i % 5) * 6;
        return (
          <rect key={i} x={i * 7 + 2} y={100 - h} width="4" height={h} fill={color} opacity={0.4 + (i % 4) * 0.15}>
            <animate attributeName="height" values={`${h};${h * 0.5};${h}`} dur={(1 + i * 0.05) + 's'} repeatCount="indefinite" />
            <animate attributeName="y" values={`${100 - h};${100 - h * 0.5};${100 - h}`} dur={(1 + i * 0.05) + 's'} repeatCount="indefinite" />
          </rect>
        );
      })}
    </svg>
  );
  if (kind === 'pulse') return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      <path d="M0,50 L45,50 L55,20 L65,80 L75,50 L120,50 L130,30 L140,70 L150,50 L200,50" stroke={bright} strokeWidth="1.2" fill="none" />
      <line x1="0" y1="50" x2="200" y2="50" stroke={color} strokeOpacity="0.15" />
    </svg>
  );
  if (kind === 'dots') return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (i % 10) * 20 + 10;
        const y = Math.floor(i / 10) * 30 + 20;
        const op = 0.2 + Math.random() * 0.6;
        return <circle key={i} cx={x} cy={y} r="3" fill={color} opacity={op}>
          <animate attributeName="opacity" values={`${op};${op * 0.3};${op}`} dur={(1.5 + i * 0.1) + 's'} repeatCount="indefinite" />
        </circle>;
      })}
    </svg>
  );
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <rect key={`${r}-${c}`} x={c * 20 + 2} y={r * 16 + 2} width="16" height="12"
            fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.3" strokeWidth="0.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur={(1 + r * 0.3 + c * 0.1) + 's'} repeatCount="indefinite" />
          </rect>
        ))
      )}
    </svg>
  );
};

export default ProjectVis;
