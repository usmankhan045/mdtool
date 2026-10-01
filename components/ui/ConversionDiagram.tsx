interface Props {
  from: string;
  to: string;
  className?: string;
}

/**
 * Inline SVG (not a raster <img>) so it ships with zero extra requests and
 * stays crisp at any size - but still counts as real visual content for
 * multi-modal/AI-citation signals, with full alt-text via role="img".
 *
 * Scales to its container (w-full up to max 360px) and the wide label boxes
 * fit multi-word formats like "Word (.docx)" without clipping.
 */
export default function ConversionDiagram({ from, to, className = '' }: Props) {
  const label = `Diagram: converting a ${from} file into ${to}`;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 360 120"
      preserveAspectRatio="xMidYMid meet"
      className={`h-auto w-full max-w-[360px] ${className}`}
    >
      <title>{label}</title>

      <rect x="4" y="28" width="150" height="64" rx="10" fill="#ffffff" stroke="#d4d4d8" strokeWidth="2" />
      <text x="79" y="54" textAnchor="middle" fontSize="13" fontWeight="700" fill="#18181b">
        {from}
      </text>
      <text x="79" y="73" textAnchor="middle" fontSize="10" fill="#71717a">
        file
      </text>

      <line x1="162" y1="60" x2="190" y2="60" stroke="#a1a1aa" strokeWidth="2.5" />
      <polygon points="190,53 204,60 190,67" fill="#a1a1aa" />

      <rect x="206" y="28" width="150" height="64" rx="10" fill="#18181b" />
      <text x="281" y="54" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">
        {to}
      </text>
      <text x="281" y="73" textAnchor="middle" fontSize="10" fill="#a1a1aa">
        output
      </text>
    </svg>
  );
}
