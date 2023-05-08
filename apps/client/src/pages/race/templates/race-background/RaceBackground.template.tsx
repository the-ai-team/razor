import spritesheet from '../../../../assets/spritesheets/city-tiles-map.png';

import { ReactElement, useEffect, useRef } from 'react';
import {
  getRaceTrackHeight,
  getRaceTrackNRows,
  getRaceTrackPavementRows,
  raceTrackCols,
  raceTrackWidth,
} from '../data/race-data';
import { SpriteDraw } from './draw-blocks';
import { drawLayers } from './draw-layers';
import { RoadBlocks, roadBlocksGeneration } from './road-block-generation';

interface RaceBackgroundProps {
  count: number;
  className?: string;
  isDebug?: boolean;
}

export function RaceBackground({
  count,
  className,
  isDebug = false,
}: RaceBackgroundProps): ReactElement {
  /** Race background canvas */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Road blocks names array.
   * This is a 2D array. First level arrays keep rows and second level arrays keep block names.
   * This will be used to render the road blocks in canvas.
   */
  const roadBlocks = useRef<RoadBlocks>([]);
  /** Predefined amount of columns in race track. */
  const cols = raceTrackCols;
  /** Number of rows in race track base on player count. */
  const rows = getRaceTrackNRows(count);
  /** Number of pavement rows  */
  const pavementRows = getRaceTrackPavementRows(count);
  const totalRows = rows + pavementRows;

  /** Race track width */
  const width = raceTrackWidth;
  /** Race track height */
  const height = getRaceTrackHeight(totalRows);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    roadBlocks.current = roadBlocksGeneration({ rows, cols });

    const canvas = canvasRef.current;
    const image = new Image();
    image.src = spritesheet;

    image.onload = (): void => {
      const draw = new SpriteDraw(canvas, image, width, height);
      drawLayers({
        roadBlocks,
        pavementRows,
        draw,
        cols,
        totalRows,
        isDebug,
      });
    };

    return () => {
      roadBlocks.current = [];
      image.onload = null;
    };
  }, [count, cols, height, pavementRows, rows, totalRows, width, isDebug]);

  return <canvas ref={canvasRef} className={className} />;
}
