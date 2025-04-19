export type Game = {
    physics: {
        gravity: number;
        baseJumpStrength: number;
        jumpStrength: number;
        boostMultiplier: number;
        slowMultiplier: number;
        baseSpeed: number;
    };
    player: {
        size: number;
        offsetX: number;
        lives: number;
    };
    score: {
        bugKilled: number;
        frameToDistance: number;
    };
    laser: {
        offset: number;
        min: number;
        max: number;
        recoveryRate: number;
        cost: number;
        minReach: number;
        maxReach: number;
    };
    layout: {
        floorPadding: number;
        obstacleSpacing: number;
        obstacleStartOffset: number;
        obstacleThresholds: number[];
        // TODO: This might be no longer needed
        canvas: {
            width: number;
            height: number;
        };
    };
};

export type GameState = {
    status: "IDLE" | "ON";
    velocityY: number;
    jumpKeyHeld: boolean;
    isJumping: boolean;
    isLasering: boolean;
    isColliding: boolean;
    laserLeft: number;
    laserReach: number;
    gameSpeed: number;
    player: { x: number; y: number; image: string; lives: number };
    layout: { width: number; height: number };
    bugsKilled: number;
    framesAlive: number;
};
