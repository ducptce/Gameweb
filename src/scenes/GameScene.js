
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

    create() {

        this.add.text(480, 25, 'STRATEGY GAME', {
            fontSize: '28px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(480, 58, 'Select a tile to begin', {
            fontSize: '16px',
            color: '#aab7c4'
        }).setOrigin(0.5);

        // Grid configuration
        this.cols = 10;
        this.rows = 8;
        this.tileSize = 64;

        this.offsetX = 160;
        this.offsetY = 100;

        this.selectedTile = null;

        this.graphics = this.add.graphics();

        this.drawBoard();

        this.input.on('pointerdown', (pointer) => {

            const col = Math.floor(
                (pointer.worldX - this.offsetX) / this.tileSize
            );

            const row = Math.floor(
                (pointer.worldY - this.offsetY) / this.tileSize
            );

            if (
                col < 0 || col >= this.cols ||
                row < 0 || row >= this.rows
            ) {
                return;
            }

            this.selectedTile = { col, row };

            this.drawBoard();

            console.log('Selected:', this.selectedTile);
        });
    }

    drawBoard() {

        const g = this.graphics;

        g.clear();

        for (let row = 0; row < this.rows; row++) {

            for (let col = 0; col < this.cols; col++) {

                const x = this.offsetX + col * this.tileSize;
                const y = this.offsetY + row * this.tileSize;

                g.fillStyle(0x34495e, 1);
                g.fillRect(
                    x + 1,
                    y + 1,
                    this.tileSize - 2,
                    this.tileSize - 2
                );

                g.lineStyle(1, 0x718096, 0.8);
                g.strokeRect(
                    x,
                    y,
                    this.tileSize,
                    this.tileSize
                );
            }
        }

        if (this.selectedTile) {

            const { col, row } = this.selectedTile;

            const x = this.offsetX + col * this.tileSize;
            const y = this.offsetY + row * this.tileSize;

            g.lineStyle(4, 0xffff00, 1);
            g.strokeRect(
                x + 2,
                y + 2,
                this.tileSize - 4,
                this.tileSize - 4
            );
        }
    }
}
