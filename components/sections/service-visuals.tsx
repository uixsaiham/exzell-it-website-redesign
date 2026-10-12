import type { Service } from "@/lib/site-data";

// Coded illustrations for services without a photo. Drawn on a 560×400 canvas to match the 1.4 ratio of the service images.
const frame = { viewBox: "0 0 560 400", preserveAspectRatio: "xMidYMid slice", className: "service-visual-svg" } as const;

function Backdrop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0b1b2b" /><stop offset="1" stopColor="#123526" /></linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.82" cy="0.12" r="0.7"><stop offset="0" stopColor="#4caf50" stopOpacity="0.38" /><stop offset="1" stopColor="#4caf50" stopOpacity="0" /></radialGradient>
        <pattern id={`${id}-dots`} width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.2" fill="#ffffff" fillOpacity="0.06" /></pattern>
      </defs>
      <rect width="560" height="400" fill={`url(#${id}-bg)`} />
      <rect width="560" height="400" fill={`url(#${id}-dots)`} />
      <rect width="560" height="400" fill={`url(#${id}-glow)`} />
    </>
  );
}

function DesignVisual() {
  return (
    <svg {...frame}>
      <Backdrop id="design" />
      {/* Browser frame with a wireframe layout */}
      <g transform="translate(58 70)">
        <rect width="330" height="250" rx="14" fill="#f7f8f5" />
        <rect width="330" height="30" rx="14" fill="#e6ebe3" /><rect y="16" width="330" height="14" fill="#e6ebe3" />
        <circle cx="18" cy="15" r="4" fill="#f87171" /><circle cx="32" cy="15" r="4" fill="#fbbf24" /><circle cx="46" cy="15" r="4" fill="#4caf50" />
        <rect x="22" y="48" width="150" height="14" rx="4" fill="#0b1b2b" /><rect x="22" y="70" width="110" height="14" rx="4" fill="#0b1b2b" />
        <rect x="22" y="94" width="130" height="7" rx="3" fill="#c5cdc1" /><rect x="22" y="107" width="100" height="7" rx="3" fill="#c5cdc1" />
        <rect x="190" y="46" width="118" height="78" rx="10" fill="#b9ed91" /><path d="M206 108 L232 82 L250 98 L270 74 L292 108 Z" fill="#287c2c" fillOpacity="0.55" /><circle cx="282" cy="64" r="8" fill="#287c2c" fillOpacity="0.55" />
        <rect x="22" y="146" width="90" height="80" rx="10" fill="#e6ebe3" /><rect x="120" y="146" width="90" height="80" rx="10" fill="#e6ebe3" /><rect x="218" y="146" width="90" height="80" rx="10" fill="#e6ebe3" />
        <rect x="32" y="158" width="22" height="22" rx="6" fill="#287c2c" fillOpacity="0.25" /><rect x="130" y="158" width="22" height="22" rx="6" fill="#287c2c" fillOpacity="0.25" /><rect x="228" y="158" width="22" height="22" rx="6" fill="#287c2c" fillOpacity="0.25" />
        <rect x="32" y="192" width="64" height="6" rx="3" fill="#c5cdc1" /><rect x="130" y="192" width="64" height="6" rx="3" fill="#c5cdc1" /><rect x="228" y="192" width="64" height="6" rx="3" fill="#c5cdc1" />
      </g>
      {/* Selected button with resize handles and cursor */}
      <g transform="translate(80 190)">
        <rect x="-4" y="-4" width="92" height="30" rx="4" fill="none" stroke="#b9ed91" strokeWidth="1.5" strokeDasharray="4 3" />
        <rect width="84" height="22" rx="11" fill="#287c2c" /><rect x="18" y="9" width="48" height="5" rx="2.5" fill="#ffffff" />
        <rect x="-7" y="-7" width="6" height="6" fill="#b9ed91" /><rect x="85" y="-7" width="6" height="6" fill="#b9ed91" /><rect x="-7" y="23" width="6" height="6" fill="#b9ed91" /><rect x="85" y="23" width="6" height="6" fill="#b9ed91" />
        <path d="M74 20 L74 44 L80 38 L85 48 L89 46 L84 36 L92 36 Z" fill="#ffffff" stroke="#0b1b2b" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      {/* Style panel: palette and type scale */}
      <g transform="translate(360 112)">
        <rect width="150" height="190" rx="14" fill="#13262b" stroke="#ffffff" strokeOpacity="0.14" />
        <text x="16" y="28" fill="#9fb0ab" fontSize="10" letterSpacing="1.4">COLOUR</text>
        <circle cx="28" cy="52" r="12" fill="#b9ed91" /><circle cx="58" cy="52" r="12" fill="#4caf50" /><circle cx="88" cy="52" r="12" fill="#287c2c" /><circle cx="118" cy="52" r="12" fill="#f7f8f5" />
        <text x="16" y="96" fill="#9fb0ab" fontSize="10" letterSpacing="1.4">TYPE</text>
        <text x="16" y="138" fill="#ffffff" fontSize="38" fontWeight="600">Aa</text>
        <rect x="76" y="114" width="58" height="6" rx="3" fill="#ffffff" fillOpacity="0.5" /><rect x="76" y="126" width="44" height="6" rx="3" fill="#ffffff" fillOpacity="0.3" />
        <rect x="16" y="156" width="118" height="20" rx="10" fill="#b9ed91" fillOpacity="0.16" /><text x="75" y="170" fill="#b9ed91" fontSize="10" textAnchor="middle">Design system</text>
      </g>
    </svg>
  );
}

