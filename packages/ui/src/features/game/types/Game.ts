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
        offsetX: 550;
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
        canvas: {
            /**
             * 0 for full width
             */
            width: number;
            /**
             * 0 for full height
             */
            height: number;
        };
    };
};

export type GameState = {
    velocityY: number;
    jumpKeyHeld: boolean;
    isJumping: boolean;
    isLasering: boolean;
    laserLeft: number;
    laserReach: number;
    boosted: boolean;
    gameSpeed: number;
    player: { x: number; y: number; image: string };
    layout: { width: number; height: number };
};
