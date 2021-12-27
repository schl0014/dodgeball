import KeyListener from './KeyListener.js';

export default class Player {
  public static readonly PLAYER_BALL_RADIUS = 50;

  public static readonly PLAYER_COLOR = 'red';

  public handsLeftPositonY: number;

  public handsLeftPositonX: number;

  public handsRightPositionY: number;

  public handsRightPositionX: number;

  public playerPositionX: number;

  public playerPositionY: number;

  public playerCanvasPositionY: number;

  public playerCanvasLeftPositionY: number;

  public playerCanvasRightPositionY: number;

  private keyListener: KeyListener;

  private height: number;

  private width: number;

  /**
   * Construc a new instance of this class
   *
   * @param heightCanvas get the canvasheight
   * @param widthCanvas get the widtCanvas
   */
  constructor(heightCanvas: number, widthCanvas: number) {
    this.height = heightCanvas;
    this.width = widthCanvas;
    this.keyListener = new KeyListener();
    // Set the player at the center
    this.setPlayerPositionCenter();
  }

  /**
   * set the player at the center
   */
  private setPlayerPositionCenter() {
    this.playerPositionX = this.width / 2;
    this.playerPositionY = this.height / 2;
    this.playerCanvasPositionY = this.height / 2;
    this.playerCanvasLeftPositionY = this.height / 2;
    this.playerCanvasRightPositionY = this.height / 2;
    this.handsLeftPositonX = (this.width / 2) + Player.PLAYER_BALL_RADIUS * 2;
    this.handsLeftPositonY = (this.height / 2);
    this.handsRightPositionX = (this.width / 2) - Player.PLAYER_BALL_RADIUS * 2;
    this.handsRightPositionY = (this.height / 2);
  }

  /**
   * prevent player from going outside the y border
   */
  public preventPlayerBorderY(): void {
    if (this.playerPositionY > this.height) {
      this.playerPositionY = 0;
      this.playerCanvasPositionY = this.height;
    }
    if (this.playerPositionY < 0) {
      this.playerPositionY = this.height;
      this.playerCanvasPositionY = 0;
    }
    if (this.handsLeftPositonY > this.height) {
      this.handsLeftPositonY = 0;
      this.playerCanvasLeftPositionY = this.height;
    }
    if (this.handsLeftPositonY < 0) {
      this.handsLeftPositonY = this.height;
      this.playerCanvasLeftPositionY = 0;
    }
    if (this.handsRightPositionY > this.height) {
      this.handsRightPositionY = 0;
      this.playerCanvasRightPositionY = this.height;
    }
    if (this.handsRightPositionY < 0) {
      this.handsRightPositionY = this.height;
      this.playerCanvasRightPositionY = 0;
    }
  }

  /**
   * prevent player from going outside the x border
   */
  public preventPlayerBorderX(): void {
    if (this.playerPositionX > this.width) { this.playerPositionX = 0; }
    if (this.playerPositionX < 0) { this.playerPositionX = this.width; }
    if (this.handsLeftPositonX > this.width) { this.handsLeftPositonX = 0; }
    if (this.handsLeftPositonX < 0) { this.handsLeftPositonX = this.width; }
    if (this.handsRightPositionX > this.width) { this.handsRightPositionX = 0; }
    if (this.handsRightPositionX < 0) { this.handsRightPositionX = this.width; }
  }

  /**
   * the player goes left when you press the key a or the key left
   */
  public left(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_A)
      || this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.playerPositionX -= 10;
      this.handsLeftPositonX -= 10;
      this.handsRightPositionX -= 10;
    }
  }

  /**
   * the player goes right when you press the right key or the key d
   */
  public right(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_D)
      || this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.playerPositionX += 10;
      this.handsLeftPositonX += 10;
      this.handsRightPositionX += 10;
    }
  }

  /**
   * player goes down when you press the up key or the w key
   */
  public down(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_W)
      || this.keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.playerCanvasPositionY -= 10;
      this.playerCanvasRightPositionY -= 10;
      this.playerCanvasLeftPositionY -= 10;
      this.playerPositionY += 10;
      this.handsLeftPositonY += 10;
      this.handsRightPositionY += 10;
    }
  }

  /**
   * player goes up when you press the down key or the s key
   */
  public up(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN)
      || this.keyListener.isKeyDown(KeyListener.KEY_S)) {
      this.playerCanvasPositionY += 10;
      this.playerCanvasRightPositionY += 10;
      this.playerCanvasLeftPositionY += 10;
      this.playerPositionY -= 10;
      this.handsLeftPositonY -= 10;
      this.handsRightPositionY -= 10;
    }
  }
}
