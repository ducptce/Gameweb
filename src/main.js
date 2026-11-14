
import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';

const config = {
    type: Phaser.AUTO,

    width: 960,
    height: 640,

    parent: 'game-container',

    backgroundColor: '#18212b',

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    input: {
        activePointers: 2
    },

    scene: [GameScene]
};

new Phaser.Game(config);
