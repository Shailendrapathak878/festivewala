import React from 'react';

interface RangoliArtworkProps {
  type: string;
  className?: string;
}

export const RangoliArtwork: React.FC<RangoliArtworkProps> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'diwali-mandala':
      return (
        <svg viewBox="0 0 300 300" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="diwaliGoldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="85%" stopColor="#8C2D19" />
              <stop offset="100%" stopColor="#24113D" />
            </radialGradient>
            <linearGradient id="petalFlame" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#FF9800" />
              <stop offset="100%" stopColor="#D32F2F" />
            </linearGradient>
          </defs>
          <circle cx="150" cy="150" r="140" fill="#1C0B30" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="150" cy="150" r="125" fill="none" stroke="#F2D98B" strokeWidth="1.5" />
          {/* 8 Radial Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 150 150)`}>
              <path
                d="M150 35 C130 75 130 110 150 125 C170 110 170 75 150 35 Z"
                fill="url(#petalFlame)"
                stroke="#FFE082"
                strokeWidth="1"
              />
              <circle cx="150" cy="30" r="4" fill="#F2D98B" />
              <circle cx="150" cy="70" r="3" fill="#FFFFFF" opacity="0.9" />
            </g>
          ))}
          {/* Inner Mandala Ring */}
          <circle cx="150" cy="150" r="50" fill="url(#diwaliGoldGlow)" stroke="#F2D98B" strokeWidth="2" />
          {/* Central Diya Motif */}
          <path
            d="M125 155 C125 175 136 182 150 182 C164 182 175 175 175 155 C175 152 172 150 170 150 C158 152 142 152 130 150 C128 150 125 152 125 155 Z"
            fill="#D4AF37"
            stroke="#FFE082"
            strokeWidth="1"
          />
          {/* Diya Flame */}
          <path
            d="M150 115 C150 115 138 132 138 145 C138 152 143 156 150 156 C157 156 162 152 162 145 C162 132 150 115 150 115 Z"
            fill="#FFF"
            stroke="#FFB300"
            strokeWidth="1"
          />
          <circle cx="150" cy="146" r="3" fill="#E65100" />
        </svg>
      );

    case 'peacock-art':
      return (
        <svg viewBox="0 0 300 300" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="300" rx="20" fill="#0A1E24" />
          {/* Peacock Plumes Fan */}
          {[20, 40, 60, 80, 100, 120, 140, 160].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 90 200)`}>
              <path
                d="M90 200 L90 50 Q105 70 120 50 L90 200"
                fill="#004D40"
                stroke="#00ACC1"
                strokeWidth="1.5"
                opacity="0.85"
              />
              <ellipse cx="105" cy="55" rx="14" ry="10" fill="#0288D1" stroke="#FFD54F" strokeWidth="1.5" />
              <ellipse cx="105" cy="55" rx="8" ry="6" fill="#1A237E" />
              <circle cx="105" cy="55" r="3" fill="#00E676" />
            </g>
          ))}
          {/* Peacock Body & Head */}
          <path
            d="M75 190 C60 160 65 110 95 95 C105 90 115 95 112 105 C105 125 85 140 85 190 Z"
            fill="#0277BD"
            stroke="#80DEEA"
            strokeWidth="2"
          />
          <circle cx="103" cy="98" r="3" fill="#FFF" />
          <path d="M112 98 L122 102 L112 104 Z" fill="#FFB300" />
          {/* Crown Feathers */}
          <path d="M100 90 L108 75 M103 90 L115 78 M97 90 L98 73" stroke="#FFD54F" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="108" cy="74" r="2.5" fill="#00E676" />
          <circle cx="115" cy="77" r="2.5" fill="#00E676" />
          <circle cx="98" cy="72" r="2.5" fill="#00E676" />
        </svg>
      );

    case 'floral-mandala':
      return (
        <svg viewBox="0 0 300 300" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="300" rx="20" fill="#1C1814" />
          {/* Outer Green Foliage Ring */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 150 150)`}>
              <ellipse cx="150" cy="25" rx="8" ry="16" fill="#2E7D32" stroke="#81C784" strokeWidth="1" />
            </g>
          ))}
          {/* Orange Marigold Ring */}
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 150 150)`}>
              <circle cx="150" cy="55" r="14" fill="#EF6C00" stroke="#FFE082" strokeWidth="1" />
              <circle cx="150" cy="55" r="8" fill="#F57C00" />
            </g>
          ))}
          {/* Red Rose Petal Layer */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 150 150)`}>
              <path d="M150 75 C135 95 135 115 150 125 C165 115 165 95 150 75 Z" fill="#B71C1C" />
            </g>
          ))}
          {/* Center Golden Blossom */}
          <circle cx="150" cy="150" r="28" fill="#FBC02D" stroke="#FFF9C4" strokeWidth="2" />
          <circle cx="150" cy="150" r="16" fill="#E65100" />
          <circle cx="150" cy="150" r="6" fill="#FFFFFF" />
        </svg>
      );

    case 'kolam-dots':
      return (
        <svg viewBox="0 0 300 300" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="300" rx="20" fill="#7F2B1D" />
          {/* Kolam Grid Frame */}
          <rect x="25" y="25" width="250" height="250" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 3" />
          {/* Looping Lines */}
          <path
            d="M150 50 Q200 100 250 150 Q200 200 150 250 Q100 200 50 150 Q100 100 150 50 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
          <path
            d="M150 80 Q180 115 220 150 Q180 185 150 220 Q120 185 80 150 Q120 115 150 80 Z"
            fill="none"
            stroke="#F2D98B"
            strokeWidth="2"
          />
          {/* 7x7 Grid Dots */}
          {[-60, -30, 0, 30, 60].map((dx, i) =>
            [-60, -30, 0, 30, 60].map((dy, j) => (
              <circle key={`${i}-${j}`} cx={150 + dx} cy={150 + dy} r="3" fill="#FFFFFF" />
            ))
          )}
          {/* Corner Kolam Accents */}
          <circle cx="50" cy="50" r="8" fill="none" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="250" cy="50" r="8" fill="none" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="50" cy="250" r="8" fill="none" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="8" fill="none" stroke="#FFF" strokeWidth="1.5" />
        </svg>
      );

    case 'simple-lotus':
      return (
        <svg viewBox="0 0 300 300" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="300" rx="20" fill="#24113D" />
          <circle cx="150" cy="150" r="130" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Central Swastika */}
          <path
            d="M150 95 L150 205 M95 150 L205 150 M150 95 L190 95 M150 205 L110 205 M95 150 L95 110 M205 150 L205 190"
            fill="none"
            stroke="#D32F2F"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 4 Corner Lotus Buds */}
          {[45, 135, 225, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 150 150)`}>
              <path
                d="M150 35 C140 55 140 70 150 80 C160 70 160 55 150 35 Z"
                fill="#FF80AB"
                stroke="#C2185B"
                strokeWidth="1.5"
              />
              <path d="M142 55 C132 65 136 75 146 78 Z" fill="#F48FB1" />
              <path d="M158 55 C168 65 164 75 154 78 Z" fill="#F48FB1" />
              <circle cx="150" cy="30" r="3" fill="#F2D98B" />
            </g>
          ))}
        </svg>
      );

    case 'modern-waves':
      return (
        <svg viewBox="0 0 300 300" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="300" rx="20" fill="#140E24" />
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7E57C2" />
              <stop offset="100%" stopColor="#B39DDB" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7043" />
              <stop offset="100%" stopColor="#FFAB91" />
            </linearGradient>
          </defs>
          <path
            d="M30 80 Q100 20 180 80 T300 90 L300 130 Q220 70 140 130 T10 130 Z"
            fill="url(#wave1)"
            opacity="0.9"
          />
          <path
            d="M10 140 Q90 80 170 140 T300 150 L300 190 Q220 130 140 190 T0 190 Z"
            fill="url(#wave2)"
            opacity="0.9"
          />
          <path
            d="M30 200 Q110 140 190 200 T300 210 L300 250 Q220 190 140 250 T20 250 Z"
            fill="#D4AF37"
            opacity="0.8"
          />
          <circle cx="140" cy="105" r="5" fill="#FFF" />
          <circle cx="170" cy="165" r="5" fill="#FFF" />
          <circle cx="210" cy="225" r="5" fill="#FFF" />
        </svg>
      );

    case 'corner-arc':
      return (
        <svg viewBox="0 0 300 300" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="300" rx="20" fill="#1B1226" />
          {/* L Corner Radial Arcs */}
          <path d="M0 0 L260 0 A260 260 0 0 1 0 260 Z" fill="#2E7D32" opacity="0.3" />
          <path d="M0 0 L220 0 A220 220 0 0 1 0 220 Z" fill="#C62828" opacity="0.5" />
          <path d="M0 0 L180 0 A180 180 0 0 1 0 180 Z" fill="#FBC02D" opacity="0.6" />
          <path d="M0 0 L140 0 A140 140 0 0 1 0 140 Z" fill="#2E7D32" />
          <path d="M0 0 L100 0 A100 100 0 0 1 0 100 Z" fill="#C62828" />
          <path d="M0 0 L60 0 A60 60 0 0 1 0 60 Z" fill="#F2D98B" />
          {/* Decorative Dot Accents */}
          {[0, 15, 30, 45, 60, 75, 90].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 0 0)`}>
              <circle cx="120" cy="0" r="3.5" fill="#FFFFFF" />
              <circle cx="160" cy="0" r="4" fill="#FFFFFF" />
              <circle cx="200" cy="0" r="4.5" fill="#FFFFFF" />
            </g>
          ))}
          {/* Corner Diya Icon */}
          <circle cx="35" cy="35" r="16" fill="#F57C00" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="35" cy="35" r="6" fill="#FFEB3B" />
        </svg>
      );

    case 'chowk-purna':
    default:
      return (
        <svg viewBox="0 0 300 300" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="300" rx="20" fill="#8C3A27" />
          {/* Geru base & white rice borders */}
          <rect x="25" y="25" width="250" height="250" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          <rect x="35" y="35" width="230" height="230" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 4" />
          {/* Inner Diamond */}
          <polygon points="150,45 255,150 150,255 45,150" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          {/* Sacred Kalash Motifs in corners */}
          <circle cx="150" cy="150" r="40" fill="#A8432D" stroke="#FFF" strokeWidth="2" />
          {/* Lotus Petals in Center */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 150 150)`}>
              <ellipse cx="150" cy="125" rx="7" ry="14" fill="#FFF" />
            </g>
          ))}
          <circle cx="150" cy="150" r="10" fill="#D4AF37" />
          {/* Auspicious Dots */}
          <circle cx="85" cy="85" r="4" fill="#FFF" />
          <circle cx="215" cy="85" r="4" fill="#FFF" />
          <circle cx="85" cy="215" r="4" fill="#FFF" />
          <circle cx="215" cy="215" r="4" fill="#FFF" />
        </svg>
      );
  }
};

