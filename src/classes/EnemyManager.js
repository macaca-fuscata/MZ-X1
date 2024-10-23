import { canvasWidth } from './Globals.js';
import EnemyShipNorm01 from '../assets/images/prototype-enemy0001.png';
import EnemyShipNorm02 from '../assets/images/prototype-enemy0003.png';
import EnemyShipBoss01 from '../assets/images/prototype-enemy0002.png';

export default class EnemyManager {
    constructor(scene) {
        this.scene = scene;
        this.enemies;
        this.enemySpeed = 100;
        this.enemyFormation = [
            { x: 50, y: 30 },   // Row 1
            { x: 100, y: 30 },
            { x: 150, y: 30 },
            { x: 200, y: 30 },
            { x: 250, y: 30 },
            { x: 300, y: 30 },
        
            { x: 75, y: 70 },   // Row 2
            { x: 125, y: 70 },
            { x: 175, y: 70 },
            { x: 225, y: 70 },
            { x: 275, y: 70 },
            { x: 325, y: 70 },
        
            { x: 50, y: 110 },  // Row 3
            { x: 100, y: 110 },
            { x: 150, y: 110 },
            { x: 200, y: 110 },
            { x: 250, y: 110 },
            { x: 300, y: 110 },
        
            { x: 75, y: 150 },  // Row 4
            { x: 125, y: 150 },
            { x: 175, y: 150 },
            { x: 225, y: 150 },
            { x: 275, y: 150 },
            { x: 325, y: 150 },
        
            { x: 50, y: 190 },  // Row 5
            { x: 100, y: 190 },
            { x: 150, y: 190 },
            { x: 200, y: 190 },
            { x: 250, y: 190 },
            { x: 300, y: 190 },
        ];
    }

    preload() {
        this.scene.load.image('enemyN01', EnemyShipNorm01);
        this.scene.load.image('enemyN02', EnemyShipNorm02);
        this.scene.load.image('enemyB01', EnemyShipBoss01);
    }

    create() {
        // Create a group for enemies
        this.enemies = this.scene.physics.add.group();

        // Spawn waves of enemies
        this.scene.time.addEvent({
            delay: 2000, // Time between enemy waves (2 seconds)
            callback: this.spawnEnemyWave,
            callbackScope: this,
            loop: true,
        });
    }

    update(time) {
        // Enemy movement pattern
        this.enemies.children.each(function (enemy) {
            if (enemy.active) {
                enemy.y += 1; // Move enemy down the screen slowly
                enemy.x += Math.sin(enemy.y / 50) * 2; // Make the enemy follow a sinusoidal pattern

                // If enemy goes off the screen, remove it
                if (enemy.y > this.scene.game.config.height) {
                    enemy.setActive(false);
                    enemy.setVisible(false);
                }
            }
        }, this);
    }

    spawnEnemyWave() {
        const enemy = this.enemies.get(canvasWidth / 2, 0, 'enemyN01'); // Spawn an enemy at the top center

        if (enemy) {
            enemy.setActive(true);
            enemy.setVisible(true);
            enemy.setVelocityY(this.enemySpeed);
        }
    }
}
