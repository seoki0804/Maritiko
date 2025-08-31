// frontend/components/SimulationCanvas.tsx
import React, { useCallback } from 'react';
import { Stage, Graphics, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';

// 컴포넌트가 받을 데이터의 타입을 정의합니다.
interface SimulationCanvasProps {
  state: {
    time: number;
    position: [number, number];
    heading_deg: number;
  } | null;
}

// 선박을 그리는 로직
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
    backgroundAlpha: 0,
    resizeTo: window,
  };

  return (
    <div className="w-full h-full bg-blue-900 rounded-md relative">
      <Stage options={stageOptions}>
        {state ? (
          <Vessel position={state.position} heading_deg={state.heading_deg} />
        ) : (
          <Text
            text="Waiting for simulation to start..."
            anchor={0.5}
            x={window.innerWidth / 2 - 240} // Adjust for sidebar
            y={window.innerHeight / 2}
            style={new PIXI.TextStyle({ fill: 'white' })}
          />
        )}
      </Stage>
    </div>
  );
};

export default SimulationCanvas;
