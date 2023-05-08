interface RoadBlockGenerationArgs {
  rows: number;
  cols: number;
}

export type RoadBlocks = Array<Array<string>>;

export const roadBlocksGeneration = ({
  rows,
  cols,
}: RoadBlockGenerationArgs): RoadBlocks => {
  const roadBlocks: RoadBlocks = [];
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
  return roadBlocks;
};
