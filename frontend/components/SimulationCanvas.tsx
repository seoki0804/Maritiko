// frontend/components/SimulationCanvas.tsx
import React, { useCallback } from 'react';
import { Stage, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';

interface SimulationCanvasProps {
  state: {
    time: number;
    position: [number, number];
    heading_deg: number;
  } | null;
}

const Vessel = ({ position, heading_deg }: { position: [number, number], heading_deg: number }) => {
  const draw = useCallback((g: PIXI.Graphics) => {
    const heading_rad = (heading_deg * Math.PI) / 180 - Math.PI / 2; // North-up
    const length = 50;
    const width = 15;

    const points = [
      length / 2, 0,
      -length / 2, -width / 2,
      -length / 2, width / 2,
    ];

    g.clear();
    g.beginFill(0xffa500); // Orange
    g.drawPolygon(points);
    g.endFill();
    g.rotation = heading_rad;
    g.position.set(position[1], -position[0]); // World (N,E) to Canvas (Y, -X)
  }, [position, heading_deg]);

  return <Graphics draw={draw} />;
};


const SimulationCanvas = ({ state }: SimulationCanvasProps) => {
  const stageOptions = {
    background: 0x162c4d, // Deep blue background
    resizeTo: window,
  };

  return (
    <div className="w-full h-full rounded-md overflow-hidden">
      <Stage options={stageOptions}>
        {state ? (
          <Vessel position={state.position} heading_deg={state.heading_deg} />
        ) : (
          <Text
            text="Waiting for simulation to start..."
            anchor={0.5}
            x={window.innerWidth / 2 - 120} // Adjust for sidebar
            y={window.innerHeight / 2}
            style={new PIXI.TextStyle({ fill: 'white', fontSize: 24 })}
          />
        )}
      </Stage>
    </div>
  );
};

export default SimulationCanvas;

