export type Game = {
    physics: {
        gravity: number;
        jumpStrength: number;
        boostMultiplier: number;
        slowMultiplier: number;
        baseSpeed: number;
    };
    player: {
        size: number;
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
    status: "LOADING" | "IDLE" | "ON" | "OVER";
    velocityY: number;
    jumpKeyHeld: boolean;
    isJumping: boolean;
    isLasering: boolean;
    isColliding: boolean;
    isSpawning: boolean;
    laserLeft: number;
    laserReach: number;
    gameSpeed: number;
    player: {
        offsetX: number;
        x: number;
        y: number;
        image:
            | "player-neutral"
            | "player-fast"
            | "player-slow"
            | "player-laser"
            | "player-disgusted";
        lives: number;
    };
    layout: { width: number; height: number };
    bugsKilled: number;
    framesAlive: number;
    stats: {
        bugsKilled: number;
        framesAlive: number;
        score: number;
    }[];
};
