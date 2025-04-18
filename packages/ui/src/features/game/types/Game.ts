export type Game = {
    physics: {
        gravity: number;
        baseJumpStrength: number;
        jumpStrength: number;
        boostMultiplier: number;
        baseSpeed: number;
    };
    player: {
        size: number;
    };
    layout: {
        floorPadding: number;
        canvas: { width: number; height: number };
        obstacleSpacing: number;
        obstacleStartOffset: number;
        obstacleThresholds: number[];
    };
};

export type GameState = {
    velocityY: number;
    jumpKeyHeld: boolean;
    isJumping: boolean;
    isLasering: boolean;
    boosted: boolean;
    gameSpeed: number;
    player: { x: number; y: number; image: string };
};
