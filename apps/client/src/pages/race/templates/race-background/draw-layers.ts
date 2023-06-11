import {
  raceTrackFreeCols,
  raceTrackTotalCols,
  tileMap,
  treePadding,
} from '../data/race-data';

import { SpriteDraw } from './draw-blocks';

interface DrawLayerArgs {
  roadBlocks: React.MutableRefObject<string[][]>;
  pavementRows: number;
  draw: SpriteDraw;
  cols: number;
  totalRows: number;
  isDebug?: boolean;
}

export const drawLayers = ({
  roadBlocks,
  pavementRows,
  draw,
  cols,
  totalRows,
  isDebug = true,
}: DrawLayerArgs): void => {
  // Draw road blocks
  roadBlocks.current.forEach((roadBlocksCol: string[], i: number) => {
    roadBlocksCol.forEach((roadBlock: string, j: number) => {
      const roadBlockPos = tileMap.get(roadBlock) || { x: 11, y: 19 };
      // Skipping pavement rows
      const rowsBefore = i + pavementRows;
      // Skipping free road blocks
      const colsBefore = j + raceTrackFreeCols;
      draw.drawBlock({ tile: roadBlockPos, i: rowsBefore, j: colsBefore });
    });
  });

  // Draw road cones at the end of the road on odd rows
  for (let i = pavementRows; i < totalRows; i++) {
    // Road cones placement depends on number of pavement rows,
    // if number of pavement rows is 2, then road cones are placed on 4,6,8...
    // if number of pavement rows is 3, then road cones are placed on 5,7,9...
    // Adding pavementRows to i will make value 2n + i; where i will be the factor to determine if it is odd or even.
    if ((pavementRows + i) % 2 === 1) {
      const roadConesPos = tileMap.get('road-cones') || { x: 0, y: 0 };
      const roadConesRightPadding = raceTrackFreeCols + 2;
      draw.drawBlock({
        tile: roadConesPos,
        i,
        j: raceTrackTotalCols - roadConesRightPadding,
      });
    }
  }

  // Draw pavement
  for (let i = 0; i < pavementRows; i++) {
    for (let j = 0; j < raceTrackTotalCols; j++) {
      if (i === pavementRows - 1) {
        const pavementBorderPos = tileMap.get('pavement-border') || {
          x: 0,
          y: 0,
        };
        draw.drawBlock({ tile: pavementBorderPos, i, j });
        continue;
      }
      const pavementPos = tileMap.get('pavement') || { x: 0, y: 0 };
      draw.drawBlock({ tile: pavementPos, i, j });
    }
  }

  // Draw trees
  if (pavementRows > 2) {
    let index = treePadding;
    while (index < raceTrackTotalCols - treePadding) {
      // Picking random tree
      const randomTree = Math.floor(Math.random() * 6) + 1;
      // Getting tree top and bottom sprite-sheet positions
      const treeTopPos = tileMap.get(`tree-${randomTree}-top`) || {
        x: 0,
        y: 0,
      };
      draw.drawBlock({ tile: treeTopPos, i: pavementRows - 3, j: index });
      const treeBottomPos = tileMap.get(`road-tree-${randomTree}-bottom`) || {
        x: 0,
        y: 0,
      };
      draw.drawBlock({
        tile: treeBottomPos,
        i: pavementRows - 2,
        j: index,
      });
      index += 4;
    }
  }

  // Draw two sides (left & right) free parking road blocks
  for (let i = pavementRows; i < totalRows; i++) {
    for (let j = 0; j < raceTrackFreeCols; j++) {
      const roadPos = tileMap.get('empty-road') || { x: 0, y: 0 };
      draw.drawBlock({ tile: roadPos, i, j });
    }
  }
  for (let i = pavementRows; i < totalRows; i++) {
    for (
      let j = raceTrackTotalCols - raceTrackFreeCols;
      j < raceTrackTotalCols;
      j++
    ) {
      const roadPos = tileMap.get('empty-road') || { x: 0, y: 0 };
      draw.drawBlock({ tile: roadPos, i, j });
    }
  }

  // Draw Debug
  if (isDebug) {
    for (let i = 0; i < totalRows; i++) {
      for (let j = 0; j < cols; j++) {
        draw.drawDebugBlock({ i, j });
      }
    }
  }
};
