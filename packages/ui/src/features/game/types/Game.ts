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
        difficultyMultiplier: number;
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
    obstacles: {
        minSpacing: number;
        spacing: number;
        offset: number;
        thresholds: number[];
        difficultyBreakpoint: number;
        difficultyIncrease: number;
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
    frameCount: number;
    distanceCount: number;
    stats: {
        bugsKilled: number;
        frameCount: number;
        score: number;
    }[];
    difficulty: number;
};
