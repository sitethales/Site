
import React from 'react';

interface OrbitingCirclesProps {
  innerRadius?: number;
  outerRadius?: number;
  innerDuration?: number;
  outerDuration?: number;
  innerChildren: React.ReactNode[];
  outerChildren: React.ReactNode[];
}

const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({ 
  innerRadius = 80, 
  outerRadius = 130,
  innerDuration = 15,
  outerDuration = 25,
  innerChildren,
  outerChildren
}) => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Inner orbit path */}
      <div 
        className="absolute border border-primary/20 rounded-full"
        style={{
          width: innerRadius * 2,
          height: innerRadius * 2,
        }}
      />
      
      {/* Outer orbit path */}
      <div 
        className="absolute border border-primary/15 rounded-full"
        style={{
          width: outerRadius * 2,
          height: outerRadius * 2,
        }}
      />
      
      {/* Inner orbiting elements (clockwise) */}
      {innerChildren.map((child, index) => {
        const angle = (360 / innerChildren.length) * index;
        
        return (
          <div
            key={`inner-${index}`}
            className="absolute animate-orbit"
            style={{
              '--radius': `${innerRadius}px`,
              '--angle': `${angle}deg`,
              '--duration': `${innerDuration}s`,
            } as React.CSSProperties}
          >
            {child}
          </div>
        );
      })}

      {/* Outer orbiting elements (counter-clockwise) */}
      {outerChildren.map((child, index) => {
        const angle = (360 / outerChildren.length) * index;
        const delay = (outerDuration / outerChildren.length) * index;
        
        return (
          <div
            key={`outer-${index}`}
            className="absolute animate-orbit-reverse"
            style={{
              '--radius': `${outerRadius}px`,
              '--angle': `${angle}deg`,
              '--duration': `${outerDuration}s`,
            } as React.CSSProperties}
          >
            {child}
          </div>
        );
      })}
      
      {/* Center element with uploaded image */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="p-4 bg-background/80 backdrop-blur-md rounded-full border border-primary/20 shadow-elegant">
          <img 
            src="/lovable-uploads/c600054e-c290-4656-ae88-f910dbdea559.png" 
            alt="Center logo" 
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default OrbitingCircles;
