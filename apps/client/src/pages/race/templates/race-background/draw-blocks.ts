import { getRaceTrackRowColumnSizes, raceTileSize } from '../data/race-data';

/** Render size of a side of a race track block */
const rowColumnSize = getRaceTrackRowColumnSizes();

interface DrawBlockArgs {
  tile: { x: number; y: number };
  i: number;
  j: number;
}

interface DrawDebugProps {
  i: number;
  j: number;
}

export class SpriteDraw {
  public ctx: CanvasRenderingContext2D | null;
  private canvas: HTMLCanvasElement;
  private image: HTMLImageElement;
  private width: number;
  private height: number;

  /** SpriteDraw constructor
   * @param canvas canvas element in DOM
   * @param image sprite sheet image as a HTMLImageElement
   * @param width width of canvas
   * @param height height of canvas
   */
  constructor(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    width: number,
    height: number,
  ) {
    this.canvas = canvas;
    this.image = image;
    this.width = width;
    this.height = height;

    this.canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) {
      return;
    }
    this.ctx.imageSmoothingEnabled = false;
  }

  /** Draw blocks
   * @param ctx - Canvas context
   * @param tile - Tile position in sprite-sheet (x, y)
   * @param i - Row index
   * @param j - Column index
   */
  public drawBlock = ({ tile, i, j }: DrawBlockArgs): void => {
    const { x, y } = tile;
    if (!this.ctx) {
      return;
    }
    this.ctx.drawImage(
      this.image,
      raceTileSize * x,
      raceTileSize * y,
      raceTileSize,
      raceTileSize,
      rowColumnSize * j,
      rowColumnSize * i,
      rowColumnSize,
      rowColumnSize,
    );
  };

  /** Draw debug blocks (square borders around blocks)
   * @param ctx - Canvas context
   * @param i - Row index
   * @param j - Column index
   */
  drawDebugBlock = ({ i, j }: DrawDebugProps): void => {
    if (!this.ctx) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#ff5959';
    this.ctx.lineWidth = 1;
    this.ctx.rect(
      rowColumnSize * j,
      rowColumnSize * i,
      rowColumnSize,
      rowColumnSize,
    );
    this.ctx.stroke();
  };
}
