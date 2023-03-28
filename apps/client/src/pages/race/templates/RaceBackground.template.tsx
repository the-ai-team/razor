import spritesheet from '../../../assets/spritesheets/city-tiles-map.png';

import { ReactElement, useEffect, useRef } from 'react';

interface RaceBackgroundProps {
  count: number;
  className?: string;
}

export function RaceBackground({
  count,
  className,
}: RaceBackgroundProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let roadBlocks: string[][] = [];
  const cols = 42;
  const rows = count * 2 - 1;
  const pavementRows = count <= 2 ? 4 : count <= 4 ? 3 : count <= 6 ? 2 : 0;
  const totalRows = rows + pavementRows;
  const width = 1000;
  const height = (width / cols) * totalRows;
  const columnWidth = width / cols;
  const rowHeight = height / totalRows;

  const tileSize = 16;

  const tileMap = new Map([
    ['brown-left', { x: 0, y: 0 }],
    ['brown-right', { x: 1, y: 0 }],
    ['brown-top', { x: 2, y: 0 }],
    ['brown-bottom', { x: 3, y: 0 }],
    ['road-corner-top-left', { x: 15, y: 21 }],
    ['road-corner-bottom-left', { x: 15, y: 22 }],
    ['road-corner-top-right', { x: 16, y: 21 }],
    ['road-corner-bottom-right', { x: 16, y: 22 }],
    ['road-line-top', { x: 18, y: 22 }],
    ['road-line-bottom', { x: 17, y: 22 }],
    ['road-line-left', { x: 18, y: 21 }],
    ['road-line-right', { x: 17, y: 21 }],
    ['road-line-middle', { x: 9, y: 19 }],
    ['empty-road', { x: 11, y: 19 }],
    ['road-cones', { x: 14, y: 18 }],
    ['tire-piles', { x: 14, y: 14 }],
    ['tire-pile', { x: 13, y: 14 }],
    ['tire-pile-small', { x: 12, y: 14 }],
    ['pavement-border', { x: 7, y: 22 }],
    ['pavement', { x: 7, y: 20 }],
    ['tree-1-top', { x: 31, y: 10 }],
    ['tree-2-top', { x: 32, y: 10 }],
    ['tree-3-top', { x: 33, y: 10 }],
    ['tree-4-top', { x: 34, y: 10 }],
    ['tree-5-top', { x: 35, y: 10 }],
    ['tree-6-top', { x: 36, y: 10 }],
    ['road-tree-1-bottom', { x: 31, y: 12 }],
    ['road-tree-2-bottom', { x: 32, y: 12 }],
    ['road-tree-3-bottom', { x: 33, y: 12 }],
    ['road-tree-4-bottom', { x: 34, y: 12 }],
    ['road-tree-5-bottom', { x: 35, y: 12 }],
    ['road-tree-6-bottom', { x: 36, y: 12 }],
  ]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const roadBlocksGeneration = (): void => {
      roadBlocks = [];
      for (let i = 0; i < rows; i++) {
        const roadBlocksRow: string[] = [];
        for (let j = 0; j < cols; j++) {
          switch (i) {
            case 0:
              if (j === 0) {
                roadBlocksRow.push('road-corner-top-left');
              } else if (j === cols - 1) {
                roadBlocksRow.push('road-corner-top-right');
              } else {
                roadBlocksRow.push('road-line-top');
              }
              break;
            case rows - 1:
              if (j === 0) {
                roadBlocksRow.push('road-corner-bottom-left');
              } else if (j === cols - 1) {
                roadBlocksRow.push('road-corner-bottom-right');
              } else {
                roadBlocksRow.push('road-line-bottom');
              }
              break;
            default:
              if (j === 0) {
                roadBlocksRow.push('road-line-left');
              } else if (j === cols - 1) {
                roadBlocksRow.push('road-line-right');
              } else if (i % 2 === 1 && j % 2 === 1) {
                roadBlocksRow.push('road-line-middle');
              } else {
                roadBlocksRow.push('empty-road');
              }
              break;
          }
        }
        roadBlocks.push(roadBlocksRow);
      }
    };

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx!.imageSmoothingEnabled = false;

    interface drawProps {
      ctx: CanvasRenderingContext2D;
      tile: { x: number; y: number };
      i: number;
      j: number;
    }

    /** Draw blocks
     * @param ctx - Canvas context
     * @param tile - Tile position in spritesheet (x, y)
     * @param i - Row index
     * @param j - Column index
     */
    const drawBlock = ({ ctx, tile, i, j }: drawProps): void => {
      const { x, y } = tile;
      ctx.drawImage(
        image,
        tileSize * x,
        tileSize * y,
        tileSize,
        tileSize,
        columnWidth * j,
        rowHeight * i,
        columnWidth,
        rowHeight,
      );
    };

    const image = new Image();
    image.src = spritesheet;
    image.onload = (): void => {
      roadBlocksGeneration();
      roadBlocks.forEach((roadBlocksCol: string[], i: number) => {
        roadBlocksCol.forEach((roadBlock: string, j: number) => {
          if (ctx === null) {
            return;
          }
          const roadBlockPos = tileMap.get(roadBlock) || { x: 11, y: 19 };
          const rowsBefore = i + pavementRows;
          drawBlock({ ctx: ctx, tile: roadBlockPos, i: rowsBefore, j });
        });
      });

      // Draw road cones at the end of the road on odd rows
      for (let i = pavementRows; i < totalRows; i++) {
        if (ctx === null) {
          return;
        }
        const gapFactor = pavementRows % 2 === 0 ? 1 : 0;
        if (i % 2 === gapFactor) {
          const tirePilesPos = tileMap.get('road-cones') || { x: 0, y: 0 };
          drawBlock({ ctx, tile: tirePilesPos, i, j: cols - 2 });
        }
      }

      // Draw pavement
      for (let i = 0; i < pavementRows; i++) {
        for (let j = 0; j < cols; j++) {
          if (ctx === null) {
            return;
          }
          if (i === pavementRows - 1) {
            const pavementBorderPos = tileMap.get('pavement-border') || {
              x: 0,
              y: 0,
            };
            drawBlock({ ctx, tile: pavementBorderPos, i, j });
            continue;
          }
          const pavementPos = tileMap.get('pavement') || { x: 0, y: 0 };
          drawBlock({ ctx, tile: pavementPos, i, j });
        }
      }

      //Draw trees
      if (pavementRows > 2) {
        const padding = 2;
        let index = padding;
        while (index < cols - padding) {
          if (ctx === null) {
            return;
          }
          const randomTree = Math.floor(Math.random() * 6) + 1;
          const treeTopPos = tileMap.get(`tree-${randomTree}-top`) || {
            x: 0,
            y: 0,
          };
          drawBlock({ ctx, tile: treeTopPos, i: pavementRows - 3, j: index });
          const treeBottomPos = tileMap.get(
            `road-tree-${randomTree}-bottom`,
          ) || {
            x: 0,
            y: 0,
          };
          drawBlock({
            ctx,
            tile: treeBottomPos,
            i: pavementRows - 2,
            j: index,
          });
          index += 4;
        }
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
