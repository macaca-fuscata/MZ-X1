import { canvasWidth } from './Globals.js';
import PlayerShip from '../assets/images/prototype-player0001.png';
import PlayerLaser from '../assets/images/prototype-laser0001.png';
import LaserSound from '../assets/sounds/prototype-sound-laser0001.mp3';

export default class Player {
    constructor(scene) {
        this.scene = scene;
        this.player;
        this.laserBeams;
        this.cursors;
        this.fireKey;
        this.lastFired = 0;
        this.laserSound;
    }

    preload() {
        this.scene.load.image('ship', PlayerShip);
        this.scene.load.image('laser', PlayerLaser);
        this.scene.load.audio('laserSound', LaserSound);
    }

    create() {
        // Add the player's ship
        this.player = this.scene.physics.add
            .image(canvasWidth / 2, 450, 'ship')
            .setCollideWorldBounds(true);

        // Create a group for the lasers
        this.laserBeams = this.scene.physics.add.group({
            defaultKey: 'laser',
            maxSize: 10, // Limit to 10 laser beams on the screen at a time
        });

        // Set up input keys for movement and firing
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.fireKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        // Add laser sound
        this.laserSound = this.scene.sound.add('laserSound');
    }

    update(time) {
        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        } else {
            this.player.setVelocityX(0);
        }

        // Shooting logic
        if (Phaser.Input.Keyboard.JustDown(this.fireKey)) {
            this.fireLaser(time);
        }

        // Check if laser beams go out of bounds and reset them
        this.laserBeams.children.each(function (laser) {
            if (laser.active && laser.y < 0) {
                laser.setActive(false);
                laser.setVisible(false);
            }
        }, this);
    }

    fireLaser(time) {
        // Limit laser firing rate to once per 200ms
        if (time > this.lastFired) {
            const laser = this.laserBeams.get(this.player.x, this.player.y);

            if (laser) {
                laser.setActive(true);
                laser.setVisible(true);
                laser.setVelocityY(-400);

                // Play the laser sound
                this.laserSound.play();

                // Set the last fired time
                this.lastFired = time + 200;
            }
        }
    }
}
