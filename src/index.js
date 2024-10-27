import { canvasWidth } from './classes/Globals.js';
import Player from './classes/Player.js';
import EnemyManager from './classes/EnemyManager.js';

const config = {
    type: Phaser.AUTO, // Phaser will decide the rendering mode (WebGL or Canvas) automatically
    width: canvasWidth,
    height: 487,
    parent: 'phaser-game', // Attach the canvas to this div
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    scene: {
        preload,
        create,
        update,
    },
};

const game = new Phaser.Game(config);
let player;
let enemyManager;

function preload() {
    // Preload assets
    player = new Player(this);
    player.preload();
    enemyManager = new EnemyManager(this);
    enemyManager.preload();
}

function create() {
    // Set up the game objects
    player.create();
    enemyManager.create();
}

function update(time) {
    // Update player movement and shooting
    player.update(time);

    // Update enemy movement and spawning
    enemyManager.update();
}