function PredictVisual() {
  const history = "M70 262 L112 248 L154 256 L196 226 L238 232 L280 204 L322 212";
  const forecast = "M322 212 L364 190 L406 182 L448 160 L490 150";
  return (
    <svg {...frame}>
      <Backdrop id="predict" />
      <g transform="translate(36 56)">
        <rect width="488" height="288" rx="16" fill="#0f2229" stroke="#ffffff" strokeOpacity="0.12" />
        <text x="24" y="34" fill="#ffffff" fontSize="14" fontWeight="600">Demand forecast</text>
        <text x="24" y="52" fill="#9fb0ab" fontSize="10">History and predicted range</text>
        <rect x="350" y="20" width="58" height="22" rx="11" fill="#b9ed91" fillOpacity="0.14" /><circle cx="364" cy="31" r="4" fill="#b9ed91" /><text x="374" y="35" fill="#b9ed91" fontSize="10">Actual</text>
        <rect x="414" y="20" width="58" height="22" rx="11" fill="#ffffff" fillOpacity="0.08" /><circle cx="428" cy="31" r="4" fill="none" stroke="#ffffff" strokeDasharray="2 2" /><text x="437" y="35" fill="#dbe4e1" fontSize="10">Forecast</text>
      </g>
      <g stroke="#ffffff" strokeOpacity="0.07">{[132, 172, 212, 252, 292].map(y => <line key={y} x1="60" x2="500" y1={y} y2={y} />)}</g>
      <path d="M322 212 L364 176 L406 160 L448 128 L490 110 L490 190 L448 192 L406 204 L364 204 Z" fill="#4caf50" fillOpacity="0.16" />
      <path d={`${history} L322 300 L70 300 Z`} fill="#b9ed91" fillOpacity="0.08" />
      <path d={history} fill="none" stroke="#b9ed91" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d={forecast} fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="7 6" strokeLinecap="round" />
      <line x1="322" x2="322" y1="120" y2="300" stroke="#b9ed91" strokeOpacity="0.5" strokeDasharray="3 4" />
      <rect x="296" y="104" width="52" height="18" rx="9" fill="#b9ed91" /><text x="322" y="117" fill="#0b1b2b" fontSize="10" fontWeight="600" textAnchor="middle">Today</text>
      <circle cx="322" cy="212" r="6" fill="#0b1b2b" stroke="#b9ed91" strokeWidth="3" /><circle cx="490" cy="150" r="5" fill="#ffffff" />
      <g fill="#7f938d" fontSize="10" textAnchor="middle">{["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m, i) => <text key={m} x={70 + i * 84} y="322">{m}</text>)}</g>
    </svg>
  );
}

function AutomateVisual() {
  return (
    <svg {...frame}>
      <Backdrop id="automate" />
      {/* Chat conversation */}
      <g transform="translate(84 46)">
        <rect width="236" height="316" rx="22" fill="#f7f8f5" />
        <rect width="236" height="52" rx="22" fill="#287c2c" /><rect y="30" width="236" height="22" fill="#287c2c" />
        <circle cx="30" cy="26" r="13" fill="#b9ed91" /><path d="M24 26 h12 M30 20 v12" stroke="#0b1b2b" strokeWidth="2" strokeLinecap="round" />
        <text x="52" y="23" fill="#ffffff" fontSize="12" fontWeight="600">Exzell Assistant</text><text x="52" y="38" fill="#d6f8bd" fontSize="9">online · replies instantly</text>
        <rect x="14" y="68" width="160" height="44" rx="12" fill="#ffffff" stroke="#e1e5de" /><text x="26" y="86" fill="#0b1b2b" fontSize="10">Hi! Can I book an</text><text x="26" y="101" fill="#0b1b2b" fontSize="10">appointment for Friday?</text>
        <rect x="62" y="124" width="160" height="44" rx="12" fill="#d6f8bd" /><text x="74" y="142" fill="#0b1b2b" fontSize="10">Of course. I have 10:00</text><text x="74" y="157" fill="#0b1b2b" fontSize="10">or 14:30 available.</text>
        <rect x="14" y="180" width="96" height="30" rx="12" fill="#ffffff" stroke="#e1e5de" /><text x="26" y="199" fill="#0b1b2b" fontSize="10">14:30 please</text>
        <rect x="62" y="222" width="160" height="44" rx="12" fill="#d6f8bd" /><text x="74" y="240" fill="#0b1b2b" fontSize="10">Booked for Friday 14:30.</text><text x="74" y="255" fill="#0b1b2b" fontSize="10">You’ll get a reminder.</text>
        <rect x="14" y="280" width="208" height="24" rx="12" fill="#e6ebe3" /><rect x="26" y="290" width="90" height="5" rx="2.5" fill="#b5beb1" />
      </g>
      {/* Workflow connecting the conversation to business tools */}
      <g fill="none" stroke="#b9ed91" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 4">
        <path d="M320 204 C 342 204, 342 120, 364 120" /><path d="M320 204 H 364" /><path d="M320 204 C 342 204, 342 288, 364 288" />
      </g>
      <circle cx="320" cy="204" r="5" fill="#b9ed91" />
      {[{ y: 120, label: "Calendar", sub: "Slot reserved" }, { y: 204, label: "CRM", sub: "Lead updated" }, { y: 288, label: "Reminder", sub: "Sent 24h before" }].map(node => (
        <g key={node.label} transform={`translate(364 ${node.y - 26})`}>
          <rect width="156" height="52" rx="14" fill="#13262b" stroke="#ffffff" strokeOpacity="0.14" />
          <rect x="12" y="12" width="28" height="28" rx="8" fill="#b9ed91" fillOpacity="0.16" /><path d="M20 26 l4 4 l8 -9" stroke="#b9ed91" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="50" y="24" fill="#ffffff" fontSize="12" fontWeight="600">{node.label}</text><text x="50" y="39" fill="#9fb0ab" fontSize="10">{node.sub}</text>
        </g>
      ))}
    </svg>
  );
}

export function ServiceVisual({ service }: { service: Service }) {
  const Visual = service.visual === "design" ? DesignVisual : service.visual === "predict" ? PredictVisual : AutomateVisual;
  return <div role="img" aria-label={`${service.title} illustration`} className="service-visual"><Visual /></div>;
}
