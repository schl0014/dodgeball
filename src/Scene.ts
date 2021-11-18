import Game from './Game.js';
import Ball from './Ball.js';

export default class Scene {
  private canvas: HTMLCanvasElement;

  private playerPositionX: number;

  private ball: Ball;

  /**
   * Construc a new instance of this class
   *
   * @param canvas the canvas to render on
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;

    // Resize the canvas to full window size
    this.canvas.width = window.innerWidth - 1;
    this.canvas.height = window.innerHeight - 4;

    // Spawn a Ball
    this.ball = new Ball(this.canvas);

    // Set the player at the center
    this.playerPositionX = this.canvas.width / 2;
  }

  // /**
  //   * Handles any user input that has happened since the last call
  //   */
  // public processInput(): void {

  // }

  /**
   * Update the game
   *
   * @param t time
   * @returns `true` if the game is over
   */
  public update(t: number): boolean {
    this.ball.applyPhysics(t);

    this.ball.bounceFromCanvasWalls(this.canvas);

    return this.ball.overlapsWith(this.playerPositionX, Game.PLAYER_BALL_RADIUS,
      Game.PLAYER_BALL_RADIUS);
  }

  /**
   * Draws the game to the canvas
   */
  public render(): void {
    // draw: the items on the canvas
    // Get the canvas rendering context
    const ctx = this.canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the player
    ctx.fillStyle = 'red';
    ctx.beginPath();
    const playerPositionY = this.canvas.height - 50;
    ctx.ellipse(this.playerPositionX, playerPositionY, 50, 50, 0, 0, 2 * Game.FULL_CIRCLE);
    ctx.fill();

    // Draw the ball
    this.ball.render(this.canvas, ctx);
  }
}
