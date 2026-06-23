interface Props {
  from: string;
  to: string;
  className?: string;
}

/**
 * Inline SVG (not a raster <img>) so it ships with zero extra requests and
 * stays crisp at any size — but still counts as real visual content for
 * multi-modal/AI-citation signals, with full alt-text via role="img".
 */
export default function ConversionDiagram({ from, to, className = '' }: Props) {
  const label = `Diagram: converting a ${from} file into ${to}`;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 320 120"
      width={320}
      height={120}
      className={className}
    >
      <title>{label}</title>
      <rect x="8" y="28" width="92" height="64" rx="10" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
      <text x="54" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e3a5f">
        {from}
      </text>
      <text x="54" y="74" textAnchor="middle" fontSize="10" fill="#3b82f6">
        file
      </text>

      <line x1="108" y1="60" x2="206" y2="60" stroke="#3b82f6" strokeWidth="2.5" />
      <polygon points="206,53 220,60 206,67" fill="#3b82f6" />

      <rect x="220" y="28" width="92" height="64" rx="10" fill="#1e3a5f" />
      <text x="266" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">
        {to}
      </text>
      <text x="266" y="74" textAnchor="middle" fontSize="10" fill="#93c5fd">
        output
      </text>
    </svg>
  );
}
