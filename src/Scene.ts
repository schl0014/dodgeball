import Game from './Game.js';
import Ball from './Ball.js';
import Player from './player.js';

export default class Scene {
  private player: Player;

  private canvas: HTMLCanvasElement;

  private balls: Array<Ball> = [];

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
    this.player = new Player(this.canvas.height, this.canvas.width);

    // Spawn the Balls
    for (let i = 0; i < Game.INITIAL_BALL_COUNT; i++) {
      this.balls.push(new Ball(this.canvas));
    }
  }

  /**
   *  Handles any user input that has happened since the last call
   */
  public processInput(): void {
    // the player goes left
    this.player.left();
    // the player goes right
    this.player.right();
    // the player goes down
    this.player.down();
    // the player goes up
    this.player.up();
    // Prevents the player from passing the x borders
    this.player.preventPlayerBorderX();

    // Prevents the player from passing the y borders
    this.player.preventPlayerBorderY();
  }

  /**
   * Update the game
   *
   * @param t time
   * @returns `true` if the game is over
   */
  public update(t: number): boolean {
    this.balls.forEach((ball: Ball) => {
      ball.applyPhysics(t);
      ball.bounceFromCanvasWalls(this.canvas);
    });

    return this.balls.reduce(
      (previousReturn: boolean, ball: Ball) => previousReturn
        || ball.overlapsWith(
          this.player.playerPositionX, this.player.playerPositionY, Player.PLAYER_BALL_RADIUS,
        ),
      false,
    );
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
    ctx.ellipse(this.player.playerPositionX, this.player.playerCanvasPositionY,
      50, 50, 0, 0, 2 * Game.FULL_CIRCLE);
    ctx.ellipse(this.player.handsLeftPositonX, this.player.playerCanvasLeftPositionY,
      50, 50, 0, 0, 2 * Game.FULL_CIRCLE);
    ctx.ellipse(this.player.handsRightPositionX, this.player.playerCanvasRightPositionY,
      50, 50, 0, 0, 2 * Game.FULL_CIRCLE);
    ctx.fill();

    // Draw the ball
    this.balls.forEach((ball: Ball) => {
      ball.render(this.canvas, ctx);
    });
  }
}
