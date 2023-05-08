export const raceTrackCols = 40;
export const raceTrackFreeCols = 3;
// Add free parking columns to both sides
export const raceTrackTotalCols = raceTrackCols + 2 * raceTrackFreeCols;
export const treePadding = 4;
export const raceTileSize = 16;
export const raceTrackRowColumnMultiplier = 2;
// Full width of race track
export const raceTrackWidth =
  raceTrackTotalCols * raceTileSize * raceTrackRowColumnMultiplier;
// Playing area width
export const raceLineWidth =
  raceTrackCols * raceTileSize * raceTrackRowColumnMultiplier;
export const raceFreeParkingWidth =
  raceTrackFreeCols * raceTileSize * raceTrackRowColumnMultiplier;

export const carColors = [
  '#C03E41',
  '#4AA0F0',
  '#5AE179',
  '#FFBB3D',
  '#CF5CF5',
  '#8C5CF5',
  '#5CF5D9',
  '#D6F55C',
  '#F49F4F',
  '#5F5CF5',
  '#F5DD5C',
  '#F55CDC',
];

/** Number of rows in race track.
 * Based on player count
 * @param count Number of players
 * @returns Number of rows
 */
export const getRaceTrackNRows = (count: number): number => {
  if (count === 1) {
    return 3;
  }
  return count * 2 - 1;
};

/** Number of pavement rows in race track
 * Based on player count
 * @param count Number of players
 * @returns Number of pavement rows
 */
export const getRaceTrackPavementRows = (count: number): number => {
  return count <= 2 ? 4 : count <= 4 ? 3 : count <= 6 ? 2 : 0;
};

/** Calculate race track height.
 * Based on number of rows and tile size
 * @param totalRows Number of rows
 */
export const getRaceTrackHeight = (totalRows: number): number => {
  return totalRows * raceTileSize * raceTrackRowColumnMultiplier;
};

/** Calculate size of single block. */
export const getRaceTrackRowColumnSizes = (): number => {
  return raceTileSize * raceTrackRowColumnMultiplier;
};

export const carComponentActualWidth = 55;
export const carComponentActualHeight = 15;

interface CarComponentSize {
  carSizeFactor: number;
  carWidth: number;
  carHeight: number;
}
export const getCarComponentSize = (): CarComponentSize => {
  const carSizeFactor = 0.55 * raceTrackRowColumnMultiplier;
  const carWidth = carComponentActualWidth * carSizeFactor;
  const carHeight = carComponentActualHeight * carSizeFactor;

  return { carSizeFactor, carWidth, carHeight };
};

export const tileMap = new Map([
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
